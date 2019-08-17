import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BLockIcon from '@material-ui/icons/Block';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import React from 'react';
import api from '../api';



const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },

    card: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
    },
    icon: {
      height: 20,
      width: 20,
    },
  }),
);

interface ServerCardProps {
  server: ServerStore;
  control: boolean;
}

function ServerCard({ server, control }: ServerCardProps) {
  const classes = useStyles1();

  function onClickActive() {
    let promise = api.activeDediServer(server.addr);

    promise.then((result) => {
      console.log(result);
    });
  };

  function onClickBlock() {
    let promise = api.blockDediServer(server.addr);

    promise.then((result) => {
      console.log(result);
    });
  };

  function onClickStop() {
    let promise = api.stopDediServer(server.addr);

    promise.then((result) => {
      console.log(result);
    });
  }

  return (
    <Grid item xs={3}>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5" color={server.status === 'healthy' ? 'primary' : 'error'}>
              {server.addr}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {server.state}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {server.launchType}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {server.image}
            </Typography>
          </CardContent>
          {control &&
            <div className={classes.controls}>
              <IconButton aria-label="play" onClick={onClickActive}>
                <PlayArrowIcon className={classes.icon} />
              </IconButton>
              <IconButton aria-label="stop" onClick={onClickStop}>
                <StopIcon className={classes.icon} />
              </IconButton>
              <IconButton aria-label="block" onClick={onClickBlock}>
                <BLockIcon className={classes.icon} />
              </IconButton>
            </div>
          }
        </div>
      </Card>
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

interface ServerListProps {
  name: string,
  servers: ServerStore[]
}

export default function ServerList({ name, servers }: ServerListProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Typography paragraph>
        {name}({servers.length})
      </Typography>

      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={2}>
          {
            servers.map(s => (
              <ServerCard key={s.addr} server={s} control={name === 'Idle'} />
            ))
          }
        </Grid>
      </Grid>
    </div>
  );
}