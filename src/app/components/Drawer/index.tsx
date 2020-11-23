import React from 'react';
import clsx from 'clsx';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import LocalShipping from '@material-ui/icons/LocalShipping';
import Motorcycle from '@material-ui/icons/Motorcycle';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import {
  SwipeableDrawer,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { useTypedSelector } from 'store/reducers';
import { signOut } from 'app/containers/SignInPage/action';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }),
);

const UserAvatar = () => {
  const classes = useStyles();
  const { name } = useTypedSelector(state => state.me);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    handleClose();
    dispatch(signOut());
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar className={classes.purple} onClick={handleClick}>
        {name[0]}
      </Avatar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export const AppDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProviderClick = () => {
    dispatch(push('/provider-list'));
  };

  const handleTakeOutClick = () => {
    dispatch(push('/take-out/list'));
  };

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <div
      className={classes.root}
      onClick={() => {
        if (open) {
          toggleDrawer(false);
        }
      }}
    >
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Box display="flex" style={{ width: '100%' }}>
            <Box flexGrow={1}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
                className={clsx(classes.menuButton)}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box>
              <UserAvatar />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List onClick={toggleDrawer(false)}>
          <ListItem
            button
            key={'provider'}
            onClick={() => {
              handleProviderClick();
            }}
          >
            <ListItemIcon>
              <LocalShipping />
            </ListItemIcon>
            <ListItemText primary={'provider'} />
          </ListItem>
          <ListItem
            button
            key={'takeOut'}
            onClick={() => {
              handleTakeOutClick();
            }}
          >
            <ListItemIcon>
              <Motorcycle />
            </ListItemIcon>
            <ListItemText primary={'take out'} />
          </ListItem>
        </List>
        <Divider />
      </SwipeableDrawer>
      <main className={classes.content} onClick={toggleDrawer(false)}>
        {children}
      </main>
    </div>
  );
};
