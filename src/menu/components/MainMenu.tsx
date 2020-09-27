import * as React from "react"
import { Grid, Button } from "semantic-ui-react";
import { Shared } from "../../shared/Shared";

interface Props {
    shared: Shared;
    onStart?: () => void
}

interface State {
    page: MainMenuPage;
}

enum MainMenuPage {
    MENU
}


export class MainMenu extends React.Component<Props> {
    public state: State;

    constructor(props) {
        super(props);
        this.state = {
            page: MainMenuPage.MENU,
        };
    }

    render() {
        return (
            <Grid centered columns={3}>
                <Grid.Row>
                    <Grid.Column verticalAlign="middle">
                        <Button.Group vertical>
                            <Button positive onClick={this.startButtonFunc}>
                                Start
                            </Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column verticalAlign="middle" textAlign="left">
                        Empty
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle" textAlign="left">
                        Empty
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle" textAlign="left">
                        Empty
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    public startButtonFunc = () => {
        if (this.props.onStart) this.props.onStart();
    }

}