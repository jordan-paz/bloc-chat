import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms : []
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

        {Rooms}
      </div>
    )
  }
}

export default RoomList;
