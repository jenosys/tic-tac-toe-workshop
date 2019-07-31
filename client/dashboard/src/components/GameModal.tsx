import { Box, createStyles, Grid, IconButton, Theme, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import Iframe from 'react-iframe';

const styles = (theme: Theme) =>
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
  });


export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose } = props;
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
});




export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  function handleClose() {
    onClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      open={open}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle id="simple-dialog-title" onClose={handleClose} >Tic Tac Toe</DialogTitle>
      <Box width="100%" height={550} bgcolor="text.primary" position='relative'>
      <div style={{ zoom: 0.6 }}>
        <div style={{ display: 'table', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
          <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>

              <Grid container justify="center" alignItems="center">
                <Iframe
                  // url="https://www.youtube.com/embed/Wb-0prPgt1o"
                  // url="http://tictactoe-colyseus.herokuapp.com/"
                  url="http://localhost:8080/"
                  width="600px"
                  height="800px"
                  frameBorder={0}
                  scrolling="no"
                />
              </Grid>
            </div>
          </div>
          </div>
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