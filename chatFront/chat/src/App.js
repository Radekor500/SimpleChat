import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Login from './components/Login/login';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import Sidebar from './components/Sidebar/sidebar';
import Rooms from './components/Rooms/rooms';
import React, { Component } from 'react';


class App extends Component {
  constructor(){
    super();
    this.state = {
      room: '',
      user: '',
      isSignedIn: false

    }
  }

  
  onRoomChange = (event) => {
    this.setState({room: event.target.value});

    console.log(this.state)
  }
  
  onUserChange = (event) => {
    this.setState({user: event.target.value});

    console.log(this.state)
  }

  loadUser = () => {
    this.setState({isSignedIn: true})
    console.log("logged state: ",this.state)
  }
  
  render(){
    return (
      <Router>
       <div>
       <Switch>
        
        <Route exact path='/login'><Login loadUser={this.loadUser} onUserChange={this.onUserChange}></Login></Route>
        <ProtectedRoute exact path='/rooms' component={Rooms} onRoomChange={this.onRoomChange} loginCheck={this.state.isSignedIn}></ProtectedRoute>
        <ProtectedRoute exact path='/' loginCheck={this.state.isSignedIn} component={Sidebar} roomName={this.state.room} userData={this.state.user} ></ProtectedRoute>
        {/* <Sidebar></Sidebar> */}
        {/* <Chat></Chat> */}
        
        {/* <Status></Status> */}
        </Switch>
      </div> 
      </Router>
      
    )
  }

  }
  

export default App;
