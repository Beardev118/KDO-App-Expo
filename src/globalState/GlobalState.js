import React, { useState, createContext } from "react";

export const GlobalState = props => {
  const [modalStatus, setModalStatus] = useState(false);
  return (
    <GlobalContext.Provider value={[modalStatus, setModalStatus]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const GlobalContext = createContext();
