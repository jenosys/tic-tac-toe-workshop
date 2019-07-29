// import React from 'react';
// import { Route, Link, BrowserRouter, Redirect } from 'react-router-dom';
// import './App.css';
// import { Frame, AppProvider, TopBar } from '@shopify/polaris';
// import SideMenuComp from './components/SideMenuComp';
// import { GamePage } from './pages/GamePage';
// import { MonitoringPage, LeaderboardPage } from './pages/MonitoringPage';
// import SetUsernameComp from './components/SetUsernameComp';

// const theme = {
//   colors: {
//     topBar: {
//       background: '#357997',
//     },
//   },
//   logo: {
//     width: 59,
//     topBarSource:
//       'https://a0.awsstatic.com/libra-css/images/logos/aws_smile-header-desktop-en-white_59x35.png',
//     url: 'http://localhost',
//     accessibilityLabel: 'AWS Container Demo',
//   },
// };

// const AdapterLink = ({ url, ...rest }: {url: string }) => <Link to={url} {...rest}/>

// interface State {
// 	userMenuOpen: boolean,
// 	setUserNameOpen: boolean
// }

// class App extends React.Component<{}, State> {
// 	state = {
// 		userMenuOpen: false,
// 		setUserNameOpen: false
// 	};

// 	render() {
// 		const {
// 			state,
// 			toggleUserMenu,
// 		} = this;
// 		const {
// 			userMenuOpen,
// 			setUserNameOpen
// 		} = state;

// 		const userMenuMarkup = (
// 			<TopBar.UserMenu
// 				actions={[
// 					{
// 						items: [{content: '이름 변경', onAction: () => this.toggleSetUsername() }],
// 					}
// 				]}
// 				name="이름없음"
// 				initials=""
// 				open={userMenuOpen}
// 				onToggle={toggleUserMenu}
// 			/>
// 		);


// 		const topBarMarkup = (
// 			<TopBar
// 				// showNavigationToggle={true}
// 				userMenu={userMenuMarkup}
// 			></TopBar>
// 		);

// 		return ( 
// 			<AppProvider 
// 				theme={theme}
// 				linkComponent={AdapterLink}
// 			>
// 				<BrowserRouter>
// 					<Frame
// 						topBar={topBarMarkup}
// 						navigation={(<SideMenuComp/>)}
// 					>
// 						<Redirect from="/" to="/game"/>
// 						<Route path="/game" component={GamePage} />
// 						<Route path="/monitoring" component={MonitoringPage} />
// 						<Route path="/leaderboard" component={LeaderboardPage} />

// 						{<SetUsernameComp
// 							active={setUserNameOpen}
// 						/>}
// 					</Frame>
// 				</BrowserRouter>    
// 			</AppProvider>
// 		);
// 	}

// 	toggleUserMenu = () => {
// 		this.setState(({userMenuOpen}) => ({userMenuOpen: !userMenuOpen}));
// 	};

// 	toggleSetUsername = () => {
// 		this.setState(({setUserNameOpen}) => ({setUserNameOpen: !setUserNameOpen}));
// 	}
// }

// export default App;

import React from 'react';
import MenuAppBar from './components/MenuAppBar_dprecated';
import MainMenu from './components/MainMenu';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { Redirect, Route } from 'react-router';
import GamePage from './pages/GamePage';
import { BrowserRouter } from 'react-router-dom';
import MonitoringPage from './pages/MonitoringPage';
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
  const theme = useTheme();

  return (
    <div className={classes.root}>
      {/* <MenuAppBar/> */}
      <BrowserRouter>
        <MainMenu hello={'world'}/>
        <Redirect from="/" to="/game" />
        <Route path="/game" component={GamePage} />
        <Route path="/monitoring" component={MonitoringPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      </BrowserRouter>

      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main> */}
    </div>

  );
}

export default App;