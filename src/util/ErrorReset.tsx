import { Intent } from "@blueprintjs/core";
import { BoardContextStorage } from "context/BoardContext";
import React from "react";
import { ConfirmButton } from "unit/ConfirmButton";

interface State {
    hasError: boolean
    errorMessage: string
}

export class ErrorReset extends React.Component<React.PropsWithChildren<{}>, State> {

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            errorMessage: error.message || "unknown error"
        };
    }

    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: ""
        };
    }

    public componentDidCatch() {
        console.log("ops")
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="board-centered-content">
                    <h1>Something went wrong.</h1>
                    <p>{this.state.errorMessage}</p>
                    <div style={{ height: "4em" }} />
                    <p>To reset your boards click here, this will DELETE the currently active board</p>
                    <ConfirmButton dialog={
                        <span>Confirm DELETING the current board. This will reset all board data. This action can <b>NOT</b> be undone.</span>
                    } icon={"delete"} text={"DELETE"} intent={Intent.DANGER} onClick={() => {
                        BoardContextStorage.remove()
                        window.location.reload()
                    }} />
                </div>
            )
        }
        return this.props.children;
    }
}