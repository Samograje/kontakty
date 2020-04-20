import React, {Component} from 'react';
import GroupComponent from "./GroupsComponent";

interface Props {
    navigation: {
        goBack: () => {},
        navigate: (screenName: string, params?: object) => {},
    },
    route,
}

interface State {
    id: number,
}

class GroupsContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id: 0,
        };
    }

    componentDidMount(): void {
        this.setState({
            id: this.props.route.params.id,
        });
    }

    render() {
        const {
        } = this;

        const {
            id,
        } = this.state;

        const {

        } = this.props;

        return (
            <GroupComponent
                id={id}
            />
        );
    }
}
export default GroupsContainer;
