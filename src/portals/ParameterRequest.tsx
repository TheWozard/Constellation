import { Alert, IconName, Intent } from "@blueprintjs/core";
import { DARK } from "@blueprintjs/core/lib/esm/common/classes";
import { ParameterObject, Parameters } from "paramaters";
import { ParameterForm } from "paramaters/ParameterForm";
import { AddPortal, PortalProps } from "portals/PortalHandler";
import React from "react";

interface Styling {
    intent?: Intent
    icon?: IconName
}

export const CreateInputRequest = async<T extends ParameterObject>(data: Partial<T>, params: Parameters<T>, styling: Styling = {}): Promise<Partial<T>> => {
    return new Promise<Partial<T>>((resolve, reject) => {
        AddPortal(InputRequestPortal<T>(data, params, styling, resolve, reject))
    })
}

export const InputRequestPortal = <T extends ParameterObject>(data: Partial<T>, params: Parameters<T>, styling: Styling, resolve: (data: Partial<T>) => void, reject: () => void): React.FunctionComponent<PortalProps> => {
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
                <ParameterForm
                    init={internalData}
                    params={params}
                    formProps={{ className: "flex-list" }}
                    onComplete={(data) => {
                        setInternalData(data as Partial<T>)
                    }}
                    submitOnChange
                />
            </Alert>
        )
    }
}