import * as React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import "./Header.css";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {
  NavLink,
} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import PropTypes from 'prop-types';
import AccountCircleIcon  from '@material-ui/icons/AccountCircle';
import image from '../../assets/logo.png';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import Home from "../../screens/home/Home";
import SendMoney from "../../screens/SendMoney/sendMoney";

import Profile from '../../screens/profile/Profile';
import ViewProfile from '../../screens/profile/ViewProfile';
export default function Header({ loginHandler }) {

  //This js file is to design & api calls related to header section in ui screen

  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  
  const [value, setValue] = React.useState(1);
  const [logButtonName, setlogButtonName] = React.useState(isUserSessionAlreadyExist());


  //This function is to validate user session exists or not
  function isUserSessionAlreadyExist() {
    if (localStorage.getItem("username") !== "" && localStorage.getItem("username") !== undefined
      && localStorage.getItem("username") !== null) {
      loginHandler(true);
      return "LOGOUT";
    } else {
      loginHandler(false);
      return "LOGIN";
    }
  }

  function toggleModal() {
    if (logButtonName === 'LOGOUT') {
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        setlogButtonName("LOGIN");
        window.location.replace("/")
    } else {
      setIsOpen(!isOpen);
    }
  }

  function toggleProfileModal(){
    setIsProfileOpen(!isProfileOpen);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapProfileDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
      minWidth:'500px'
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <AppBar position="static"  >
        <Toolbar className="toolBar" style={{backgroundColor: '#262673'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={image} className="img" style={{height: '45px'}}/>
          </IconButton>
          <Typography variant="h6" component="div" style={{color: 'orange', fontFamily:'cursive'}} >
            Payments
          </Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink className="navbar-item"  to="/home"  style={{color:'white', textDecoration: 'none'}}>
              HOME
            </NavLink> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
              (localStorage.getItem("username") !== undefined && localStorage.getItem("username") !== null && localStorage.getItem("username").trim() !=="") ? (
                <NavLink className="navbar-item"  to="/feed"  style={{color:'white', textDecoration: 'none'}}>
                  PAYMENT HISTORY
                </NavLink>
              ) : ""
            }
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            

            {
              (localStorage.getItem("username") !== undefined && localStorage.getItem("username") !== null && localStorage.getItem("username").trim() !=="") ? (
                <NavLink className="navbar-item"  to="/sendMoney" style={{color:'white', textDecoration: 'none'}}>
                  SEND MONEY
                </NavLink>
              ) : ""
            }
            
            <div style={{flex:'1'}}></div>

          {
          (localStorage.getItem("username") !== undefined && localStorage.getItem("username") !== null && localStorage.getItem("username").trim() !=="") ? (
            <div onClick={toggleProfileModal} style={{cursor:'pointer'}}><AccountCircleIcon  /><span> Hello {localStorage.getItem("username")}!</span>&nbsp;&nbsp;</div>
          ) : ""
          }
          
          <Button variant="contained" color="primary" onClick={toggleModal} >{logButtonName}</Button>
          <BootstrapDialog
            onClose={toggleModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
              AUTHENTICATION
            </BootstrapDialogTitle>

            <TabContext value={value}>
              <Tabs value={value} onChange={handleChange} style={{ textAlign: 'center' }}>
                <Tab label="Login" value={1} style={{ width: '200px' }} />
                <Tab label="Register" value={2} style={{ width: '200px' }} />
              </Tabs>

              <TabPanel value={1} index={0}>
                <Login toggleModal={toggleModal} loginButton={setlogButtonName} />
              </TabPanel>

              <TabPanel value={2} index={1}>
                <Register toggleModal={toggleModal} />
              </TabPanel>

            </TabContext>
          </BootstrapDialog>

          <BootstrapProfileDialog
            onClose={toggleProfileModal}
            aria-labelledby="customized-dialog-title"
            open={isProfileOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleProfileModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
              PROFILE
            </BootstrapDialogTitle>
            <TabContext value={value}>
              <Tabs variant="fullWidth" value={value} onChange={handleChange} style={{ textAlign: 'center' }}>
                <Tab label="VIEW" value={1}  />
                <Tab label="EDIT" value={2} />
              </Tabs>

              <TabPanel value={1} index={0}>
                <ViewProfile toggleModal={toggleProfileModal} />
              </TabPanel>

              <TabPanel value={2} index={1}>
                <Profile toggleModal={toggleProfileModal} />
              </TabPanel>

            </TabContext>
           
          </BootstrapProfileDialog>


        </Toolbar>
      </AppBar>
    </Box>
  );
}