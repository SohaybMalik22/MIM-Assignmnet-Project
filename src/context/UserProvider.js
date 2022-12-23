import React, {useState} from  'react'
import { createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [data, setData] = useState('');

    return (
        <UserContext.Provider value={{ data, setData }}>
            {children}
        </UserContext.Provider>
    )
}  

export default UserContext;

