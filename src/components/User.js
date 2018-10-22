import React, { Component } from 'react';

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      console.log(user);
    });
  }

  handleSignin() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider )
  }

  handleSignOut() {
    this.props.firebase.auth().signOut().then(() => {this.props.setUser(null)});
  }

  render() {
    return(
      <div>
        { this.props.user ? (
          <div>
            <p>{this.props.user.displayName}</p>
            <button onClick={() => this.handleSignOut()}>Sign Out</button>
          </div>
         ):(
          <div>
            <button onClick={() => this.handleSignin()}>Sign In</button>
            <button onClick={() => this.handleSignOut()}>Sign Out</button>
          </div>
         )
        }
      </div>
    )
  }
}

export default User;
