import { Intent } from "@blueprintjs/core";
import { ParameterInput, ParametersInputLookup } from "paramaters";
import { SimpleInputGroup } from "paramaters/input/Common";
import React from "react";
import { SaveCalls } from "unit/SaveableFunction";

interface Props {
    title?: string
    help?: string
    placeholder?: string
}

export const String = ({ title, help, placeholder }: Props): ParameterInput<string> => {
    return ({ name, value, setValue, settings }) => (
        <SimpleInputGroup
            name={name}
            title={title}
            placeholder={placeholder}
            help={help}
            disabled={settings.disabled}
            required={settings.required}
            value={value}
            onChange={(event) => {
                setValue(event.target.value)
            }}
        />
    )
}
export const SaveableHexColor = SaveCalls("String", String, ParametersInputLookup)