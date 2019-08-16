import React from 'react';
import { connect } from 'react-redux';
import GamePage from '../pages/GamePage';

interface Props {
  users: UserStore[];
  myname: string;
}

class GamePageContainer extends React.Component<Props> {
  render() {
    const { users, myname } = this.props;

    return (
      <GamePage users={users} myname={myname}/>
    )
  }
};

export default connect(
  (state: RootStore) => ({
    users: state.users,
    myname: state.data.username
  }) as Props,
)(GamePageContainer);