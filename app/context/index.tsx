import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext<any>(null);

export const DataProvider = ({ children }: any) => {
  const [refresh, setRefresh] = useState(false);
  
  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <DataContext.Provider value={{ refresh, triggerRefresh }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
