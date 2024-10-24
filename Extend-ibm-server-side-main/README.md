# Extend Service API Documentation


![1729773687334](images/README/1729773687334.png)

## Overview

This API provides a service to assist users in receiving customized real estate advice based on the house description, budget, weather conditions, and carbon footprint considerations. It includes features to query a database of house plans, fetch and process weather data, and estimate the carbon footprint of building materials. The final advice is generated using a machine learning model from IBM Watson.

### Technologies Used

- **FastAPI**: Web framework for building APIs.
- **IBM Watson Machine Learning**: Used for generating responses based on input prompts.
- **ChromaDB**: For managing and querying vectorized house plan images.
- **Matplotlib**: For handling image processing and conversion.
- **OpenCLIP Embedding Function**: For embedding image data.
- **Requests**: For HTTP requests to fetch weather data and images.

---

## Installation

To run this API locally, you need to have Python installed. Follow these steps:

1. Clone the repository.
2. Install the dependencies using:

   ```bash
   pip install fastapi uvicorn requests matplotlib ibm-watson-machine-learning chromadb
   ```
3. Ensure the IBM Watson API credentials are properly set up.
4. Place any house plan images in the specified `SOURCE_DIRECTORY`.
5. Run the application using:

   ```bash
   uvicorn main:app --reload
   ```

---

## FastAPI Endpoints

### 1. `/query_results` - POST

**Description**: Retrieves query results from the house plan database, converting images to base64.

**Request Body**:

```json
{
  "query_list": ["modern house", "minimalist"],
  "n_results": 5
}
```

**Response**:
Returns a list of matching house plans with image data embedded as base64.

**Example**:

```json
{
  "query": "modern house",
  "results": [
    {
      "id": "123",
      "uri": "http://example.com/house1.png",
      "distance": 0.25,
      "image_base64": "data:image/png;base64,...",
      "metadata": {},
      "document": "Description of the house"
    }
  ]
}
```

### 2. `/list_images` - POST

**Description**: Lists all available images in the specified directory.

**Request Body**:

```json
{
  "dir_name": "sample_directory"
}
```

**Response**:
Returns a list of filenames.

**Example**:

```json
{
  "images": ["house1.png", "house2.png"]
}
```

### 3. `/get_advice` - POST

**Description**: Fetches real estate advice based on the user's house description, budget, and location. Uses weather data and a machine learning model to provide a comprehensive recommendation.

**Request Body**:

```json
{
  "description": "brick house with glass windows",
  "budget": 100000,
  "location": "5.5848819,-0.3128207"
}
```

**Response**:

```json
{
  "advice": "Your recommended construction materials are concrete, brick, and glass. Estimated carbon footprint is 3000 kg CO2. Consider using eco-friendly alternatives for insulation..."
}
```

---

## Helper Functions

### `fetch_weather_data(geocode)`

**Description**: Fetches weather data from an external weather API using geographical coordinates.

**Parameters**:

- `geocode`: A string representing latitude and longitude.

**Returns**:

- JSON data containing weather information.

### `process_weather_data(weather_data)`

**Description**: Processes and summarizes weather data to calculate average temperatures, humidity, and precipitation.

**Parameters**:

- `weather_data`: JSON response from the weather API.

**Returns**:

- A dictionary summarizing average high/low temperatures, humidity, and weather conditions.

### `estimate_carbon_footprint(materials, weather_summary)`

**Description**: Calculates the carbon footprint based on building materials and adjusts the value based on weather conditions.

**Parameters**:

- `materials`: A dictionary of materials and their quantities.
- `weather_summary`: A dictionary summarizing weather data.

**Returns**:

- Float value of the estimated carbon footprint in kilograms of CO2.

### `parse_materials_from_description(description)`

**Description**: Extracts building materials from a textual description.

**Parameters**:

- `description`: String input from the user describing the house.

**Returns**:

- A dictionary of materials and quantities derived from the description.

### `create_prompt(user_input, weather_summary, carbon_footprint)`

**Description**: Formats the input data into a prompt for the AI model to generate advice.

**Parameters**:

- `user_input`: Dictionary containing user's description, budget, and location.
- `weather_summary`: Processed weather data.
- `carbon_footprint`: Estimated carbon footprint.

**Returns**:

- A string formatted as a prompt.

### `generate_advice(prompt)`

**Description**: Uses the IBM Watson Machine Learning model to generate advice based on the provided prompt.

**Parameters**:

- `prompt`: A formatted string with user data.

**Returns**:

- Generated text advice from the model.

---

## Image Utilities

### `download_image(url, output_path)`

**Description**: Downloads an image from a given URL and saves it to the specified path.

**Parameters**:

- `url`: String URL of the image.
- `output_path`: File path where the image will be saved.

### `convert_image_to_base64(img_data)`

**Description**: Converts an image to a base64 encoded string.

**Parameters**:

- `img_data`: Image data to be converted.

**Returns**:

- String with base64 encoded image data.

### `get_query_results_as_base64(query_list, query_results)`

**Description**: Processes query results and converts image data to base64.

**Parameters**:

- `query_list`: List of queries.
- `query_results`: Dictionary of query results.

**Returns**:

- List of processed results with embedded base64 images.

---

## Environment Configuration

### ChromaDB

**Description**: The API uses ChromaDB to store and query house plans. The database is set to `vectorized_db`. The configuration is as follows:

- **PersistentClient**: Manages the connection to the database.
- **Image Embeddings**: Handled by OpenCLIPEmbeddingFunction for vectorized image matching.

### IBM Watson Machine Learning

**Description**: The advice generation relies on IBM Watson Machine Learning models. Make sure to configure:

- **API Key**
- **API URL**
- **Model ID**
- **Project ID**

---

## Running the Server

Execute the following command:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## Notes

- Ensure your `SOURCE_DIRECTORY` has the correct images and permissions for access.
- IBM Watson Machine Learning credentials need to be set up properly before running the `/get_advice` endpoint.
- Weather API requires a valid key to fetch data correctly.

---

This concludes the documentation for the Real Estate Advisory Service API. For any issues, please consult the developer guide or reach out to support.
