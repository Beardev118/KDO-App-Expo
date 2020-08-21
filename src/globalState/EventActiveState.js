import React, { useState, createContext } from "react";

export const EventActiveState = props => {
  const [eventActiveStatus, setEventActiveStatus] = useState(false);
  return (
    <EventActiveContext.Provider
      value={[eventActiveStatus, setEventActiveStatus]}
    >
      {props.children}
    </EventActiveContext.Provider>
  );
};

export const EventActiveContext = createContext();
