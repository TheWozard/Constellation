import { FormGroup, IconName, InputGroup } from "@blueprintjs/core";
import { ParameterRendererFactory } from "paramaters";

interface Props {
    title?: string
    help?: string
    placeholder?: string
    icon?: IconName
    leftElement?: JSX.Element
    rightElement?: JSX.Element
}

export const String: ParameterRendererFactory<string, Props> = ({ title, help, placeholder, icon, leftElement, rightElement }) => {
    return ({ name, param, value, setValue }) => (
        <FormGroup
            label={title || name}
            labelFor={`${name}-input`}
            helperText={help}
            labelInfo={param.required ? "(Required)" : undefined}
        >
            <InputGroup
                id={`${name}-input`}
                placeholder={placeholder || title || name}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value)
                }}
                leftIcon={icon}
                leftElement={leftElement}
                rightElement={rightElement}
                fill
                disabled={param.disabled}
            />
        </FormGroup>
    )
}