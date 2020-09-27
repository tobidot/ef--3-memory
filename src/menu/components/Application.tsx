import * as React from "react"
import { Menu } from "semantic-ui-react"
import { Shared } from "../../shared/Shared";
import { ApplicationWindowItem as ApplicationWindowItem } from "../data/ApplicationTabItem";
import { ApplicationMenuState } from "../data/GameMenuState";
import { GameScreen } from "./GameScreen";
import { MainMenu } from "./MainMenu";

interface Props<T_MENU_STATE> {
    startState: T_MENU_STATE;
}

interface State<T_MENU_STATE> {
    activeItem: T_MENU_STATE;
    windowItems: Array<ApplicationWindowItem<T_MENU_STATE>>;
}

type T_MENU_STATE = ApplicationMenuState;

export class Application extends React.Component<Props<T_MENU_STATE>, State<T_MENU_STATE>> {
    public shared: Shared = Shared.get_instance();
    public state: State<T_MENU_STATE> = {
        activeItem: this.props.startState,
        windowItems: []
    }

    componentDidMount() {
        this.setState({
            windowItems: [
                {
                    state: ApplicationMenuState.MAIN,
                    tab: <div>Menu</div>,
                    content: <MainMenu shared={this.shared} onStart={this.handleStartGame} />,
                },
                {
                    state: ApplicationMenuState.GAME,
                    tab: <div>Game</div>,
                    content: <GameScreen container={this.shared.game_screen_container} />,
                },
            ]
        });
    }

    render() {
        const tabs = this.state.windowItems.map((item) => {
            return this.renderTab(item.state, item.tab);
        });
        return (
            <>
                <Menu tabular size="large">
                    {tabs}
                </Menu>
                {this.renderContent()}
            </>
        );
    }

    renderContent() {
        const activeContent = this.state.windowItems.filter((window) => window.state === this.state.activeItem);
        if (activeContent.length === 0) return null;
        return activeContent[0].content;
    }

    renderTab(state: T_MENU_STATE, tab: React.ReactNode): React.ReactNode {
        return <Menu.Item
            key={state}
            state={state}
            active={this.state.activeItem === name}
            onClick={this.handleItemClick}
        >
            {tab}
        </Menu.Item>
    }

    handleItemClick = (event, target) => {
        this.setState({
            activeItem: target.state
        });
    }

    handleStartGame = (): void => {
        this.setState({
            activeItem: ApplicationMenuState.GAME
        });
    }
}