import React, { useState, createContext } from "react";

export const InviteNumberState = props => {
  const [inviteNumber, setInviteNumber] = useState("");
  return (
    <InviteNumberContext.Provider value={[inviteNumber, setInviteNumber]}>
      {props.children}
    </InviteNumberContext.Provider>
  );
};

export const InviteNumberContext = createContext();
