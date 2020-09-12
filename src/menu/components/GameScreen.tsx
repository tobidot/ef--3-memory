import * as React from "react";
import { Segment, Grid, Container } from "semantic-ui-react";
import { Shared } from "../../shared/Shared";
import { ObservableSocket } from "@game.object/ts-game-toolbox/dist/src/signals/ObservableSocket";

interface Props {
    container: ObservableSocket<HTMLDivElement | null>
}

export class GameScreen extends React.PureComponent<Props> {
    private game_screen_container = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        this.props.container.set(this.game_screen_container.current);
    }

    public componentWillUnmount() {
        this.props.container.set(null);
    }

    render() {
        return (
            <Container>
                <div id="game-screen" ref={this.game_screen_container}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex"
                    }} />
            </Container>
        );
    }
}