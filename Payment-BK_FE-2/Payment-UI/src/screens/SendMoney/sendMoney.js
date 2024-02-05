import { Tab, Tabs, Card, CardContent, Typography, CardActions,CardHeader, Button, Grid, FormControl, Input,
  InputLabel, TextField, InputAdornment, MenuItem, Snackbar} from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import * as React from 'react';
import Header from '../../common/header/Header';
import './sendMoney.css';
import { getAllUsers, savePayment } from '../../util/fetch';
import AttachMoneyIcon from '@material-ui/icons/CreditCard';
import { createBrowserHistory } from 'history';
export default function SendMoney() {
  //This js is to handle send money to users
  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [type, setType] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [accountError, setAccountError] = React.useState('');
  if(localStorage.getItem('username') ==="" || localStorage.getItem('username') === null) {
    window.location.replace("/");
     handleLogUser();
  }
  
  React.useEffect(() => {
   
    
    getAllUsers().then(res => {
      let data = res.json();
      let allUsers = [];
      data.then(user => {
        console.log(user);
        user.map(e => {
          if(localStorage.getItem('username') !== e.name ){
            allUsers.push(e.name);
          }
        
        })
        setUsers(allUsers);
      });
    })
      .catch(error => {
        console.log("Error during get all users failed" + error);
      })
  }, []);

  

  function handleLogUser() {
    const history = createBrowserHistory();
                  history.push({
                   pathname:"/home",
                  });
  }
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };

  const sendMoney = () => {
    if (account === "" || account === undefined || amount === "" || amount === undefined ||
    type === "" || type === undefined || notes === ""
      || notes === undefined) {
      setSnackMessage('Please fill out this field');
      setOpenSnack(true);
    } else {
      savePayment(account, amount,type, notes ).then(res => {
        res.json().then(data => {
          console.log(data.error);
          if(data.error === "Account not found"){
            setAccountError('Account number invalid');
            setSnackMessage('Payment failed!!');
            setOpenSnack(true);
          } else if(data.error === "from & to user cannot be same"){
            setAccountError('From & To user cannot be same!');
            setSnackMessage('Payment failed!!');
            setOpenSnack(true);
          } else {
            setSnackMessage('Payment success!!');
            setAccountError('');
            setOpenSnack(true);
            setAmount('');
            setAccount('');
            setNotes('');
            setType('');
          }
         
        });
      })
        .catch(error => {
          setAccountError('Account number invalid');
          setSnackMessage('Payment failed!!');
          setOpenSnack(true);
        })
    }
  }

  const modeOfPay = [
    {
      value: 'cash',
      label: 'cash',
    },
    {
      value: 'credit card',
      label: 'credit card',
    },
    {
      value: 'debit card',
      label: 'debit card',
    }
  ];

  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }
  React.useEffect(() => {
    getLoggedInStatus();
  }, [value]);

  function getLoggedInStatus() {
    if (localStorage.getItem("username") !== "" && localStorage.getItem("username") !== undefined
      && localStorage.getItem("username") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  return (
    <React.Fragment>
     <div >
      <Header loginHandler={loginHandler} />
      
      <Grid container style={{marginTop:'100px'}}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
      <Card sx={{ minWidth: 275 }}>
      <CardHeader title={"TRANSFER MONEY"} titleTypographyProps={{ variant:'h4' }} subheader="Send money to the registered users" style={{textAlign:"center"}}>
        </CardHeader>
      <CardContent>
        
      {/* <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" >
          
          <TextField
          id="outlined-select-currency"
          select
          label="Select user"
          value={user}
          onChange={handleUserChange}
          helperText="Please select user needs to pay"
        >
          {users.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </FormControl> */}
        <FormControl  fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Enter Account Number</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={account}
            onChange={handleAccountChange}
          />
          
        </FormControl>
        <br></br>
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{accountError}</span>
        <br></br><br></br>
        <FormControl  style={{width:'48%'}} sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={amount}
            type="number"
            onChange={handleAmountChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          
        </FormControl>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <FormControl style={{width:'48%'}} sx={{ m: 1 }} variant="standard">
          <TextField
          id="outlined-select-currency"
          select
          label="Select type"
          value={type}
          onChange={handleTypeChange}
          helperText="Please select your mode of payment"
        >
          {modeOfPay.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          
        </FormControl>
        <br></br><br></br>

        <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
        <TextField
          id="outlined-multiline-static"
          label="Notes:"
          multiline
          rows={4}
          //defaultValue="Default Value"
           value={notes}
          onChange={handleNotesChange}
        /> </FormControl>
      </CardContent>
      <CardActions style={{justifyContent: 'center'}}>
      <Button variant="contained" style={{justifyContent:'center'}} onClick={sendMoney} color="primary"  ><AttachMoneyIcon/>&nbsp;SEND MONEY</Button>
      </CardActions>
    </Card>
    </Grid>
        <Grid item xs={2}></Grid>
        </Grid>

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
      </div>
    </React.Fragment>
  );
}