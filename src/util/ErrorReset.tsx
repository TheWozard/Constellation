import React from "react"

interface State {
    hasError: boolean
}

export class ErrorReset extends React.Component<React.PropsWithChildren<{}>, State> {

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = { hasError: false };
    }

    public componentDidCatch() {
        console.log("ops")
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="board-centered-content">
                    <h1>Something went wrong.</h1>
                </div>
            )
        }
        return this.props.children;
    }
}