#type:ignore
import base64
from io import BytesIO
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import matplotlib.pyplot as plt
import typing_extensions as typing
import os
import chromadb
from chromadb.utils.embedding_functions import OpenCLIPEmbeddingFunction
from chromadb.utils.data_loaders import ImageLoader
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

    
from ibm_watson_machine_learning.foundation_models import Model
from ibm_watson_machine_learning.metanames import GenTextParamsMetaNames as GenParams
from ibm_watson_machine_learning.foundation_models.utils.enums import ModelTypes
import requests

# FastAPI app instance
app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# Initialize ChromaDB client
chroma_client = chromadb.PersistentClient(path='vectorized_db')
image_loader = ImageLoader()
image_embedding_fun = OpenCLIPEmbeddingFunction()
db = chroma_client.get_or_create_collection(name='house_plans', embedding_function=image_embedding_fun, data_loader=image_loader)
SOURCE_DIRECTORY = "./houseplan_images/"

app.mount("/houseplan_images", StaticFiles(directory=SOURCE_DIRECTORY), name="houseplan_images")





class QueryResult(BaseModel):
    id: str
    uri: str
    distance: float
    image_base64: str
    metadata: Optional[Dict] = {}
    document: Optional[str] = ""

class QueryResponse(BaseModel):
    query: str
    results: List[QueryResult]

class QueryRequest(BaseModel):
    query_list: List[str]
    n_results: int = 5
    
    
def download_image(url, output_path):
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(output_path, 'wb') as file:
            for chunk in response.iter_content(1024):
                file.write(chunk)
        print(f"Image successfully downloaded: {output_path}")
    else:
        print(f"Failed to retrieve the image. Status code: {response.status_code}")
        
        
def convert_image_to_base64(img_data):
    plt.switch_backend('Agg')
    fig, ax = plt.subplots()
    ax.imshow(img_data)
    ax.axis('off')

    buffer = BytesIO()
    fig.savefig(buffer, format="png", bbox_inches='tight', pad_inches=0)
    plt.close(fig)
    buffer.seek(0)

    img_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    
    return f"data:image/png;base64,{img_base64}"

def get_query_results_as_base64(query_list: list, query_results: dict) -> list:
    results = []
    result_count = len(query_results['ids'][0])
    
    for i in range(len(query_list)):
        query_result = {"query": query_list[i], "results": []}
        for j in range(result_count):
            id = query_results['ids'][i][j]
            distances = query_results['distances'][i][j]
            metadatas = query_results['metadatas'][i][j] or {}
            documents = query_results['documents'][i][j] or ""
            data = query_results['data'][i][j]
            uris = query_results['uris'][i][j]
            
            img_base64 = convert_image_to_base64(data)
            
            query_result["results"].append({
                "id": id,
                "uri": uris,
                "distance": distances,
                "image_base64": img_base64,
                "metadata": metadatas,
                "document": documents
            })
        
        results.append(query_result)
    
    return results

@app.post("/query_results", response_model=List[QueryResponse])
def query_results_endpoint(query_request: QueryRequest):
    query_list = query_request.query_list
    n_results = query_request.n_results

    res = db.query(
        query_texts=query_list,
        n_results=n_results,
        include=['documents', 'distances', 'metadatas', 'data', 'uris']
    )

    return get_query_results_as_base64(query_list, res)



    

class URLDIR(BaseModel):
    dir_name: str
# Define an endpoint to list available house plan images
@app.post("/list_images/")
async def list_images(directory:URLDIR):
    try:
        # List all files in the house plan images directory
        images = os.listdir(SOURCE_DIRECTORY + directory.dir_name)
        
        return {"images": images}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
 

# Define a Pydantic model for input validation
class UserInput(BaseModel):
    description: str
    budget: float
    location: str  # e.g., "5.5848819,-0.3128207"

def fetch_weather_data(geocode):
    api_key = "3769d4edebe64b13a9d4edebe6cb138d"
    url = f"https://api.weather.com/v3/wx/forecast/daily/3day?geocode={geocode}&format=json&units=m&language=en-US&apiKey={api_key}"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch weather data")
    return response.json()

def process_weather_data(weather_data):
    # Filter out None values from temperatureMax and temperatureMin
    temp_max_list = [temp for temp in weather_data['temperatureMax'] if temp is not None]
    temp_min_list = [temp for temp in weather_data['temperatureMin'] if temp is not None]

    # Handle the case where all values are None
    if temp_max_list:
        avg_high_temp = sum(temp_max_list) / len(temp_max_list)
    else:
        avg_high_temp = None  # or set a default value

    if temp_min_list:
        avg_low_temp = sum(temp_min_list) / len(temp_min_list)
    else:
        avg_low_temp = None  # or set a default value

    # Extract humidity and precipitation chances, filtering None values
    humidity_list = [h for h in weather_data['daypart'][0]['relativeHumidity'] if h is not None]
    precip_chance_list = [p for p in weather_data['daypart'][0]['precipChance'] if p is not None]
    weather_conditions_list = [w for w in weather_data['daypart'][0]['wxPhraseLong'] if w is not None]

    if humidity_list:
        humidity_min = min(humidity_list)
        humidity_max = max(humidity_list)
    else:
        humidity_min = humidity_max = None

    if precip_chance_list:
        precip_chance_max = max(precip_chance_list)
    else:
        precip_chance_max = None

    # Create a summary
    weather_summary = {
        "avg_high_temp": avg_high_temp,
        "avg_low_temp": avg_low_temp,
        "humidity": (humidity_min, humidity_max),
        "precip_chance": precip_chance_max,
        "weather_conditions": weather_conditions_list
    }
    return weather_summary

def estimate_carbon_footprint(materials: Dict[str, float], weather_summary: Dict):
    # Define carbon emissions per unit for some common materials (kg CO₂ per unit)
    carbon_emissions_per_unit = {
        'concrete': 400,  # kg CO₂ per cubic meter
        'steel': 1.9,     # kg CO₂ per kg
        'wood': 11,       # kg CO₂ per cubic meter (lower due to carbon sequestration)
        'brick': 200,     # kg CO₂ per cubic meter
        'glass': 0.85     # kg CO₂ per kg
    }
    
    # Calculate carbon footprint based on materials
    carbon_footprint = 0
    for material, quantity in materials.items():
        if material in carbon_emissions_per_unit:
            carbon_footprint += carbon_emissions_per_unit[material] * quantity
        else:
            # Assume a default value if the material is not found in the predefined list
            carbon_footprint += 150 * quantity  # Default kg CO₂ per unit

    # Adjust carbon footprint based on weather summary
    avg_temp = (weather_summary.get('avg_high_temp') + weather_summary.get('avg_low_temp')) / 2 if weather_summary.get('avg_high_temp') and weather_summary.get('avg_low_temp') else 25
    humidity = (weather_summary['humidity'][1] + weather_summary['humidity'][0]) / 2 if weather_summary['humidity'] else 50
    
    # Increase carbon footprint if avg_temp is above 30°C (higher cooling needs)
    if avg_temp > 30:
        carbon_footprint *= 1.1  # Increase by 10%
    
    # Increase carbon footprint if humidity is above 70% (higher energy needs for dehumidification)
    if humidity > 70:
        carbon_footprint *= 1.05  # Increase by 5%

    return carbon_footprint

def parse_materials_from_description(description: str) -> Dict[str, float]:
    # Basic keyword-based material detection
    materials = {
        'concrete': 20,  # Default assumed quantities
        'wood': 5,
        'steel': 2,
        'brick': 10,
        'glass': 1
    }
    
    # Enhance parsing to detect other materials from descriptions
    if "brick house" in description.lower():
        materials['brick'] += 5  # Increase brick quantity based on keywords
    if "glass windows" in description.lower():
        materials['glass'] += 3
    if "steel structure" in description.lower():
        materials['steel'] += 10

    return materials

def create_prompt(user_input: dict, weather_summary: dict, carbon_footprint: float) -> str:
    # Format the values, handling None
    avg_high_temp = f"{weather_summary['avg_high_temp']:.1f}°C" if weather_summary['avg_high_temp'] is not None else "N/A"
    avg_low_temp = f"{weather_summary['avg_low_temp']:.1f}°C" if weather_summary['avg_low_temp'] is not None else "N/A"
    humidity_min, humidity_max = weather_summary['humidity']
    humidity_range = f"{humidity_min}% to {humidity_max}%" if humidity_min is not None and humidity_max is not None else "N/A"
    precip_chance = f"up to {weather_summary['precip_chance']}%" if weather_summary['precip_chance'] is not None else "N/A"
    weather_conditions = ', '.join(set(weather_summary['weather_conditions'])) if weather_summary['weather_conditions'] else "N/A"

   # Define the prompt as a variable
    prompt = f"""
    You are a RealEstate agent responsible for giving advice based on a user's house description, budget, weather conditions, and carbon footprint considerations.

    Given the user's input, please provide them with advice on what they should do.

    Assuming you have access to images and, based on the user's description, suggest basic house materials needed to build such a house.

    **Ensure the final response is formatted as a README in Markdown (`.md`) format.**

    Consider the user's budget of {user_input['budget']} GHC, and the following weather conditions at the location:

    - Average high temperature: {avg_high_temp}
    - Average low temperature: {avg_low_temp}
    - Humidity levels: {humidity_range}
    - Chance of precipitation: {precip_chance}
    - Weather conditions: {weather_conditions}
    - Carbon footprint: {carbon_footprint:.2f} kg CO₂

    Also, consider eco-friendly materials and design to minimize the carbon footprint.

    **RESPONSE MUST BE IN A MARKDOWN FORMAT.**

    =================================================================
    User input: {user_input['description']}
    Budget: {user_input['budget']} GHC
    """

    return prompt

def generate_advice(prompt):
    generate_params = {
        "max_new_tokens": 1024
    }

 
    
    # Use the selected model
    model = Model(
        model_id='meta-llama/llama-3-70b-instruct',
        params=generate_params,
        credentials={
            "apikey": "_rcyO85hAdTaOg8hMatBs4EzFYYNOy8yC__HvB9X1ptg",
            "url": "https://eu-de.ml.cloud.ibm.com"
        },
        project_id="cc5a676b-4427-4e09-a34d-c761d4be50ad"
    )
    
    generated_response = model.generate(prompt=prompt)
    return generated_response['results'][0]['generated_text']

@app.post("/get_advice")
async def get_advice(user_input: UserInput):
    # Fetch weather data
    try:
        geocode = user_input.location  # e.g., "5.5848819,-0.3128207"
        weather_data = fetch_weather_data(geocode)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # Process weather data
    weather_summary = process_weather_data(weather_data)
    
    # Estimate carbon footprint
    materials = parse_materials_from_description(user_input.description)
    carbon_footprint = estimate_carbon_footprint(materials, weather_summary)
    
    # Create prompt
    prompt = create_prompt(user_input.dict(), weather_summary, carbon_footprint)
    
    # Generate advice
    try:
        advice = generate_advice(prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to generate advice")
    
    return {"advice": advice}






if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


