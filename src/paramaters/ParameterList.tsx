import _ from "lodash";
import { GenericParameters } from "paramaters";
import React from "react";

interface Props {
    className: string
    style: React.CSSProperties

    params: GenericParameters
    onComplete: (data: { [s: string]: any }) => void
    onError: (key: string, type: ParameterErrorType) => boolean | void
}

export enum ParameterErrorType {
    MissingRequiredField = "MissingRequiredField"
}

export const ParameterList: React.FunctionComponent<Props> = ({ className, style, params, onComplete, onError }) => {
    const [data, setData] = React.useState<{ [s: string]: any }>({})

    const elements = React.useMemo(() => {
        return Object.keys(params).map((key) => {
            const RENDERER = params[key].r
            return (
                <RENDERER key={key} param={params[key]} value={data[key]} setValue={(value) => {
                    setData({ ...data, [key]: value })
                }} />
            )
        })
    }, [])

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
            {elements}
        </form>
    )
}