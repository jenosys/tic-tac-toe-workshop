import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import api from './api';
import GamePageContainer from './containers/GamePageContainer';
import MainMenuContainer from './containers/MainMenuContainer';
import ServerPageContainer from './containers/ServerPageContainer';
import LeaderboardPage from './pages/LeaderboardPage';
import { setDesireIdleSrvCnt } from './store/modules/data';
import { replaceServers } from './store/modules/servers';
import { replaceUsers } from './store/modules/users';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    margin: {
      margin: theme.spacing(2),
    },
  }),
);

interface Props {
  onUpdateUsers: (users: UserStore[]) => void,
  onUpdateServers: (servers: ServerStore[]) => void,
  onUpdateVars: (vars: VarStore) => void
}

function App(props: Props) {
  const classes = useStyles();

  useEffect(() => {
    api.ioConnect({
      onUpdateUsers: props.onUpdateUsers,
      onUpdateServers: props.onUpdateServers,
      onUpdateVars: props.onUpdateVars
    });
  });

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <MainMenuContainer />
        <Redirect from="/" to="/server" />
        <Route path="/game" component={GamePageContainer} />
        <Route path="/server" component={ServerPageContainer} />
        <Route path="/leaderboard" component={LeaderboardPage} />
      </BrowserRouter>
    </div>

  );
}

export default connect(
  undefined,
  (dispatch) => {
    return {
      onUpdateUsers: (users: UserStore[]) => { dispatch(replaceUsers(users)) },
      onUpdateServers: (servers: ServerStore[]) => { dispatch(replaceServers(servers)) },
      onUpdateVars: (vars: VarStore) => { dispatch(setDesireIdleSrvCnt(vars.idleServerNumber)) }
    }
  }
)(App);