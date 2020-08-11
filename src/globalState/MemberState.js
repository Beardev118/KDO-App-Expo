import React, { useState, createContext } from "react";

export const MemberState = props => {
  const [modalMemberStatus, setModalMemberStatus] = useState(false);
  return (
    <MemberContext.Provider value={[modalMemberStatus, setModalMemberStatus]}>
      {props.children}
    </MemberContext.Provider>
  );
};

export const MemberContext = createContext();
