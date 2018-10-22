import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms : [],
      newRoomName : '',

    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }



  createNewRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
    });
    this.setState({newRoomName: ''})
  }

  setNewRoomName(e) {
    this.setState({ newRoomName: e.target.value })
  }

  render() {
    return (
      <div className="room-list-component section">
        <section className="room-list">
          <h1 className="app-title" >Bloc Chat</h1>
          <ul>
            {this.state.rooms.map( (room, index) =>
              <li className="room-list-item" key={index}>
                <p onClick={ () => this.props.setActiveRoom(room)}>
                  {room.name}
                </p>
              </li>
            )}
          </ul>
        </section>
        <section className="newroom">
          <h1>Create a Room</h1>
          <form onSubmit={ (e) => {
            e.preventDefault();
            this.createNewRoom(this.state.newRoomName) } }>

            <input type="text" value={this.state.newRoomName} onChange={ (e) => this.setNewRoomName(e)}/>
            <input type="submit"/>
          </form>
        </section>
      </div>
    )
  }
}

export default RoomList;
