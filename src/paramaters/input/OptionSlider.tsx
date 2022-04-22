import { FormGroup, Slider } from "@blueprintjs/core";
import { ParameterInput } from "paramaters";
import { SimpleFormGroup } from "paramaters/input/Common";
import React from "react";

interface Props<T> {
    options: T[]
    labels?: string[]
    title?: string
    help?: string
    showTrackFill?: boolean
}

export function OptionSlider<T>({ options, labels, title, help, showTrackFill }: Props<T>): ParameterInput<T> {
    return ({ name, value, setValue, settings }) => {
        const [index, setIndex] = React.useState<number>(() => {
            let index = options.indexOf(value)
            if (index === -1) {
                setValue(options[0])
                return 0
            }
            return index
        })

        return (
            <SimpleFormGroup
                name={name}
                title={title}
                help={help}
                disabled={settings.disabled}
                required={settings.required}
            >
                <Slider
                    disabled={settings.disabled}
                    min={0}
                    max={options.length - 1}
                    value={index}
                    showTrackFill={showTrackFill}
                    onChange={setIndex}
                    onRelease={(target) => {
                        setIndex(target)
                        setValue(options[target])
                    }}
                    labelValues={[]}
                    labelRenderer={(value) => {
                        if (labels != null && value < labels.length) {
                            return labels[value]
                        }
                        return `${options[value]}`
                    }}
                />
            </SimpleFormGroup>
        )
    }
}