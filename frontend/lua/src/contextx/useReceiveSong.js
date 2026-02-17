import * as React from "react";
import { ReceiveSongContext } from "./ReceiveSongContext"; 

export function useReceiveSong() {
    const context = React.useContext(ReceiveSongContext);

    if (context === undefined) {
        throw new Error('useReceiveSong must be used within a ReceiveSongProvider')
    }
    return context;
}