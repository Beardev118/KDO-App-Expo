import React, { useState, createContext } from "react";

export const AskBeforeTimeState = props => {
  const [timeAskBefore, setTimeAskBefore] = useState(1);
  return (
    <AskBeforeTimeContext.Provider value={[timeAskBefore, setTimeAskBefore]}>
      {props.children}
    </AskBeforeTimeContext.Provider>
  );
};

export const AskBeforeTimeContext = createContext();
