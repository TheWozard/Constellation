import { IToastProps, Position, Toaster } from "@blueprintjs/core";

export const DefaultToastTimeout = 10000

export const AppToaster = Toaster.create({
    position: Position.BOTTOM_RIGHT
})

export const ToastError = (message: string, timeout = DefaultToastTimeout) => AppToaster.show({
    message, timeout, icon: "error", intent: "danger"
})

export const PersistentToast = (props: IToastProps): () => void => {
    let completed: boolean = false
    let toast: string | null = null
    props = {...props, timeout:0, onDismiss:(expired) => {
        if (!expired && !completed) {
            toast = AppToaster.show(props)
        }
    }}
    if (props.onDismiss) {
        props.onDismiss(false)
    }
    return () => {
        completed = true
        if (toast != null) {
            AppToaster.dismiss(toast)
        }
    }
}