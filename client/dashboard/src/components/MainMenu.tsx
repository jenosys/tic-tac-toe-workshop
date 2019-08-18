import { Badge, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import Timeline from '@material-ui/icons/Timeline';
import VideogameAsset from '@material-ui/icons/VideogameAsset';
import clsx from 'clsx';
import React from 'react';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      // marginRight: 36,
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
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

export default withRouter(function MainMenu(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const accountOpen = Boolean(anchorEl);
  const { history, auth, userCount, serverCount } = props;

  function handleDrawerOpen() {
    setDrawerOpen(true);
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleAccountClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: drawerOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            틱택토 통합 대시보드
          </Typography>
          {/* {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={accountOpen}
                onClose={handleAccountClose}
              >
                <MenuItem onClick={handleAccountClose}>Profile</MenuItem>
                <MenuItem onClick={handleAccountClose}>My account</MenuItem>
              </Menu>
            </div>
          )} */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={'Games'} onClick={() => history.push('/game')}>
            <ListItemIcon>
              <Badge className={classes.margin} showZero badgeContent={userCount} max={99} color="primary">
                <VideogameAsset />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={'게임'} />
          </ListItem>

          <ListItem button key={'TrendingUp'} onClick={() => history.push('/server')}>
            <ListItemIcon>
              <Badge className={classes.margin} showZero badgeContent={serverCount} max={99} color="primary">
                <Timeline />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={'모니터링'} />
          </ListItem>

          {/* <ListItem button key={'Grade'} onClick={() => history.push('/leaderboard')}>
            <ListItemIcon>
              <Badge className={classes.margin} color="primary">
                <Grade />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={'리더보드'} />
          </ListItem> */}
        </List>
      </Drawer>
    </div>
  );
});