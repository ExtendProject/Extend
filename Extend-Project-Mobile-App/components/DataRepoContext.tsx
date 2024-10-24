import React, { createContext, useContext, useState } from 'react';

const DataRepoContext = createContext({});

export const useDataRepo = () => useContext(DataRepoContext);

export const DataRepoProvider = ({children}: any) => {
  const [buildingData, setBuildingData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [markdownData, setMarkDownData] = useState<any>('');

  // fetching advice building data from waston and building blue prints images
  const fetchBuildingData = async (prompt: string) => {
    setLoading(true);
    fetchMarkDownData(prompt);
    try {
      const response = await fetch(
        'https://069b-41-215-171-48.ngrok-free.app/query_results',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query_list: [prompt],
            n_results: 5,
          }),
        },
      );

      const result = await response.json();
      console.log('results ', result);
      setBuildingData(result); // Handle the response data here
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // const [loading, setLoading] = useState(true);
  // let prompt = '';

  const fetchMarkDownData = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://069b-41-215-171-48.ngrok-free.app/get_advice',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: prompt,
            budget: 50000.0,
            location: '5.5848819,-0.3128207',
          }),
        },
      );

      const result = await response.json();
      console.log('results ', result);
      setMarkDownData(result); // Handle the response data here
    } catch (error) {
      console.error('Error fetching data:', error);
      // setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DataRepoContext.Provider
      value={{
        name: 'Kofi',
        buildingData,
        loading,
        fetchBuildingData,
        markdownData,
      }}>
      {/* <Text style={{marginTop: 100}}>dsfsdf </Text> */}
      {children}
    </DataRepoContext.Provider>
  );
};
