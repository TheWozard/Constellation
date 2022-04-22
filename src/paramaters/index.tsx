import { SavedFunctionLookup } from "unit/SaveableFunction"

export type ParameterObject = { [s: string]: any }

// Parameters defines a set of Parameter that match the key type
export type Parameters<T> = {
    [K in keyof T]: Parameter<T[K]>
}

// Parameter is a render-able input
export interface Parameter<T> {
    input: ParameterInput<T>
    settings?: ParameterSettings
}

// ParameterSettings is a set of settings for how access for a Parameter is handled
export interface ParameterSettings {
    required?: boolean
    disabled?: boolean
}

// ParameterInput is a render function for a particular type
export type ParameterInput<T> = React.FunctionComponent<ParameterInputProps<T>>

// ParameterInputProps ...
export interface ParameterInputProps<T> {
    name: string
    value: T
    setValue: (value: T) => void
    settings: ParameterSettings
}

export const ParametersInputLookup: SavedFunctionLookup = {}