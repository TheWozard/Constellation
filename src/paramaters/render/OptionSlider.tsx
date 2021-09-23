import { FormGroup, Slider } from "@blueprintjs/core";
import { ParameterRendererFactory } from "paramaters";
import React from "react";

interface Props {
    options: string[]
    labels?: string[]
    title?: string
    help?: string
    showTrackFill?: boolean
}

export const OptionSlider: ParameterRendererFactory<string, Props> = ({ options, labels, title, help, showTrackFill }) => {
    return ({ key, param, value, setValue }) => {
        const [index, setIndex] = React.useState(() => {
            let index = options.indexOf(value)
            if (index === -1) {
                setValue(options[0])
                return 0
            }
            return index
        })
        return (
            <FormGroup
                label={title || key}
                labelFor={`${key}-input`}
                helperText={help}
                labelInfo={param.required ? "(Required)" : undefined}
            >
                <Slider
                    disabled={param.disabled}
                    min={0}
                    max={options.length}
                    value={index}
                    showTrackFill={showTrackFill}
                    onChange={setIndex}
                    onRelease={(target) => {
                        setIndex(target)
                        setValue(options[target])
                    }}
                    labelRenderer={(value) => {
                        if (labels != null && value < labels.length) {
                            labels[value]
                        }
                        return options[value]
                    }}
                />
            </FormGroup>
        )
    }
}