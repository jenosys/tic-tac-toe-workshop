import { createStyles, makeStyles, Theme, Slider, Typography } from '@material-ui/core';
import React from 'react';
import ServerList from '../components/ServerList';
import api from '../api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {
      width: 250,
      margin: theme.spacing(1)
      
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
      margin: theme.spacing(1),
    },
  }),
);

interface Props {
  servers: ServerStore[],
  idleServerCount: number
}

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 75,
    label: '75',
  },
  {
    value: 100,
    label: '100',
  }
];

export default function ServerPage({ servers, idleServerCount }: Props) {
  const classes = useStyles();
  const idleServers = servers.filter(s => s.state === 'ready' || s.state === 'bind');
  const busyServers = servers.filter(s => s.state === 'busy');

  function valuetext(value: number) {
    return value.toString();
  }

  function onChangeIdleServerNumber(event: any, number: number | number[]) {
    api.desireIdleServerCount(number as number);
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <div className={classes.slider}>
        <Typography id="discrete-slider" gutterBottom>
          대기 서버 개수 설정
      </Typography>
        <Slider 
          defaultValue={idleServerCount}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          valueLabelDisplay="auto"
          step={10}
          marks={marks}
          max={100}
          value={idleServerCount}
          onChangeCommitted={onChangeIdleServerNumber}
        />
      </div>

      <div className={classes.margin}>
        <ServerList key='active' name={'Active'} servers={busyServers} />

      </div>
      <div className={classes.margin}>
        <ServerList key='idle' name={'Idle'} servers={idleServers} />
      </div>

    </main>
  );
}