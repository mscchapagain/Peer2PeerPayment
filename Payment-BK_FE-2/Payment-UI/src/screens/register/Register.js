import {
  FormControl, Grid, Input,
  InputLabel, Snackbar
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as React from 'react';
import { registerUser } from '../../util/fetch';

export default function Register({ toggleModal }) {
  //This js file is mainly to register users and it will take care all validations as well
  const [openSnack, setOpenSnack] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');
  const [cpasswordError, setcPasswordError] = React.useState('');
  const [invalidError, setInvalidError] = React.useState('');
  const [snackMessage, setSnackMessage] = React.useState('');
  const passwordChange = (event) => {
    setPassword(event.target.value);
  }

  const cpasswordChange = (event) => {
    setCPassword(event.target.value);
  }

  const emailChange = (event) => {
    setEmail(event.target.value);
    if (!ValidateEmail(event.target.value)) {
      setEmailError('Enter valid Email!');
    } else {
      setEmailError('');
    }
  }

  const nameChange = (event) => {
    setName(event.target.value);
  }
 
  const cnumberChange = (event) => {
    setCnumber(event.target.value);
    if (!phonenumber(event.target.value)) {
      setMobileError('Enter valid Mobile!');
    } else {
      setMobileError('');
    }
  }

  const anumberChange = (event) => {
    setAnumber(event.target.value);
    
  }

  const clickRegister = () => {
    if (email === "" || email === undefined || password === "" || password === undefined ||
      name === "" || name === undefined || cnumber === ""
      || cnumber === undefined || anumber === ""
      || anumber === undefined) {
      setSnackMessage('Please fill out this field');
      setOpenSnack(true);
    } else if (!ValidateEmail(email) || !phonenumber(cnumber)) {
      return false;
    } else if (password != cpassword) {
      setcPasswordError('Password mismatched!');
      return false;
    } else {
      registerUser(name, email, password, cnumber, anumber).then(res => {
        setName("");
        setEmail("");
        setPassword("");
        setCPassword("");
        setCnumber("");
        setAnumber("");
        setSnackMessage('Registration success!, Please log in');
        setOpenSnack(true);
      })
        .catch(error => {
          console.log("Regiter failed" + error);
          setInvalidError('Registration Failed!');
        })
    }
  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  function phonenumber(mobile) {
    var phoneno = /^\d{10}$/;
    if (mobile.match(phoneno)) {
      return true;
    }
    else {
      return false;
    }
  }

  const [logButtonName, setlogButtonName] = React.useState("LOGIN");

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [cnumber, setCnumber] = React.useState("");
  const [anumber, setAnumber] = React.useState("");
  return (
    <React.Fragment>
      <DialogContent>
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-fname">Name</InputLabel>
          <Input
            id="standard-adornment-fname"
            type={'text'}
            value={name}
            onChange={nameChange}
          />
        </FormControl><br></br><br></br>
        
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
          <Input
            id="standard-adornment-email"
            type={'text'}
            value={email}
            onChange={emailChange}
          />
        </FormControl>
        <br></br>
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{emailError}</span>
        <br></br>
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={'password'}
            value={password}
            onChange={passwordChange}
          />
        </FormControl>
        <br></br><br></br>
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={'password'}
            value={cpassword}
            onChange={cpasswordChange}
          />
        </FormControl>
        <br></br>
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{cpasswordError}</span>
        <br></br>
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-cnumber">Contact Number</InputLabel>
          <Input
            id="standard-adornment-cnumber"
            type={'text'}
            value={cnumber}
            onChange={cnumberChange}
          />
        </FormControl><br></br>
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{mobileError}</span>
        <br></br>
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-cnumber">Account Number</InputLabel>
          <Input
            id="standard-adornment-cnumber"
            type={'text'}
            value={anumber}
            onChange={anumberChange}
          />
        </FormControl><br></br>
      </DialogContent>
      <DialogActions align='center'>
        <Grid container justify="center">
          <Button variant="contained" color="primary" onClick={clickRegister} >REGISTER</Button>
        </Grid>
      </DialogActions>

      <Snackbar
       style={{whiteSpace: 'pre-wrap', width:'300px', top:'50%',bottom:'50%', left:'40%', right:'50%'}}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        open={openSnack}
        onClose={handleSnackClose}
        message={snackMessage}
      />
    </React.Fragment>
  );
}