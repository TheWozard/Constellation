import { Button, Card, H4, Intent } from "@blueprintjs/core";
import { BoardActionType, BoardContext } from "context/BoardContext";
import { TileIndex } from "board/tile";
import { TileContent, TileStyle, TileData, ContentID } from "board/tile/interface";
import { CreateInputRequest } from "portals/InputRequest";
import { useContext } from "react";
import { ColorInput } from "unit/inputs.tsx/ColorInput";
import { ToastError, ToastSuccess, ToastWarning } from "util/Toaster";


// Tile the common features of all tiles
export const Tile: React.FunctionComponent<TileContent> = (props) => {
    const { state } = useContext(BoardContext)

    return (
        <TileCard style={props.style}>
            {state.editable && <TileMenu {...props} />}
            <TileCore  {...props} />
        </TileCard>
    )
}

interface TileCardProps {
    style: TileStyle
    interactive?: boolean
    onClick?: () => void
}

export const TileCard: React.FunctionComponent<React.PropsWithChildren<TileCardProps>> = ({ style, children, interactive, onClick }) => (
    <Card className={"grid-card tile-hover"} style={CSSPropertiesFromTileStyle(style)} interactive={interactive} onClick={onClick != null && interactive ? (event) => {
        event.stopPropagation()
        event.preventDefault()
        onClick()
    } : undefined}>
        {children}
    </Card>
)

// TileCore the actual core of the tile
const TileCore: React.FunctionComponent<TileContent> = (content) => {
    const { dispatch } = useContext(BoardContext)

    if (content.data == null) {
        return (<UnknownTile />)
    }
    const TILE = TileIndex[content.data.type]
    if (TILE != null) {
        return (<TILE.RenderTile {...content} setData={(data: any) => {
            dispatch({ type: BoardActionType.SetTileData, tile_id: ContentID(content), tile_data: { ...content.data, data } })
        }} />)
    }
    return (<UnknownTile />)
}

// TileMenu the edit menu for all tiles
const TileMenu: React.FunctionComponent<TileContent> = (content) => {
    const { state, dispatch } = useContext(BoardContext)

    return (
        <div className={"tile-hover-menu margin-vertical-spacing"}>
            <Button intent={Intent.DANGER} icon="cross" onClick={() => {
                dispatch({ type: BoardActionType.DeleteTile, tile_id: ContentID(content) })
            }} />
            <Button intent={Intent.NONE} icon="draw" onClick={async () => {
                try {
                    const changes = await CreateInputRequest<TileStyle>({ ...content.style }, {
                        backgroundColor: ColorInput("Background Color", "#000000")
                    }, { icon: "draw" })
                    dispatch({ type: BoardActionType.SetTileStyle, tile_id: ContentID(content), tile_style: { ...content.style, ...changes } })
                    ToastSuccess("Customization updated!")
                } catch (err) {
                    ToastWarning("Canceled editing customization")
                }
            }} />
            <Button intent={content.layout.static ? Intent.PRIMARY : Intent.NONE} icon="pin" onClick={() => {
                dispatch({
                    type: BoardActionType.PinTile, tile_id: ContentID(content),
                })
            }} />
        </div>
    )
}

const UnknownTile: React.FunctionComponent = () => {
    return (
        <H4>{"This tile no longer exists"}</H4>
    )
}

// CSSPropertiesFromTileStyle converts a potentially null style to a React.CSSProperties
const CSSPropertiesFromTileStyle = (style: TileStyle): React.CSSProperties => {
    const props: React.CSSProperties = {}
    if (style != null) {
        if (style.backgroundColor != null) {
            props.backgroundColor = style.backgroundColor
        }
        if (style.textColor != null) {
            props.color = style.textColor
        }
    }
    return props
}