import {
  FormControl, Grid, Input,
  InputLabel, Snackbar
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as React from 'react';
import { getUser } from '../../util/fetch';
import { registerUser } from '../../util/fetch';

export default function ViewProfile({ toggleModal }) {
  //This js is to fetch user details, for only view purpose

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [cnumber, setCnumber] = React.useState("");
  const [anumber, setAnumber] = React.useState("");

  const emailChange = (event) => {
    setEmail(event.target.value);
  }

  const nameChange = (event) => {
    setName(event.target.value);
  }
 
  const cnumberChange = (event) => {
    setCnumber(event.target.value);
  }

  const anumberChange = (event) => {
    setAnumber(event.target.value);
    
  }
  React.useEffect(() => {
  getUser( localStorage.getItem("username"), localStorage.getItem("email")).then(resp => {
    resp.json().then(data => {
      console.log(data);
      setEmail(data.username);
      setName(data.name);
      setCnumber(data.cnumber);
      setAnumber(data.accNo);
      console.log(data);
    });
  }).catch(error => {
    console.log("login user err " + error);
  });
}, []);
  

  return (
    <React.Fragment>
      <DialogContent>
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-fname">Name</InputLabel>
          <Input
            id="standard-adornment-fname"
            type={'text'}
            value={name}
            disabled={true}
          />
        </FormControl><br></br><br></br>
        
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
          <Input
            id="standard-adornment-email"
            type={'text'}
            value={email}
            disabled={true}
          />
        </FormControl>
        <br></br>
        <br></br>
        
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-cnumber">Contact Number</InputLabel>
          <Input
            id="standard-adornment-cnumber"
            type={'text'}
            value={cnumber}
            disabled={true}
          />
        </FormControl><br></br>
        <br></br>
        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-cnumber">Account Number</InputLabel>
          <Input
            id="standard-adornment-cnumber"
            type={'text'}
            value={anumber}
            disabled={true}
          />
        </FormControl><br></br>
      </DialogContent>
      <DialogActions align='center'>
        <Grid container justify="center">
          <Button variant="contained" color="primary" onClick={toggleModal} >CLOSE</Button>
        </Grid>
      </DialogActions>

    </React.Fragment>
  );
}