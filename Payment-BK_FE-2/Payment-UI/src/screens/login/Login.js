import {
  FormControl, Grid, Input,
  InputLabel, Snackbar
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as React from 'react';
import { loginUser } from '../../util/fetch';

export default function Login({ toggleModal, loginButton }) {


  //This js file is to handle login user related design & backend API calls
  const [openSnack, setOpenSnack] = React.useState(false);
  const [lusername, setLUsername] = React.useState("");
  const [lpassword, setLPassword] = React.useState("");
  const [invalidError, setInvalidError] = React.useState('');

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const lpasswordChange = (event) => {
    setLPassword(event.target.value);
  }

  const lusernameChange = (event) => {
    setLUsername(event.target.value);
  }

  //This method is to call backend, once all validations success
  const clickLogin = () => {
    if (lusername === "" || lusername === undefined || lpassword === "" || lpassword === undefined) {
      setOpenSnack(true);
    } else {
      loginUser(lusername, lpassword).then(resp => {
        resp.json().then(data => {
          console.log(data);
          
          if (data!== null && data.username !== undefined && data.username !== "" && data.username !== "undefined"
            && data.username !== null) {
              localStorage.setItem("email", data.username);
            localStorage.setItem("username", data.name);
            localStorage.setItem("id", data._id);
            loginButton("LOGOUT");
            toggleModal();
            
          } else {
            setInvalidError('Invalid credentials!');
          }
        });
      }).catch(error => {
        console.log("login user err " + error);
      })
    }
  }


  return (
    <React.Fragment>
      <DialogContent>
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-lusername">Email</InputLabel>
          <Input
            id="standard-adornment-lusername"
            type={'text'}
            defaultValue={lusername}
            onBlur={lusernameChange}
          />
        </FormControl><br></br><br></br>
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-lpassword">Password</InputLabel>
          <Input
            id="standard-adornment-lpassword"
            type={'password'}
            defaultValue={lpassword}
            onBlur={lpasswordChange}
          />
        </FormControl>
        <br></br>
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{invalidError}</span>

      </DialogContent>
      <DialogActions align='center'>
        <Grid container justify="center">
          <Button variant="contained" color="primary" onClick={clickLogin}>LOGIN</Button>
          <br></br>
        </Grid>
      </DialogActions>

      <Snackbar
         style={{whiteSpace: 'pre-wrap', width:'300px', top:'50%',bottom:'50%', left:'40%', right:'50%'}}
        autoHideDuration={1300}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        open={openSnack}
        onClose={handleSnackClose}
        message="Please fill out this field"
      />

    </React.Fragment>

  );
}