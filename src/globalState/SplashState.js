import React, { useState, createContext } from "react";

export const SplashState = props => {
  const [splashStatus, setSplashStatus] = useState(false);
  return (
    <SplashContext.Provider value={[splashStatus, setSplashStatus]}>
      {props.children}
    </SplashContext.Provider>
  );
};

export const SplashContext = createContext();
