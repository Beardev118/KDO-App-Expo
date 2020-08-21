import React, { useState, createContext } from "react";

export const EventAllMembersState = props => {
  const [eventAllMembersStatus, setEventAllMembersStatus] = useState(false);
  return (
    <EventAllMembersContext.Provider
      value={[eventAllMembersStatus, setEventAllMembersStatus]}
    >
      {props.children}
    </EventAllMembersContext.Provider>
  );
};

export const EventAllMembersContext = createContext();
