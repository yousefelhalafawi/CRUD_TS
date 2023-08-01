import { useState } from "react";

const usePatchRequest = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState<any>(null); // Initialize response state

  const patchData = async (data: any) => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Throwing the parsed response data instead of a new Error instance
        const responseData = await response.json(); // Parse the response data
        throw responseData;
      }

      // Additional logic if needed, such as parsing response or updating state
      const responseData = await response.json(); // Parse the response data

      setLoading(false);
      setResponse(responseData); // Set the response data in the state
      return responseData; // Return the response data from the promise
    } catch (error: any) {
      setError(error);
      setLoading(false);
      throw error; // Re-throw the error to be caught in the calling component
    }
  };

  return { patchData, loading, error, response }; // Include the response in the returned object
};

export default usePatchRequest;
