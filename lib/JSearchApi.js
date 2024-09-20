import { useState, useEffect } from "react";

const JSearchApi = (query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://jsearch.p.rapidapi.com/search?query=${new URLSearchParams(query)}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": '6eea95b4admshe13920a6b2ac3f8p1720a3jsnc14814f2a050',
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default JSearchApi;
