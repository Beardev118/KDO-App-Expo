import React, { useState, createContext } from "react";

export const InactiveState = props => {
  const [isInactiveFlag, setIsInactiveFlag] = useState(false);
  return (
    <InactiveContext.Provider value={[isInactiveFlag, setIsInactiveFlag]}>
      {props.children}
    </InactiveContext.Provider>
  );
};

export const InactiveContext = createContext();
