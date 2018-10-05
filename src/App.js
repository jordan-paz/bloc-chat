import React, { Component } from 'react';
import RoomList from './components/RoomList.js'
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
  render() {
    return(
      <RoomList firebase={firebase} />
    )
  }
}

export default App;
