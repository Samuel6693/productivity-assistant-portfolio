import { useEffect, useState } from "react";

export const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);
      return savedValue ? JSON.parse(savedValue) : initialValue;
    } catch (err) {
      console.error(`Could not read ${key} from localStorage:`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Could not save ${key} to localStorage:`, err);
    }
  }, [key, value]);

  return [value, setValue];
};
