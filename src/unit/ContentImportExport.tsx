import { Button, ButtonProps, ControlGroup, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { BoardActionType, BoardContext, DefaultBoardContextStorage } from "context/BoardContext";
import { BoardContent } from "board/interface";
import React from "react";
import { Toast, ToastError, ToastSuccess } from "util/Toaster";
import { PureLayout } from "board/layout/interface";

interface Props extends ButtonProps {
    content: BoardContent
}

export const ContentImportExport: React.FunctionComponent<Props> = ({ content }) => {
    const [text, setText] = React.useState<string>("")
    const [isExport, setExport] = React.useState<boolean>(false)
    const [isImport, setImport] = React.useState<boolean>(false)
    const grid = React.useContext(BoardContext)

    return (
        <FormGroup label={"Import/Export"}>
            <ControlGroup fill>
                <Button
                    text={"Import"}
                    icon={"import"}
                    className={"button-padding"}
                    onClick={() => {
                        try {
                            const content = SanitizeContent(JSON.parse(text))
                            grid.dispatch({ type: BoardActionType.SetContent, content: content })
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
                        const data = JSON.stringify(SanitizeContent(content))
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

const SanitizeContent = (content: Partial<BoardContent>): BoardContent<PureLayout> => {
    if (typeof content !== "object") {
        throw new Error("expected board content to be object")
    }
    return {
        details: {
            name: content.details?.name || DefaultBoardContextStorage.content.details.name,
            description: content.details?.description || DefaultBoardContextStorage.content.details.description,
            last_updated: typeof content.details?.last_updated === "string" ? new Date(content.details.last_updated) : (content.details?.last_updated || new Date()),
            columns: content.details?.columns || DefaultBoardContextStorage.content.details.columns
        },
        tiles: (content.tiles || []).map((tile) => {
            const copy: any = { ...tile, layout: { ...tile.layout } }
            delete copy.layout.i
            delete copy.layout.isBounded
            delete copy.layout.moved
            return {
                layout: {
                    x: tile.layout.x || 0,
                    y: tile.layout.y || 0,
                    w: tile.layout.w || 1,
                    h: tile.layout.h || 1,

                    minW: tile.layout.minW,
                    minH: tile.layout.minH,
                    maxW: tile.layout.maxW,
                    maxH: tile.layout.maxH,

                    static: tile.layout.static,
                    isDraggable: tile.layout.isDraggable,
                    isResizable: tile.layout.isResizable,
                } as PureLayout,
                style: {
                    backgroundColor: tile.style.backgroundColor,
                    textColor: tile.style.textColor
                },
                data: {
                    type: tile.data.type,
                    data: tile.data.data
                }
            }
        }),
        context: {}
    }
}