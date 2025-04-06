import { useState, useEffect } from "react";

function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error parsing localstorage key "${key}": `, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.log(`Error saving to localstorage key "${key}": `, error);
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;