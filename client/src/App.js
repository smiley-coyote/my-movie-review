import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
import Survey from "./pages/Survey";
import Navbar from "./components/Navbar";
// import Wrapper from "./components/Wrapper";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import './App.css';
import axios from 'axios';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
// import Home from "./components/Home";
import API from "./utils/API"
import NoMatch from "./pages/NoMatch"; 
import UserPage from "./pages/UserPage";


class App extends Component {
  state = {
    username: "",
    password: "",
    name: "", 
    auth: {
      userId:"",
      username:"",
      name: "",
      isAuthenticated:false
    },
    survey: false
  };

  componentDidMount(){
  
  }

  componentWillMount(){
    axios.get("/auth/isAuthenticated").then((result)=>{
      const {userId, isAuthenticated,username, image} = result.data
      this.setState({
        auth:{
          userId,
          isAuthenticated,
          username,
          image
        }
      });
    });
  }

  handleChange = (event) => {
    const {name, value} = event.target;    
        // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    //call a sign In function
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      image: "profile-placeholder.png"
    };
    this.setState({
      username: "",
      password: "",
      name: ""
    }); 
    const {name} = event.target;
    axios.post(name, newUser).then((data) => {
      if (data.data.isAuthenticated){
        const {userId, isAuthenticated, username, image, name} = data.data;
        this.setState({
          auth:{
            userId,
            isAuthenticated,
            username,
            image,
            name
          }
        });
      }
    });
  }

  handleLogout = (event) => {
    event.preventDefault();
    axios.get("/auth/logout").then((result)=>{
      this.setState({
        auth:{
          userId: "",
          username: "",
          isAuthenticated: false
        }
      });
    })
  };

  render() {
    const loggedIn = this.state.auth.isAuthenticated;
    return (
      <Router>
        <div>
        <Navbar handleLogout = {this.handleLogout} />
        <Switch>
        <Route exact path = "/" render = {()=> {
          if(loggedIn){
            return <Redirect to = "/home" />
          } else{
            return <SignIn 
              handleChange= {this.handleChange} 
              handleSubmit = {this.handleSubmit}
              email = {this.state.email}
              password = {this.state.password}
            />
          } 
        }}/>
        <Route exact path = "/signup" render = {()=> {
          if(loggedIn){
            return <Redirect to = "/survey" />
          } else{
            return <SignUp 
              handleChange= {this.handleChange} 
              handleSubmit = {this.handleSubmit}
              email = {this.state.email}
              password = {this.state.password}
            />
          }  
        }}/>
         <Route exact path = "/home" render = {()=> {
          if(!loggedIn){
            return <Redirect to = "/" />
          } else {
            return <Home auth = { this.state.auth }/>
          } 
        }
        }/>
         <Route exact path = "/survey" render = {()=> {
          if(!loggedIn){
            return <Redirect to = "/" />
          } else {
            return <Survey auth = { this.state.auth }/>
          } 
        }
        }/>
   
         <Route exact path = "/movie/:movieid?" render = {()=> {
          if(!loggedIn){
            return <Redirect to = "/" />
          } else {
            return <Movie auth = { this.state.auth }/>
          } 
        }
        }/>
         <Route path = "/profile" render = {()=> {
          if(!loggedIn){
            return <Redirect to = "/" />
          } else {
            return <Profile auth = { this.state.auth }/>
          } 
        }
        }/>
         <Route path = "/user/:id" render = {()=> {
        if(!loggedIn){
          return <Redirect to = "/" />
        } else {
          return <UserPage auth = { this.state.auth }/>
        } 
        }
        }/>
        {/* <Route exact path="/survey" component={Survey} /> */}
        <Route component={NoMatch} />
        </Switch>
        </div>
      </Router>
    )
  }

  
};

export default App;

{/* <Router>
    <div>
     <Navbar />
    <Wrapper>
     
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/survey" component={Survey} />
        
        <Route path="/movie/:info?" component={Movie} />
        <Route path="/:id" component={Profile} />
        
       
      </Switch>
      <Switch>
      
      </Switch>
    </Wrapper>
    </div>
  </Router> */}
