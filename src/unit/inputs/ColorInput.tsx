import { FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { InputRequestFormRenderer } from "portals/InputRequest";
import React from "react";

export const ColorInput = (title: string, placeholder?: string): InputRequestFormRenderer<string | undefined> => {
    return ({ value, set }) => {
        const [data, setData] = React.useState<string>((value || "").toUpperCase())
        const [isValid, setIsValid] = React.useState<boolean>(IsValidColor(data))

        return (
            <FormGroup label={title}>
                <InputGroup
                    onBlur={() => {
                        if (isValid) {
                            set(data)
                        }
                        if (data === "") {
                            set(undefined)
                        }
                    }}
                    onChange={(event) => {
                        const data = event.target.value
                        setIsValid(IsValidColor(data) || data === "")
                        setData(data.toUpperCase())
                    }}
                    value={data}
                    intent={isValid ? Intent.NONE : Intent.DANGER}
                    placeholder={placeholder || title}
                    fill
                />
            </FormGroup>
        )
    }
}

export const IsValidColor = (color: string) => {
    return ((color.length === 7 || color.length === 9) && color.charAt(0) === "#" && !isNaN(Number('0x' + color.substring(1))))
}