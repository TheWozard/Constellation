export type GenericParameters = {
    [key: string]: Parameter<any>
}

export type Parameters<T> = {
    [K in keyof T]: Parameter<T[K]>
}

export interface Parameter<T> {
    r: ParameterRenderer<T>
    required?: boolean
    disabled?: boolean
}

export type ParameterRenderer<T> = React.FunctionComponent<ParameterRendererProps<T>>
export type ParameterRendererFactory<T, P = {}> = (props: P) => ParameterRenderer<T>

export interface ParameterRendererProps<T> {
    name: string
    param: Parameter<T>
    value: T
    setValue: (value: T) => void
}