import { Tab, Tabs, Card, CardContent, Typography, CardActions,CardHeader, Button, Grid, FormControl, Input,
  InputLabel, TextField, IconButton, InputAdornment, MenuItem, Snackbar, Avatar} from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import * as React from 'react';
import Header from '../../common/header/Header';
import { getAllFeeds } from '../../util/fetch';
import './Feed.css';
import AccessTime  from '@material-ui/icons/AccessTime';
import MonetizationOn  from '@material-ui/icons/LocalAtm';
import Payment  from '@material-ui/icons/Payment';
import men from '../../assets/men.png';
import transfer from '../../assets/transfer1.png';
export default function Feed() {

  //This js file is to handle all payments history -> to fetch based on type like SEND / RECIEVE  

  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [feeds, setFeeds] = React.useState([]);
  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }

  //This blocks is React.useEffect to  trigger during page loading
  React.useEffect(() => {
    getLoggedInStatus();
   
  }, [1]);

  function getLoggedInStatus() {
    if (localStorage.getItem("username") !== "" && localStorage.getItem("username") !== undefined
      && localStorage.getItem("username") !== null) {
      setIsLoggedIn(true);
      getAllFeeds("SEND").then(res => {
        let data = res.json();
        data.then(feeds => {
          console.log(feeds);
          setFeeds(feeds);
        });
      })
        .catch(error => {
          console.log("Error during get all users failed" + error);
        })
    } else {
      setIsLoggedIn(false);
      window.location.replace("/");
    }
  }

  //Below method is to get transaction data based on user action like SEND PAYMENTS or RECEIVE PAYMENTS
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue===1){
      getAllFeeds("SEND").then(res => {
        let data = res.json();
        data.then(feeds => {
          console.log(feeds);
          setFeeds(feeds);
        });
      })
        .catch(error => {
          console.log("Error during get all users failed" + error);
        })
    } else {
      getAllFeeds("RECIEVE").then(res => {
        let data = res.json();
        data.then(feeds => {
          console.log(feeds);
          setFeeds(feeds);
        });
      })
        .catch(error => {
          console.log("Error during get all users failed" + error);
        })
    }


  };

  return (
    <React.Fragment >
      <div >
      <Header loginHandler={loginHandler} />
      <TabContext value={value}>
              <Tabs  variant="fullWidth" value={value} onChange={handleChange} style={{ textAlign: 'center' }} fullWidth>
                <Tab label="SEND PAYMENTS" value={1}  />
                <Tab label="RECEIVE PAYMENTS" value={2} />
              </Tabs>

              <TabPanel value={1} index={0}>
                  
              </TabPanel>

              <TabPanel value={2} index={1}>
              </TabPanel>

      </TabContext>

      <Grid container style={{marginTop:'10px'}}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          
    {feeds.length > 0 ? (feeds.map((each, index) => (
      <>
      <Card sx={{ minWidth: 275 }} key={index} >
      <CardContent>
      <Grid container>
      <Grid item xs={5}>
        <IconButton>
        <Avatar 
          src={men}
          style={{
            margin: "10px",
            width: "60px",
            height: "60px",
          }} 
          /> 
          <Typography variant="h5" style={{color: 'orange', fontFamily:'sans-serif'}} >
          {each.from}
        </Typography>
        </IconButton>
      </Grid>
      <Grid item xs={2} style={{alignItems:'center'}}>
      <img src={transfer} style={{height:'80px', marginLeft:'30px'}}></img>
      </Grid>
      <Grid item xs={5}>
        <div  style={{float:'right'}}>
        <IconButton >
        <Avatar 
          src={men}
          style={{
            margin: "10px",
            width: "60px",
            height: "60px"
          }} 
          /> 
          <Typography variant="h5" style={{color: 'orange', fontFamily:'sans-serif'}} >
          {each.to}
        </Typography>
        </IconButton>
        
        </div>
      </Grid>
      </Grid>

      <Grid container>
      <Grid item xs={12}>
      <Typography variant="subtitle2" style={{fontFamily:'sans-serif'}} >
      {each.notes}
      </Typography>
      </Grid>
      
      </Grid>
      <br></br><br></br>
      <Grid container>
      <Grid item xs={4}> 
      <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
              }}><AccessTime />&nbsp;<span>{each.date}</span>
        </div>      
        </Grid>


        <Grid item xs={4} style={{alignItems:'center'}}> 
      <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
              }}><Payment />&nbsp;<span>{each.type}</span>
        </div>      
        </Grid>

        <Grid item xs={4}> 
      <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  float:'right'
              }}><MonetizationOn />&nbsp;<span>{each.amount}</span>
        </div>      
        </Grid>
      </Grid>
      </CardContent>
    </Card>
    <br></br>
    </>
    ))):<p style={{textAlign:'center'}}><font color={'red'}>No Record found</font></p>}
    </Grid>
        <Grid item xs={2}></Grid>
        </Grid>
        </div>
    </React.Fragment>
  );
}