import { ControlGroup, FormGroup, InputGroup, InputGroupProps2, Intent } from "@blueprintjs/core";


interface SimpleFormGroupProps {
    name: string
    title?: string
    help?: string
    label?: string
    required?: boolean
    disabled?: boolean
    intent?: Intent
}

export const SimpleFormGroup: React.FunctionComponent<React.PropsWithChildren<SimpleFormGroupProps>> = ({ name, title, help, label, required, disabled, intent, children }) => (
    <FormGroup
        label={title || name}
        labelFor={`${name}-input`}
        subLabel={label}
        helperText={help}
        labelInfo={required ? "(Required)" : undefined}
        disabled={disabled}
        intent={intent}
    >
        {children}
    </FormGroup>
)

interface SimpleInputGroupProps extends InputGroupProps2, SimpleFormGroupProps {
    name: string
    placeholder?: string
}

export const SimpleInputGroup: React.FunctionComponent<SimpleInputGroupProps> = ({ name, placeholder, ...props }) => (
    <SimpleFormGroup
        {...props}
        name={name}
    >
        <InputGroup
            {...props}
            id={`${name}-input`}
            placeholder={placeholder || props.title || name}
            fill
        />
    </SimpleFormGroup>
)

export const SimpleControlGroup: React.FunctionComponent<React.PropsWithChildren<SimpleFormGroupProps>> = ({ children, ...props }) => (
    <SimpleFormGroup
        {...props}
    >
        <ControlGroup
            fill
            id={`${props.name}-input`}
        >
            {children}
        </ControlGroup>
    </SimpleFormGroup>
)