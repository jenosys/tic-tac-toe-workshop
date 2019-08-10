import React from 'react';
import { connect } from 'react-redux';
import ServerPage from '../pages/ServerPage';

interface Props {
  servers: ServerStore[];
  idleServerCount: number;
}

class GamePageContainer extends React.Component<Props> {
  render() {
    const { servers, idleServerCount } = this.props;

    return (
      <ServerPage servers={servers} idleServerCount={idleServerCount}/>
    )
  }
};

export default connect(
  (state: RootStore) => ({
    servers: state.servers,
    idleServerCount: state.data.desireIdleSrvCnt
  }) as Props,
)(GamePageContainer);