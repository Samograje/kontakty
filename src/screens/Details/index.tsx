import React from 'react';
import Details from './Details';

interface Props {
  navigation: {
    goBack: () => {},
    navigate: (screenName: string, params?: object) => {},
  },
  route,
}

const DetailsScreen = (props: Props) => {
  const { id } = props.route.params;
  const { navigate } = props.navigation;

  const onEdit = (id: number) => navigate('AddEdit', { id: id, mode: 'edit' });

  return (
    <Details
      id={id}
      onEdit={onEdit}
    />
  );
};

export default DetailsScreen;
