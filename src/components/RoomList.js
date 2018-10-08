import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms : [],
      newRoomName : ''
    };
    this.roomsRef = this.props.firebase.database().ref('Rooms');
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
      this.setState({newRoomName: ''});
    }

    setNewRoomName(e) {
    this.setState({ newRoomName: e.target.value });
  }


  render() {

    const Rooms = this.state.rooms.map( (room) => {
      return (
        <li key={room.key}>
          {room.name}
        </li>
      )
    })

    return (
      <div>
        <div>
          <h1>Chat Rooms</h1>
          {Rooms}
        </div>
        <section>
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
