import _ from "lodash";
import { GenericParameters } from "paramaters";
import React, { Children } from "react";

interface Props {
    className?: string
    style?: React.CSSProperties
    init?: { [s: string]: any }

    params: GenericParameters
    onComplete: (data: { [s: string]: any }) => void
    onError: (key: string, type: ParameterErrorType) => boolean | void
}

export enum ParameterErrorType {
    MissingRequiredField = "MissingRequiredField"
}

export const ParameterList: React.FunctionComponent<React.PropsWithChildren<Props>> = ({ className, style, init, params, onComplete, onError, children }) => {
    const [data, setData] = React.useState<{ [s: string]: any }>(init || {})

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            // validation
            const final = { ...data }
            Object.keys(final).forEach((key) => {
                if (_.isEmpty(final[key])) {
                    delete final[key]
                }
            })
            for (const key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {
                    const param = params[key];
                    if (param.required && final[key] == null) {
                        const resp = onError(key, ParameterErrorType.MissingRequiredField)
                        if (resp !== true) {
                            return
                        }
                    }
                }
            }
            onComplete(final)
        }} className={className} style={style}>
            {Object.keys(params).map((key) => {
                const RENDERER = params[key].r
                return (
                    <RENDERER key={key} name={key} param={params[key]} value={data[key]} setValue={(value) => {
                        setData({ ...data, [key]: value })
                    }} />
                )
            })}
            {children}
        </form>
    )
}