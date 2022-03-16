import { HotkeysProvider, HotkeysTarget2 } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import { GridActionType, GridContext } from "context/GridContext"
import { SettingsContext } from "context/SettingsContext"
import React from "react"

export const Hotkeys: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const grid = React.useContext(GridContext)
    const drawers = React.useContext(DrawerContext)
    const settings = React.useContext(SettingsContext)

    return (
        <HotkeysProvider >
            <HotkeysTarget2 hotkeys={[
                {
                    combo: settings.BoardHotkey,
                    global: true,
                    label: "Open Boards - Switch and share your current board",
                    onKeyDown: () => {
                        drawers.dispatch({
                            type: DrawerActionType.SetBoards,
                            value: !drawers.state.boards
                        })
                    },
                },
                {
                    combo: settings.ContextHotkey,
                    global: true,
                    label: "Open Context - Auto fill parameters with global values",
                    onKeyDown: () => {
                        drawers.dispatch({
                            type: DrawerActionType.SetContext,
                            value: !drawers.state.context
                        })
                    },
                },
                {
                    combo: settings.AppsHotkey,
                    global: true,
                    label: "Open Apps - Provides tiles to be added to your dashboard",
                    onKeyDown: () => {
                        drawers.dispatch({
                            type: DrawerActionType.SetApps,
                            value: !drawers.state.apps
                        })
                    },
                },
                // {
                //     combo: settings.FiltersHotkey,
                //     global: true,
                //     label: "Open Filters - highlight tiles based on criteria",
                //     onKeyDown: () => {
                //         drawers.dispatch({
                //             type: DrawerActionType.SetFilter,
                //             value: !drawers.state.filter
                //         })
                //     },
                // },
                {
                    combo: settings.EditHotkey,
                    global: true,
                    label: "Toggle Edit mode - Allows for resizing and moving of tiles",
                    onKeyDown: () => {
                        grid.dispatch({
                            type: GridActionType.SetEditable,
                            editable: !grid.state.editable,
                        })
                    },
                },
                {
                    combo: settings.SettingsHotkey,
                    global: true,
                    label: "Open Settings - General settings menu for customizing the UI",
                    onKeyDown: () => {
                        drawers.dispatch({
                            type: DrawerActionType.SetSettings,
                            value: !drawers.state.settings
                        })
                    },
                },
            ]} children={({ handleKeyDown, handleKeyUp }) => (
                <div tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
                    {children}
                </div>
            )} />
        </HotkeysProvider>
    )
}