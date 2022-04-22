import { Intent } from "@blueprintjs/core";
import { ParameterInput, ParametersInputLookup } from "paramaters";
import { SimpleInputGroup } from "paramaters/input/Common";
import React from "react";
import { SaveCalls } from "unit/SaveableFunction";

export type HexColorString = string | undefined

interface Props {
    title?: string
    help?: string
    placeholder?: string
}

export const HexColor = ({ title, help, placeholder }: Props): ParameterInput<HexColorString> => {
    return ({ name, value, setValue, settings }) => {
        const [data, setData] = React.useState<string>((value || "").toUpperCase())
        const [isValid, setIsValid] = React.useState<boolean>(IsValidColor(data))
        return (
            <SimpleInputGroup
                name={name}
                title={title}
                placeholder={placeholder}
                help={help}
                disabled={settings.disabled}
                required={settings.required}

                value={data}
                onBlur={() => {
                    if (isValid) {
                        setValue(data)
                    }
                    if (data === "") {
                        setValue(undefined)
                    }
                }}
                onChange={(event) => {
                    const data = event.target.value
                    setIsValid(IsValidColor(data) || data === "")
                    setData(data.toUpperCase())
                }}
                intent={isValid ? Intent.NONE : Intent.DANGER}
            />
        )
    }
}
export const SaveableHexColor = SaveCalls("HexColor", HexColor, ParametersInputLookup)

export const IsValidColor = (color: string) => {
    return ((color.length === 7 || color.length === 9) && color.charAt(0) === "#" && !isNaN(Number('0x' + color.substring(1))))
}