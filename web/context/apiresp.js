import { createContext, useContext, useState } from 'react';

// Create the context
const APIResponseContext = createContext();

// Create the provider component
export function APIResponseProvider({ children }) {
    // Define the state and any necessary functions
    const [apiResponse, setAPIResponse] = useState("");

    // Provide the state and functions to the children components
    return (
        <APIResponseContext.Provider value={{ apiResponse, setAPIResponse }}>
            {children}
        </APIResponseContext.Provider>
    );
}

// Custom hook to access the context
export function useAPIResponse() {
    return useContext(APIResponseContext);
}
