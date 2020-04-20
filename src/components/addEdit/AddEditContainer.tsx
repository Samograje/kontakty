import React, {Component} from 'react';
import AddEditComponent from "./AddEditComponent";

interface Props {
    navigation: {
        goBack: () => {},
        navigate: (screenName: string, params?: object) => {},
    },
    route,
}

interface State {
    id: number,
    mode: string,
}

class AddEditContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id: 0,
            mode: '',
        };
    }

    onGroups = (id: number) => this.props.navigation.navigate('Groups', {id: id});

    componentDidMount(): void {
        this.setState({
            mode: this.props.route.params.mode,
            id: this.props.route.params.id,
        });
    }

    render() {
        const {
            onGroups,
        } = this;

        const {
            id,
            mode,
        } = this.state;

        const {

        } = this.props;

        return (
            <AddEditComponent
                id={id}
                mode={mode}
                onGroups={onGroups}
            />
        );
    }
}
export default AddEditContainer;
