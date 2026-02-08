import * as React from "react";
import axiosInstance from "../api/axiosInstance";

export const ReceiveSongContext = React.createContext();

export const ReceiveSongProvider =({children}) => {

    return (
        <ReceiveSongContext.Provider value={{}}>
            {children}
        </ReceiveSongContext.Provider>
    )
}