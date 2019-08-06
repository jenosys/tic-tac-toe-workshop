import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import * as api from './api';
import MainMenuContainer from './containers/MainMenuContainer';
import GamePageContainer from './containers/GamePageContainer';
import ServerPageContainer from './containers/ServerPageContainer';
import LeaderboardPage from './pages/LeaderboardPage';
import { connect } from 'react-redux';

import { addServer, removeServer, updateServer } from './store/modules/servers';
import { addUser, removeUser, replaceUsers } from './store/modules/users';


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
}

function App(props: Props) {
  const classes = useStyles();

  useEffect(() => {
    api.connect({
      onUpdateUsers: props.onUpdateUsers
    });
  });

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <MainMenuContainer />
        <Redirect from="/" to="/game" />
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
      onUpdateUsers: (users: UserStore[]) => { dispatch(replaceUsers(users)) }
    }
  }
)(App);