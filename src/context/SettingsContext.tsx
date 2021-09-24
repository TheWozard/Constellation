import { KeyComboString } from "paramaters/render/KeyCombo"
import React from "react"
import { LongTermStorage } from "util/LongTermStorage"

export interface Settings {
    TextRendering: TextRendering,
    BoardHotkey: KeyComboString,
    ContextHotkey: KeyComboString,
    AppsHotkey: KeyComboString,
    FiltersHotkey: KeyComboString,
    EditHotkey: KeyComboString,
    SettingsHotkey: KeyComboString,
}

export enum TextRendering {
    Hidden = "hidden",
    FirstLetter = "first-letter",
    Full = "full",
}

export const DefaultSettings = {
    TextRendering: TextRendering.Full,
    BoardHotkey: "b",
    ContextHotkey: "c",
    AppsHotkey: "a",
    FiltersHotkey: "f",
    EditHotkey: "e",
    SettingsHotkey: "s",
}

const SettingsStorage = new LongTermStorage<Settings>("settings", DefaultSettings, "1")

export const SettingsUpdate = (settings: Settings) => {
    SettingsStorage.set(settings)
    window.location.reload()
}

export const SettingsContext = React.createContext<Settings>(SettingsStorage.get())

export const SettingsString = (rendering: TextRendering, value: string): string => {
    switch (rendering) {
        case TextRendering.FirstLetter:
            return value[0]
        case TextRendering.Hidden:
            return ""
        default:
            return value
    }
}