import React from "react";
import { ToastError } from "util/Toaster";

interface TileContext<T = {}> {
    remove: () => void
    update: (data: T) => void
    data: T
}

export const TileContext = React.createContext<TileContext>({
    remove: () => {
        ToastError("Tile being closed outside of expected context")
    },
    update: (data) => {
        ToastError("Tile being updated outside of expected context")
    },
    data: {}
})