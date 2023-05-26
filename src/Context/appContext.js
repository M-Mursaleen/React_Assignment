import React, { useState, createContext } from "react";



export const UserContext = createContext()

export const UserDataContext = ({children}) => {
    const [userData, setUserData] = useState([])
    console.log(userData)

    const defaultContext = {
        userData,
        setUserData
    }

    return (
        <UserContext.Provider value={defaultContext}>
            {children}
        </UserContext.Provider>
    );
}