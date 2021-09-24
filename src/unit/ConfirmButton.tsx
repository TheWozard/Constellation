import { Alert, Button, ButtonProps, Classes } from "@blueprintjs/core";
import React from "react";

interface Props extends ButtonProps {
    dialog: JSX.Element | string
    cancelButtonText?: string
    confirmButtonText?: string
    onClick: () => void
}

export const ConfirmButton: React.FunctionComponent<Props> = (props) => {
    const [confirm, setConfirm] = React.useState(false)

    return (
        <React.Fragment>
            <Button {...props} onClick={() => {
                setConfirm(true)
            }}/>
            <Alert
                className={Classes.DARK}
                isOpen={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={() => {
                    setConfirm(false)
                    props.onClick()
                }}
                intent={props.intent}
                icon={props.icon}
                cancelButtonText={props.cancelButtonText || "Cancel"}
                confirmButtonText={props.confirmButtonText || `${props.text}`}
            >
                {props.dialog}
            </Alert>
        </React.Fragment>
    )
}