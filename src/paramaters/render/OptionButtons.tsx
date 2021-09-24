import { Button, ControlGroup, FormGroup, Intent } from "@blueprintjs/core";
import { ParameterRenderer } from "paramaters";
import React from "react";

interface Props<T> {
    options: T[]
    labels?: string[]
    title?: string
    help?: string
    minimal?: boolean
    even?: boolean
    intent?: Intent
}

export function OptionButtons<T>({ options, labels, title, help, minimal, even, intent }: Props<T>): ParameterRenderer<T> {
    return ({ name, param, value, setValue }) => {

        React.useEffect(() => {
            if (!options.includes(value)) {
                setValue(options[0])
            }
        })

        return (
            <FormGroup
                label={title || name}
                labelFor={`${name}-input`}
                helperText={help}
                labelInfo={param.required ? "(Required)" : undefined}
            >
                <ControlGroup fill>
                {options.map((option, i) => (
                    <Button 
                        className={even ? "even-buttons" : undefined}
                        key={`${option}`}
                        minimal={minimal} 
                        text={labels != null && i < labels.length ? labels[i] : option}
                        onClick={() => {
                            setValue(option)
                        }}
                        active={value === option}
                        intent={intent}
                    />
                ))}
                </ControlGroup>
            </FormGroup>
        )
    }
}