import { Button, Intent } from "@blueprintjs/core";
import { ParameterInput, ParametersInputLookup } from "paramaters";
import { SimpleControlGroup } from "paramaters/input/Common";
import React from "react";
import { SaveCalls } from "unit/SaveableFunction";

interface Props<T> {
    options: T[]
    labels?: string[]
    title?: string
    help?: string
    minimal?: boolean
    even?: boolean
    intent?: Intent
}

export function OptionButtons<T>({ options, labels, title, help, minimal, even, intent }: Props<T>): ParameterInput<T> {
    return ({ name, value, setValue, settings }) => {

        React.useEffect(() => {
            if (!options.includes(value)) {
                setValue(options[0])
            }
        })

        return (
            <SimpleControlGroup
                name={name}
                title={title}
                help={help}
                disabled={settings.disabled}
                required={settings.required}
                intent={intent}
            >
                {options.map((option, i) => (
                    <Button
                        className={even ? "even-buttons" : undefined}
                        key={`${option}`}
                        minimal={minimal}
                        text={labels != null && i < labels.length ? labels[i] : option}
                        onClick={() => {
                            setValue(option)
                        }}
                        disabled={settings.disabled}
                        active={value === option}
                        intent={intent}
                    />
                ))}
            </SimpleControlGroup>
        )
    }
}
export const SaveableOptionButtons = SaveCalls("OptionsButtons", OptionButtons, ParametersInputLookup)
