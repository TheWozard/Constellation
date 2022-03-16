import { Intent, IToastProps, Position, Toaster } from "@blueprintjs/core";
import { SettingsData, ValidToastLevel } from "context/SettingsContext";

export const AppToaster = Toaster.create({
    position: Position.BOTTOM_RIGHT
})

export const Toast = (message: IToastProps, key?: string): string | null => {
    if (ValidToastLevel(SettingsData.ToastLevel, message.intent || Intent.NONE)) {
        return AppToaster.show(message, key)
    }
    return null
}

export const ToastError = (message: string, timeout = 20000) => Toast({
    message, timeout, icon: "error", intent: Intent.DANGER
})

export const ToastWarning = (message: string, timeout = 10000) => Toast({
    message, timeout, icon: "warning-sign", intent: Intent.WARNING
})

export const ToastSuccess = (message: string, timeout = 5000) => Toast({
    message, timeout, icon: "tick", intent: Intent.SUCCESS
})

export const ToastInfo = (message: string, timeout = 5000) => Toast({
    message, timeout, intent: Intent.PRIMARY
})

export const PersistentToast = (props: IToastProps): () => void => {
    let completed: boolean = false
    let toast: string | null = null
    props = {
        ...props, timeout: 0, onDismiss: (expired) => {
            if (!expired && !completed) {
                toast = Toast(props)
                if (toast == null) {
                    return () => { }
                }
            }
        }
    }
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