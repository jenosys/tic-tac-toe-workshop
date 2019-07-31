import React from 'react';
import { connect } from 'react-redux';
import ServerPage from '../pages/ServerPage';

interface Props {
  servers: ServerStore[];
}

class GamePageContainer extends React.Component<Props> {
  render() {
    const { servers } = this.props;

    return (
      <ServerPage servers={servers}/>
    )
  }
};

export default connect(
  (state: RootStore) => ({
    servers: state.servers
  }) as Props,
)(GamePageContainer);