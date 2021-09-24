import { Button, ButtonProps } from "@blueprintjs/core";
import { SettingsContext, SettingsString } from "context/SettingsContext";
import React from "react";

export const SettingsButton: React.FunctionComponent<ButtonProps> = (props) => {
    const settings = React.useContext(SettingsContext)
    
    return (
        <Button {...props} text={SettingsString(settings.TextRendering, props.text != null ? `${props.text}` : "" )} />
    )
}