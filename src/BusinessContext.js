import React, { createContext, useState, useEffect } from 'react';
import { fetchBusinessData } from './api';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const business = await fetchBusinessData();
        setBusinessData(business);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <BusinessContext.Provider value={businessData}>
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;
