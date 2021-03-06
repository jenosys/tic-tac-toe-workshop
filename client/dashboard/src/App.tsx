import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import api from './api';
import GamePageContainer from './containers/GamePageContainer';
import MainMenuContainer from './containers/MainMenuContainer';
import ServerPageContainer from './containers/ServerPageContainer';
import LeaderboardPage from './pages/LeaderboardPage';
import { setIdleServerNumber, setUsername } from './store/modules/vars';
import { replaceServers } from './store/modules/servers';
import { replaceUsers } from './store/modules/users';
import { ThemeProvider } from '@material-ui/styles';


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

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

interface Props {
  onUpdateUsers: (users: UserStore[]) => void,
  onUpdateServers: (servers: ServerStore[]) => void,
  onUpdateVars: (vars: VarStore) => void,
  onUpdateUsername: (username: string) => void
}

function App(props: Props) {
  const classes = useStyles();

  useEffect(() => {
    api.ioConnect({
      onUpdateUsers: props.onUpdateUsers,
      onUpdateServers: props.onUpdateServers,
      onUpdateVars: props.onUpdateVars,
      onUpdateUsername: props.onUpdateUsername
    });
  });

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MainMenuContainer />
          <Redirect from="/" to="/server" />
          <Route path="/game" component={GamePageContainer} />
          <Route path="/server" component={ServerPageContainer} />
          <Route path="/leaderboard" component={LeaderboardPage} />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default connect(
  undefined,
  (dispatch) => {
    return {
      onUpdateUsers: (users: UserStore[]) => { dispatch(replaceUsers(users)) },
      onUpdateServers: (servers: ServerStore[]) => { dispatch(replaceServers(servers)) },
      onUpdateVars: (vars: VarStore) => { dispatch(setIdleServerNumber(vars.idleServerNumber)) },
      onUpdateUsername: (username: string) => { dispatch(setUsername(username)) }
    }
  }
)(App);