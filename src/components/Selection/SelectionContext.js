import { createContext, useContext, useState } from "react";

const SelectionContext = createContext();

export function SelectionProvider({children}) {  
  const [selectedBrands, setSelectedBrands] = useState([]);
  
  return (
    <SelectionContext.Provider value={{ selectedBrands, setSelectedBrands }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  return useContext(SelectionContext);
}