import React from 'react';
import { connect } from 'react-redux';
import GamePage from '../pages/GamePage';

interface Props {
  users: UserStore[];
  username: string;
}

class GamePageContainer extends React.Component<Props> {
  render() {
    const { users, username } = this.props;

    return (
      <GamePage users={users} username={username}/>
    )
  }
};

export default connect(
  (state: RootStore) => ({
    users: state.users,
    username: state.vars.username
  }) as Props,
)(GamePageContainer);