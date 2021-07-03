

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {io} from 'socket.io-client';
import './chat.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const socket = io("ws://localhost:3000/")

//const socket = io("ws://localhost:3000/")

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

 function Sidebar({userData, roomName}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(userData);
  const [message, setMessage] = React.useState('');
  const [content, setContent] = React.useState([]);
  const [userLIst, setUserList] = React.useState([]);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    socket.emit('join', {userData,roomName})
    socket.on("chat message", ({user,message}) => {
      setContent((prevContent) => prevContent.concat([...content, {user,message}]));
    })
    socket.emit('getlist', {roomName})
    socket.on('getlist', (clients) => {
      setUserList([...clients])
      console.log('clients', userLIst)
    })
    
  },[]);

  const onChane = (event) => {
    setMessage(event.target.value)
}

const handleSubmit = (e) => {
  socket.emit('chat message', {user, message})
  e.preventDefault();
  setMessage('');
}

const renderUsers = () => {
  return userLIst.map((elem, i) => {
    console.log('elem',elem.username);
    return(
      <div>
        <List key={i}>
          <ListItemText primary={elem.username}></ListItemText>
        </List>
        {/* <ul>
          <li>{elem.username}</li>
        </ul> */}
      </div>
    )
  })
  

}

const renderChat = () => {
  return content.map((elem, i) => {
    return (
      <div className='chat-message' key={i}>
        <h3>{elem.user}: {elem.message}</h3>
      </div>
    )
  })
}


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome to Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <button style={{Backgroundcolor: 'red'}}>Disconnect</button>
        </List>
        <Divider />
        <List>
        {userLIst.map((elem, i) => {
          // console.log(userLIst)
          console.log('elem',elem.username);
          return(
            <div>
              <List key={i}>
                <ListItemText primary={elem.username}></ListItemText>
              </List>
            </div>
          )
          })
        }
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          {renderChat()}
          <Link to='/rooms'><p>Test</p></Link>
                     <form onSubmit={handleSubmit} className='message-form'>
                        <input value={message} onChange={(event) => onChane(event)} className='message-input' type='text'></input>
                        <button type='submit'>Send</button>
                    </form> 
                 
      </main>
    </div>
  );
}

export default Sidebar;
