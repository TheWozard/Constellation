import { getKeyComboString } from "@blueprintjs/core";
import { ParameterInput, ParametersInputLookup } from "paramaters";
import { SimpleInputGroup } from "paramaters/input/Common";
import { SaveCalls } from "unit/SaveableFunction";

export type KeyComboString = string

interface Props {
    title?: string
    help?: string
    placeholder?: string
}

export const KeyCombo = ({ title, help, placeholder }: Props): ParameterInput<KeyComboString> => {
    return ({ name, value, setValue, settings }) => (
        <SimpleInputGroup
            name={name}
            title={title}
            placeholder={placeholder}
            help={help}
            disabled={settings.disabled}
            required={settings.required}
            value={value}
            onChange={() => {
                // This exists to prevent errors from being propagated. The value is updated through the onKeyDown Event instead
            }}
            onKeyDown={(event) => {
                event.stopPropagation()
                event.preventDefault()
                setValue(getKeyComboString(event as any))
            }}
        />
    )
}
export const SaveableKeyCombo = SaveCalls("KeyCombo", KeyCombo, ParametersInputLookup)