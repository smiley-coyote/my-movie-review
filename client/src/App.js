import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Survey from "./pages/Survey";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper"

const App = () => (
  <Router>
    <Wrapper>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/survey" component={Survey} />
        <Route exact path="/login" component={Login} />
      </Switch>
      </Wrapper>
  </Router>
);

export default App;
