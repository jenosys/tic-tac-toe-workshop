import React from 'react';
import { connect } from 'react-redux';
import GamePage from '../pages/GamePage';

interface Props {
  users: UserStore[];
}

class GamePageContainer extends React.Component<Props> {
  render() {
    const { users: user } = this.props;

    return (
      <GamePage user={user}/>
    )
  }
};

export default connect(
  (state: RootStore) => ({
    users: state.users
  }) as Props,
)(GamePageContainer);