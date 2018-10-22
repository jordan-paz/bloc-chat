import React, { Component } from 'react';
import RoomList from './components/RoomList.js'
import MessageList from './components/MessageList.js'
import User from './components/User.js'
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDN6EJnugSTQZZqZMQMtpx0d693k5IAnMU",
    authDomain: "bloc-chat-3ac18.firebaseapp.com",
    databaseURL: "https://bloc-chat-3ac18.firebaseio.com",
    projectId: "bloc-chat-3ac18",
    storageBucket: "bloc-chat-3ac18.appspot.com",
    messagingSenderId: "16883782007"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeRoom: '',
      user: null
    }
    this.setActiveRoom = this.setActiveRoom.bind(this)
  }

  setUser(user) {
    this.setState({ user: user})
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room })
  }

  render() {
    return(
      <div className="app-component">
        <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user} />
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} />
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}/>
      </div>
    )
  }
}

export default App;
