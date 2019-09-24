import { Box, createStyles, IconButton, makeStyles, Theme, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import useInterval from '@use-it/interval';
import React, { useEffect } from 'react';
import Iframe from 'react-iframe';
import api from '../api';
import env from '../env';
import * as utils from '../utils';
import { flexbox } from '@material-ui/system';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  })
);


export interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

function DialogTitle({ children, onClose }: DialogTitleProps) {
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}



export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

let requestKey = '';


function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, open } = props;
  const [phase, setPhase] = React.useState('init'); // init, requested, responded
  const [delay, setDelay] = React.useState(1000);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [serverAddr, setServerAddr] = React.useState('');

  useEffect(() => {
    // componentDidMount
    let closeMe = (event: MessageEvent) => {
      if (event.data === 'closeMe') {
        console.log('closeMe');
        handleClose();
      }
    }
    window.addEventListener('message', closeMe);

    return () => {
      // componentWillUnmount
      window.removeEventListener('message', closeMe);
    }
  }, []);

  useInterval(() => {
    setElapsedTime(elapsedTime + 1);
  }, delay);

  if (open && phase === 'init') {
    let key = utils.randomString(20);

    requestKey = key;
    setElapsedTime(0);
    setDelay(1000);
    setPhase('requested');

    console.log('send request');
    api.requestMatching('jaeseok').then(response => {
      if (open && key === requestKey) {
        setDelay(null as any);
        setServerAddr(response.data.serverAddr || '');
        setPhase('responded');

      }
    });
  }

  function handleClose() {
    onClose();

    setElapsedTime(0);
    setDelay(null as any);
    setServerAddr('');
    setPhase('init');

    requestKey = '';

    console.log('called handleClose');
  }

  let content = null;

  if (phase === 'init') {
  } else if (phase === 'requested') {
    content =
      <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <Grid container justify="center" alignItems="center">
          <div>
            <CircularProgress size={70} />
            <Typography variant="h2" color="primary" align='center'>
              {elapsedTime}
            </Typography>
          </div>
        </Grid>
      </div>
  } else if (phase === 'responded' && serverAddr === '') {
    content =
      <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <Grid container justify="center" alignItems="center">
          <Typography variant="h3" color="error">
            매칭이 실패했습니다.<br />
            다시 시도해 주세요.
          </Typography>
        </Grid>
      </div >
  } else {
    content =
      <Iframe
        // url={`http://localhost:8080/?hostname=${"13.124.158.138"}%3A${32795}`}
        // url={`http://localhost:8080/?hostname=${serverAddr.replace(':', '%3A')}`}
        url={`${env.CLIENT_URL}/?hostname=${serverAddr.replace(':', '%3A')}`}
        // styles={{ width: '100%', height: '100%' }}
        width='100%'
        height='100%'
        frameBorder={0}
        scrolling="no"
      />
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      open={open}
      fullWidth={true}
      maxWidth='lg'
    >
      <DialogTitle id="simple-dialog-title" onClose={handleClose} >Tic Tac Toe {serverAddr}</DialogTitle>
      <Box height='90vh' bgcolor="text.primary" position='relative'>
        <div style={{ height: '100%' }}>
          {content}
        </div>
      </Box>
    </Dialog>
  );
}

function GameModal() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Start Game
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default GameModal;