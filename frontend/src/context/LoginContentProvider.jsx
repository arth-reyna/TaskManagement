import React, { createContext, useState } from "react";

export const LoginContext = createContext();

const LoginContentProvider = ({children}) => {
    const [userDetails, setUserDetails] = useState(false);
  return (
    <LoginContext.Provider value={userDetails}>
        {children}
    </LoginContext.Provider>
  )
};

export default LoginContentProvider;
