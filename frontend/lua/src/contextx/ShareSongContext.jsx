import * as React from "react";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

export const ShareSongContext = React.createContext();

export const ShareSongProvider = ({ children}) => {
    const [songTokens, setSongTokens] = React.useState(0)
    const [loading, setLoading] = React.useState(false);
    const [error, setError ] = React.useState("")

    const shareSong = async (songLink) => {
        try {
            console.log("gesendeter link:", songLink);
            
            setError("");
            setLoading(true);
            const response = await axiosInstance.post("/song/input", {link: songLink}, {withCredentials: true,});

            if (response.status === 201) {
                setSongTokens((prev) => prev + 1)
            }

            console.log(response.data);
            
            return response.data.msg;
        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Ein Fehler ist aufgetreten";
      setError(errorMsg);
      throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ShareSongContext.Provider value={{shareSong, songTokens, loading, error}}>{children}</ShareSongContext.Provider>
    )
}