import { Button, H1, Tag } from '@blueprintjs/core';
import React from 'react';

export const Welcome: React.FunctionComponent = () => {
    return (
        <div className="grid-welcome">
            <H1>{"Welcome"}</H1>
            <div>
                <p>
                    To get started
                </p>
                <ul>
                    <li>
                        Press <Tag>?</Tag> to view the hotkeys
                    </li>
                    <li>
                        Click on <Button text={"Tiles"} icon="applications" disabled minimal /> to start adding Tiles to your Dashboard
                    </li>
                    <li>
                        Click on <Button text={"Boards"} icon="git-repo" disabled minimal /> to import a Dashboard
                    </li>
                </ul>
            </div>
        </div>
    )
}