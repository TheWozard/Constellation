import React from "react"
import { LongTermStorage } from "util/LongTermStorage"

interface Settings {
    TextRendering: TextRendering,
}

enum TextRendering {
    Hidden,
    FirstLetter,
    Full,
}

const SettingsStorage = new LongTermStorage("settings", {
    TextRendering: TextRendering.Full,
}, "1")

export const SettingsUpdate = (settings: Settings) => {
    SettingsStorage.set(settings)
    location.reload()
}

export const SettingsContext = React.createContext<Settings>(SettingsStorage.get())