import { Intent } from "@blueprintjs/core"
import { KeyComboString } from "paramaters/render/KeyCombo"
import React from "react"
import { LongTermStorage } from "util/LongTermStorage"

export interface Settings {
    TextRendering: TextRendering,
    ToastLevel: ToastLevel,
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

export enum ToastLevel {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Error = "error",
}

export const DefaultSettings = {
    TextRendering: TextRendering.Full,
    ToastLevel: ToastLevel.Info,
    BoardHotkey: "b",
    ContextHotkey: "c",
    AppsHotkey: "a",
    FiltersHotkey: "f",
    EditHotkey: "e",
    SettingsHotkey: "s",
}

const SettingsStorage = new LongTermStorage<Settings>("settings", DefaultSettings, "1")

// We use an extra function like this and reload the page so that we can use these values
// outside fo the current react lifecycle
export const SettingsUpdate = (settings: Settings) => {
    SettingsStorage.set(settings)
    window.location.reload()
}

export const SettingsData = SettingsStorage.get()
export const SettingsContext = React.createContext<Settings>(SettingsData)

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

export const ValidToastLevel = (level: ToastLevel, intent: Intent): boolean => {
    switch (level) {
        case ToastLevel.Info:
            return ([Intent.DANGER, Intent.WARNING, Intent.PRIMARY, Intent.NONE, Intent.SUCCESS] as string[]).includes(intent)
        case ToastLevel.Success:
            return ([Intent.DANGER, Intent.WARNING, Intent.SUCCESS] as string[]).includes(intent)
        case ToastLevel.Warning:
            return ([Intent.DANGER, Intent.WARNING] as string[]).includes(intent)
        case ToastLevel.Error:
            return ([Intent.DANGER] as string[]).includes(intent)
        default:
            return true
    }
}