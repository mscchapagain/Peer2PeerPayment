import React from "react";
import Home from "../screens/home/Home";
import Feed from "../screens/feed/Feed";
import SendMoney from "../screens/SendMoney/sendMoney";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path={["/home", "/"]} 
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
        <Route
          exact
          path={["/feed"]} 
          render={(props) => <Feed {...props} baseUrl={baseUrl} />}
        />
        <Route
          exact
          path="/sendMoney"
          render={(props) => <SendMoney {...props} baseUrl={baseUrl} />}
        />

      </div>
    </Router>
  );
};

export default Controller;
