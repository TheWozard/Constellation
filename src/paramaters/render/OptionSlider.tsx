import { FormGroup, Slider } from "@blueprintjs/core";
import { ParameterRenderer } from "paramaters";
import React from "react";

interface Props<T> {
    options: T[]
    labels?: string[]
    title?: string
    help?: string
    showTrackFill?: boolean
}

export function OptionSlider<T>({ options, labels, title, help, showTrackFill }: Props<T>): ParameterRenderer<T> {
    return ({ name, param, value, setValue }) => {
        const [index, setIndex] = React.useState<number>(() => {
            let index = options.indexOf(value)
            if (index === -1) {
                setValue(options[0])
                return 0
            }
            return index
        })

        return (
            <FormGroup
                label={title || name}
                labelFor={`${name}-input`}
                helperText={help}
                labelInfo={param.required ? "(Required)" : undefined}
            >
                <Slider
                    disabled={param.disabled}
                    min={0}
                    max={options.length-1}
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
            </FormGroup>
        )
    }
}