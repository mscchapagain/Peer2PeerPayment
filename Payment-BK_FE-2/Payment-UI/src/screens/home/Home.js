import { Tab, Tabs } from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import * as React from 'react';
import Header from '../../common/header/Header';
import { Link } from "react-router-dom";
import './Home.css';
import { AccessAlarm } from '@material-ui/icons';
import AccessTime  from '@material-ui/icons/AccessTime';
import cashPay from '../../assets/cash_payment.jpg';
import payment from '../../assets/payment.png';
import CreditCard  from '@material-ui/icons/Payment';
import AccountBalanceWallet  from '@material-ui/icons/AccountBalanceWallet';

export default function Home() {

  //This js is home page, contains static data

  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Header loginHandler={loginHandler} />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Payment App - Money transfer to anyone.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                We can pay any of the registered user and accept credit cards, debit cards, cash. Also we can see all registered users feed
              </p>
              <div className="mt-12">
                
                {/* <Link to="/feed" className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Check the feeds
                  </Link> */}
                
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          //src={require("../../assets/img/pattern_react.png").default}
          src={payment}
          alt="..."
        />
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="..."
                  src={cashPay}
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-lightBlue-500 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Payment modes
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    We can transfer money to anybody who already registered here. Just few clicks, payment done. 
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <AccountBalanceWallet/>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Pay via Cash
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        We accept cash, just use cash option to send money.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <CreditCard/>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                      Pay via Credit cards
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                      We accept credit cards, just use cash option to send money.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <CreditCard/>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                      Pay via Debit cards
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                      We accept debit cards, just use cash option to send money.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </section>

    </React.Fragment>
  );
}