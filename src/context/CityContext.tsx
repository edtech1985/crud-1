// src/context/CityContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface CityContextProps {
  city: string;
  setCity: (city: string) => void;
}

const defaultValue: CityContextProps = {
  city: "",
  setCity: () => {},
};

export const CityContext = createContext<CityContextProps>(defaultValue);

export const CityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState<string>("");

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};
