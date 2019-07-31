import React from 'react';
import { connect } from 'react-redux';
import MainMenu from '../components/MainMenu';

interface Props {
  auth: any;
  userCount: number;
  serverCount: number;
}

class MainMenuContainer extends React.Component<Props> {
  render() {
    const { auth, userCount, serverCount } = this.props;

    return (
      <MainMenu auth={auth} userCount={userCount} serverCount={serverCount}/>
    )
  }
};


export default connect(
  (state: RootStore) => ({
    auth: state.auth,
    userCount: state.users.length,
    serverCount: state.servers.length
  }) as Props,
)(MainMenuContainer);