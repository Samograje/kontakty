import React, {Component} from 'react';
import Details from "./Details";

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

class DetailsScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id: 0,
        };
    }

    onEdit = (id: number) => this.props.navigation.navigate('AddEdit', {id: id, mode: 'edit'});

    componentDidMount(): void {
        const {id} = this.props.route.params;
        this.setState({id: id});
    }

    render() {
        const {
            onEdit,
        } = this;

        const {
            id,
        } = this.state;

        const {

        } = this.props;

        return (
            <Details
                id={id}
                onEdit={onEdit}
            />
        );
    }
}
export default DetailsScreen;
