import { Button, Classes, Drawer, DrawerSize, Intent, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import { DefaultSettings, Settings, SettingsContext, SettingsUpdate, TextRendering } from "context/SettingsContext"
import { Parameters } from "paramaters"
import { ParameterList } from "paramaters/ParameterList"
import { KeyCombo } from "paramaters/render/KeyCombo"
import { OptionButtons } from "paramaters/render/OptionButtons"
import React from "react"
import { ConfirmButton } from "unit/ConfirmButton"
import { ToastError } from "util/Toaster"

const SettingsParams: Parameters<Settings> = {
    TextRendering: {
        r: OptionButtons<TextRendering>({
            title: "Render Button Text",
            options: [TextRendering.Hidden, TextRendering.FirstLetter, TextRendering.Full],
            labels: ["Hidden", "First Letter", "Full"],
            even: true
        })
    },
    BoardHotkey: { r: KeyCombo({ title: "Board Menu Hotkey", placeholder: "b" }) },
    ContextHotkey: { r: KeyCombo({ title: "Context Menu Hotkey", placeholder: "c" }) },
    AppsHotkey: { r: KeyCombo({ title: "Apps Menu Hotkey", placeholder: "a" }) },
    FiltersHotkey: { r: KeyCombo({ title: "Filter Menu Hotkey", placeholder: "f" }) },
    EditHotkey: { r: KeyCombo({ title: "Edit Mode Hotkey", placeholder: "e" }) },
    SettingsHotkey: { r: KeyCombo({ title: "Settings Menu Hotkey", placeholder: "s" }) },
}

export const SettingsDrawer = () => {
    const { state, dispatch } = React.useContext(DrawerContext)
    const settings = React.useContext(SettingsContext)

    return (
        <Drawer
            className={Classes.DARK}
            isOpen={state.settings}
            position={Position.RIGHT}
            size={DrawerSize.SMALL}
            title={"Settings"}
            icon={"cog"}
            onClose={() => {
                dispatch({
                    type: DrawerActionType.SetSettings,
                    value: false,
                })
            }}
        >
            <div className={"drawer-padding drawer-full"}>
                <ParameterList
                    init={settings}
                    params={SettingsParams}
                    className={"flex-list"}
                    onComplete={(data) => {
                        SettingsUpdate(data as Settings)
                    }}
                    onError={function (key, type): boolean | void {
                        ToastError(`${key} failed with ${type}`)
                    }}>
                    <div className={"flex-spacer"} />
                    <div className={"flex-split"}>
                    <Button type={"submit"} icon={"tick"} intent={Intent.SUCCESS} />
                    <ConfirmButton dialog={
                        <span>Confirm resetting all current settings to their default values. This action can <b>NOT</b> be undone.</span>
                    } icon={"reset"} text={"Reset"} intent={Intent.DANGER} minimal onClick={() => {
                        SettingsUpdate(DefaultSettings)
                    }}/>
                    </div>
                </ParameterList>
            </div>
        </Drawer>
    )
}
