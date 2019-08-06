import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import ServerList from '../components/ServerList';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({    
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
  servers: ServerStore[]
}

export default function ServerPage({ servers }: Props) {  
  const classes = useStyles();
  const idleServers = servers.filter(s => s.state === 'READY');
  const busyServers = servers.filter(s => s.state === 'BUSY');

  
  return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <Typography paragraph>
          Monitoring Page
          
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
        </Typography> */}
        <ServerList key='active' name={'Active'} servers={busyServers}/>
        <ServerList key='idle' name={'Idle'} servers={idleServers}/>
        {
          // server.map(s => (
          //   <Typography paragraph>
          //     server address: {s.serverid} state: {s.state}
          //   </Typography>            
          // ))
        }
      </main>
  );
}