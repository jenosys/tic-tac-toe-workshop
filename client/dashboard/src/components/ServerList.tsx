import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

interface ServerCardProps {
  server: ServerStore;
}

function ServerCard({ server }: ServerCardProps) {
  const classes = useStyles1();

  return (
    <Grid item xs={3}>
      <Paper className={classes.paper}>{server.addr}</Paper>
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
              <ServerCard key={s.addr} server={s} />
            ))
          }
        </Grid>
      </Grid>
    </div>
  );
}