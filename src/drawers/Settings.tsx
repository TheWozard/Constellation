import { Button, Classes, Drawer, DrawerSize, Intent, Position } from "@blueprintjs/core"
import { DrawerActionType, DrawerContext } from "context/DrawerContext"
import { Settings, SettingsContext, SettingsUpdate, TextRendering } from "context/SettingsContext"
import { Parameters } from "paramaters"
import { ParameterList } from "paramaters/ParameterList"
import { OptionSliderOfType } from "paramaters/render/OptionSlider"
import React from "react"

const SettingsParams: Parameters<Settings> = {
    TextRendering: {
        r: OptionSliderOfType<TextRendering>()({
            title: "Render Button Text",
            options: [TextRendering.Hidden, TextRendering.FirstLetter, TextRendering.Full],
            labels: ["Hidden", "First Letter", "Full"]
        })
    }
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
            <div className={"drawer-padding"}>
                <ParameterList
                    init={settings}
                    params={SettingsParams}
                    onComplete={(data) => {
                        SettingsUpdate(data as Settings)
                    }}
                    onError={function (key, type): boolean | void {
                        throw new Error("Function not implemented.")
                    }}>
                    <Button type={"submit"} icon={"tick"} intent={Intent.SUCCESS} />
                </ParameterList>
            </div>
        </Drawer>
    )
}
