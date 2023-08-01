import { useState, useEffect } from "react";

// Define the generic type for the fetched data
export interface FetchedData {
  data: any;
}

const useGetRequest = (url: string) => {
  const [fetchedData, setData] = useState<FetchedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true; // To check if the component is still mounted

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error as Error); // Explicitly cast error to Error type
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      // Clean up function to set isMounted to false when the component unmounts
      isMounted = false;
    };
  }, [url]);

  return { fetchedData, loading, error };
};

export default useGetRequest;
