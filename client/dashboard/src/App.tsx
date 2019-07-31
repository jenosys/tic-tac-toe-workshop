import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Redirect, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MainMenuContainer from './containers/MainMenuContainer';
import GamePageContainer from './containers/GamePageContainer';
import ServerPageContainer from './containers/ServerPageContainer';
import LeaderboardPage from './pages/LeaderboardPage';

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

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <MenuAppBar/> */}
      <BrowserRouter>
        {/* <MainMenu hello={'world'}/> */}
        <MainMenuContainer/>
        <Redirect from="/" to="/game" />
        <Route path="/game" component={GamePageContainer} />
        <Route path="/server" component={ServerPageContainer} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      </BrowserRouter>
    </div>

  );
}

export default App;