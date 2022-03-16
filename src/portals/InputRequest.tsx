import { Alert, IconName, Intent } from "@blueprintjs/core";
import { DARK } from "@blueprintjs/core/lib/esm/common/classes";
import { AddPortal, PortalProps } from "portals/PortalHandler";
import React from "react";

type InputRequestForm<T> = {
    [K in keyof T]: InputRequestFormRenderer<T[K]>
}

interface Styling {
    intent?: Intent
    icon?: IconName
}

export type InputRequestFormRenderer<T> = React.FunctionComponent<{
    value: T
    set: (value: T) => void
}>

export const CreateInputRequest = async<T extends object>(data: Partial<T>, form: InputRequestForm<T>, styling: Styling = {}): Promise<Partial<T>> => {
    return new Promise<Partial<T>>((resolve, reject) => {
        AddPortal(InputRequestPortal<T>(data, form, styling, resolve, reject))
    })
}

export const InputRequestPortal = <T extends object>(data: Partial<T>, form: InputRequestForm<T>, styling: Styling, resolve: (data: Partial<T>) => void, reject: () => void): React.FunctionComponent<PortalProps> => {
    return ({ onClose }) => {
        const [open, setOpen] = React.useState<boolean>(true)
        const [internalData, setInternalData] = React.useState<Partial<T>>(data)
        const [failure, setFailure] = React.useState<boolean>(false)

        return (
            <Alert
                className={DARK}
                isOpen={open}
                onClosed={() => {
                    onClose()
                    if (failure) {
                        reject()
                    } else {
                        resolve(internalData)
                    }
                }}
                canEscapeKeyCancel={true}
                cancelButtonText={"Cancel"}
                intent={styling.intent || Intent.PRIMARY}
                icon={styling.icon}
                onCancel={() => {
                    setFailure(true)
                    setOpen(!open)
                }}
                onConfirm={() => {
                    setOpen(!open)
                }}
            >
                {Object.keys(form).map((key) => {
                    const ELEM: InputRequestFormRenderer<any> = (form as any)[key]
                    return (
                        <ELEM key={key} value={(internalData as any)[key]} set={(value) => {
                            setInternalData({ ...internalData, [key]: value })
                        }} />
                    )
                })}
            </Alert>
        )
    }
}