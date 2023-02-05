import React, { createContext, useState } from "react";

const NetworkContext = createContext();

export const NetworkProvider = (props) => {
  const [ip, setIp] = useState("http://20.58.0.170:8080/");

  return (
    <NetworkContext.Provider value={ip}>
      {props.children}
    </NetworkContext.Provider>
  );
};

export default NetworkContext;
