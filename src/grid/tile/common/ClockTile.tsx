import { TileRenderer, TileRendererProps } from "grid/tile/interface";
import React from "react";

enum Timezone {
    utc = "utc",
    local = "local",
}

enum Hours {
    military = "24",
    ampm = "12",
}

interface ClockTileData {
    timezone: Timezone
    hours: Hours
    padHour: boolean
}

interface ClockTileState {
    time: Date
}

class ClockTile extends React.Component<TileRendererProps<ClockTileData>, ClockTileState> {
    private intervalID: NodeJS.Timeout | undefined;

    constructor(props: TileRendererProps<ClockTileData>) {
        super(props);
        this.state = {
            time: new Date()
        };
    }
    public componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    public componentWillUnmount() {
        if (this.intervalID != null) {
            clearInterval(this.intervalID);
        }
    }
    private tick() {
        this.setState({
            time: new Date()
        });
    }
    public render() {
        return (
            <div className={"tile-clock"}>
                <div className={"clock-body"}>
                    <div className={"clock-hours"}>
                        {this.props.data.padHour ? this.padNumber(this.getCorrectedHour(), 2) : this.getCorrectedHour()}
                    </div>
                    <div className={"clock-dividers"}>
                        {(this.state.time.getSeconds() % 2) === 0 ? ":" : " "}
                    </div>
                    <div className={"clock-minutes"}>
                        {this.padNumber(this.getMin(), 2)}
                    </div>
                    {this.props.data.hours !== Hours.military && <div className={"clock-AM-PM"}>
                        {this.getHour() < 12 ? "AM" : "PM"}
                    </div>}
                </div>
            </div>
        );
    }
    private getHour(): number {
        if (this.props.data.timezone === Timezone.utc) {
            return this.state.time.getUTCHours()
        } else {
            return this.state.time.getHours()
        }
    }

    private getCorrectedHour(): number {
        if (this.props.data.hours === Hours.military) {
            return this.getHour()
        } else {
            const hour = this.getHour() % 12
            if (hour === 0) {
                return 12
            } else {
                return hour
            }
        }
    }

    private getMin(): number {
        if (this.props.data.timezone === Timezone.utc) {
            return this.state.time.getUTCMinutes()
        } else {
            return this.state.time.getMinutes()
        }
    }

    private padNumber(num: number, len: number): string {
        var output: string = num.toString();
        while (output.length < len) output = "0" + output;
        return output;
    }
}

export const ClockTileRenderer: TileRenderer<ClockTileData> = {
    type: "clock",
    filters: [],
    layout: () => ({ h: 1, w: 2, isResizable: false }),
    layoutStore: () => ({ h: 1, w: 2 }),
    createNew: () => ({ timezone: Timezone.local, hours: Hours.ampm, padHour: true }),
    RenderTile: ClockTile,
    RenderStore: () => (<ClockTile data={{ timezone: Timezone.local, hours: Hours.ampm, padHour: true }} setData={() => { }} />),
}