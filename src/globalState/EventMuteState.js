import React, { useState, createContext } from "react";

export const EventMuteState = props => {
  const [eventMuteStatus, setEventMuteStatus] = useState(false);
  return (
    <EventMuteContext.Provider value={[eventMuteStatus, setEventMuteStatus]}>
      {props.children}
    </EventMuteContext.Provider>
  );
};

export const EventMuteContext = createContext();
