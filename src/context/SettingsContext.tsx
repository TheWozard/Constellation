import React from "react"
import { LongTermStorage } from "util/LongTermStorage"

export interface Settings {
    TextRendering: TextRendering,
}

export enum TextRendering {
    Hidden,
    FirstLetter,
    Full,
}

const SettingsStorage = new LongTermStorage("settings", {
    TextRendering: TextRendering.Full,
}, "1")

export const SettingsUpdate = (settings: Settings) => {
    SettingsStorage.set(settings)
    window.location.reload()
}

export const SettingsContext = React.createContext<Settings>(SettingsStorage.get())