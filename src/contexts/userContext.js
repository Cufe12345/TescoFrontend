import { createContext } from "react";

const userContext = createContext({
  userData: {},
  setUserData: (data) => {},
});

export default userContext;
