import React from "react";

export interface PortalProps {
    onClose: () => void
}

export let AddPortal: (portal: React.FunctionComponent<PortalProps>) => void = () => {
    console.log("portal has not been attached")
}

export const PortalHandler: React.FunctionComponent = () => {
    const [portals, setPortals] = React.useState<Array<React.FunctionComponent<PortalProps>>>([])
    AddPortal = (portal) => {
        setPortals([...portals, portal])
    }
    if (portals.length > 0) {
        const ELEMENT = portals[0]
        return (
            <ELEMENT onClose={() => {
                setPortals(portals.slice(1))
            }} />
        )
    } else {
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }
}