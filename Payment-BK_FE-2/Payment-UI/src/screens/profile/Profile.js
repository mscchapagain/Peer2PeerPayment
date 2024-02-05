import {
  FormControl, Grid, Input,
  InputLabel, Snackbar
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as React from 'react';
import { registerUser } from '../../util/fetch';
import { getUser, editUsers } from '../../util/fetch';
export default function Profile({ toggleModal }) {

  //This js file is to edit user data and also it have all email/mobilenumber/password validations

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

  //Whenever user clicked profile, below useEffect will trigger to fetch user data 
  React.useEffect(() => {
    getUser( localStorage.getItem("username"), localStorage.getItem("email")).then(resp => {
      resp.json().then(data => {
        console.log(data);
        setEmail(data.username);
        setName(data.name);
        setCnumber(data.cnumber);
        setAnumber(data.accNo);
        setPassword(data.password);
        setCPassword(data.password);
        console.log(data);
      });
    }).catch(error => {
      console.log("login user err " + error);
    });
  }, []);

  //Whenever user clicked edit & save, below editUser will trigger to save edited user data
  const editUser = () => {
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
      editUsers(name, email, password, cnumber, anumber).then(res => {
        setSnackMessage('User updated successfully');
        setOpenSnack(true);
        localStorage.setItem("email", email);
        localStorage.setItem("username", name);
      })
        .catch(error => {
          console.log("User update failed" + error);
          setInvalidError('User update Failed!');
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
            defaultValue={name}
            onChange={nameChange}
          />
        </FormControl><br></br><br></br>
        
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
          <Input
            id="standard-adornment-email"
            type={'text'}
            value={email}
            defaultValue={email}
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
            defaultValue={password}
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
            defaultValue={cpassword}
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
            defaultValue={cnumber}
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
            defaultValue={anumber}
            onChange={anumberChange}
          />
        </FormControl><br></br>
      </DialogContent>
      <DialogActions align='center'>
        <Grid container justify="center">
          <Button variant="contained" color="primary" onClick={editUser} >SAVE</Button>
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