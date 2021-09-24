import { FormGroup, getKeyComboString, InputGroup } from "@blueprintjs/core";
import { ParameterRendererFactory } from "paramaters";
import React from "react";

export type KeyComboString = string

interface Props {
    title?: string
    help?: string
    placeholder?: string
}

export const KeyCombo: ParameterRendererFactory<KeyComboString, Props> = ({ title, help, placeholder }) => {
    return ({ name, param, value, setValue }) => {

        return (
        <FormGroup
            label={title || name}
            labelFor={`${name}-input`}
            helperText={help}
            labelInfo={param.required ? "(Required)" : undefined}
        >
            <InputGroup
                id={`${name}-input`}
                placeholder={placeholder || title || name}
                value={value}
                onKeyDown={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    setValue(getKeyComboString(event as any))
                }}
                fill
                disabled={param.disabled}
            />
        </FormGroup>
    )
            }
}