import { Button, ButtonProps, ControlGroup, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { GridActionType, GridContext } from "context/GridContext";
import { GridContent } from "grid/Interface";
import React from "react";
import { Toast, ToastError, ToastSuccess } from "util/Toaster";

interface Props extends ButtonProps {
    content: GridContent
}

export const ContentImportExport: React.FunctionComponent<Props> = ({ content }) => {
    const [text, setText] = React.useState<string>("")
    const [isExport, setExport] = React.useState<boolean>(false)
    const [isImport, setImport] = React.useState<boolean>(false)
    const grid = React.useContext(GridContext)

    return (
        <FormGroup label={"Import/Export"}>
            <ControlGroup fill>
                <Button
                    text={"Import"}
                    icon={"import"}
                    className={"button-padding"}
                    onClick={() => {
                        try {
                            const content = JSON.parse(text)
                            grid.dispatch({ type: GridActionType.SetGridContent, content: content })
                            ToastSuccess("Successfully imported board")
                            setExport(false)
                            setImport(true)
                        } catch {
                            ToastError("Failed to import board")
                            setExport(false)
                            setImport(false)
                        }
                    }}
                    intent={isImport ? Intent.PRIMARY : Intent.NONE}
                />
                <InputGroup
                    value={text}
                    onChange={(event) => {
                        setText(event.target.value)
                    }}
                    fill
                />
                <Button
                    text={"Export"}
                    icon={"export"}
                    className={"button-padding"}
                    onClick={() => {
                        const data = JSON.stringify(content)
                        setText(data)
                        navigator.clipboard.writeText(data)
                        setExport(true)
                        setImport(false)
                        Toast({ intent: Intent.PRIMARY, icon: "clipboard", message: "Copied to clipboard" })
                    }}
                    intent={isExport ? Intent.PRIMARY : Intent.NONE}
                />
            </ControlGroup>
        </FormGroup>
    )
}