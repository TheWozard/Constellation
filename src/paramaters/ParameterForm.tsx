import _ from "lodash";
import { ParameterObject, Parameters } from "paramaters";
import React from "react";

interface Props<T extends ParameterObject> {
    // Allows control over the top level form element from outside
    formProps: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
    init?: T

    params: Parameters<T>
    onComplete: (data: { [s: string]: any }) => void
    onError?: (key: string, type: ParameterErrorType, data: T) => void

    submitOnChange?: boolean
}

export enum ParameterErrorType {
    MissingRequiredField = "MissingRequiredField"
}

// ParameterForm renders a Parameters as a form input. Updating the data when the form is submitted
export const ParameterForm: React.FunctionComponent<React.PropsWithChildren<Props<any>>> = (props) => {
    const [data, setData] = React.useState<{ [s: string]: any }>(props.init || {})

    const submitData = (submission: ParameterObject) => {
        const final = SanitizeData(submission)
        const key = FirstBadKey(submission, props.params)
        if (key != null) {
            if (props.onError) {
                props.onError(key, ParameterErrorType.MissingRequiredField, final)
            }
            return
        }
        props.onComplete(final)
    }

    return (
        <form
            {...props.formProps}
            onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                submitData(data)
            }}
        >
            {Object.keys(props.params).map((key) => {
                const RENDERER = props.params[key].input
                return (
                    <RENDERER
                        key={key}
                        name={key}
                        value={data[key]}
                        setValue={(value) => {
                            const update = { ...data, [key]: value }
                            setData(update)
                            if (props.submitOnChange) {
                                submitData(update)
                            }
                        }}
                        settings={props.params[key].settings || {}}
                    />
                )
            })}
            {props.children}
        </form>
    )
}

function SanitizeData(data: ParameterObject): ParameterObject {
    const final: ParameterObject = {}
    for (const key in data) {
        if (typeof data[key] === "number" || !_.isEmpty(data[key])) {
            final[key] = data[key]
        }
    }

    return final
}

function FirstBadKey(data: ParameterObject, params: Parameters<ParameterObject>): string | null {
    for (const key in params) {
        const settings = params[key].settings || {};
        if (settings.required && data[key] == null) {
            return key
        }
    }
    return null
}