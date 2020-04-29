import React, {Component} from 'react';
import ContactsList from './ContactsList';

interface Props {
  navigation: {
    goBack: () => {},
        navigate: (screenName: string, params?: object) => {},
  },
}

interface State {
  id: number,
}

class ContactsListScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: 0,
    };
  }

  onCreate = () => this.props.navigation.navigate('AddEdit', {mode: 'create'});

  onEdit = (id: number) => this.props.navigation.navigate('AddEdit', {id: id, mode: 'edit'});

  onDetails = (id: number) => this.props.navigation.navigate('Details', {id});

  render() {
    const {
      onDetails,
      onCreate,
      onEdit
    } = this;

    const {

    } = this.state;

    const {
    } = this.props;

    return (
        <ContactsList
          onDetails={onDetails}
          onCreate={onCreate}
          onEdit={onEdit}
        />
    );
  }
}

export default ContactsListScreen;
