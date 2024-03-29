import { createContext, useState, useEffect, useContext } from "react";

export const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  const updateQuery = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <QueryContext.Provider value={{ query, updateQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext  = ()=>useContext(QueryContext)