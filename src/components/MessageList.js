import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props){
    super(props)
    this.state={
      messageList: [],
      activeRoomMessages: [],
      newMessageContent: '',
    }
    this.messageRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {

    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messageList: this.state.messageList.concat( message )
        })
      })

     }

  createNewMessage(e) {
    this.messageRef.push({
      content: this.state.newMessageContent,
      roomId: this.props.activeRoom.key,
      username: this.props.user ? this.props.user.displayName : '',
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    })
    this.setState( {newMessageContent: ''} )
  }

  filterActiveRoomMessages() {
      let messages = this.state.messageList.filter(
       message => message.roomId === this.props.activeRoom.key
      )
      return messages
   }

  setNewMessageContent(e) {
    e.preventDefault();
    this.setState({newMessageContent: e.target.value})
  }

  render() {
    return (
      <div className="message-list-component section">
        <section className="messagelist">
          <h1>{this.props.activeRoom.name}</h1>
          <ul className="striped-list">
            {this.filterActiveRoomMessages().map((message, index) =>
              <li className="message" key={index} >
                <h1>{message.username}</h1>
                <p>{message.content}</p>
                <h6>sent at: {message.sentAt}</h6>
              </li>
            )}
            <li>
              <form onSubmit={ (e) => {
                e.preventDefault();
                this.createNewMessage(this.state.newMessageContent) } }>
                <label>Write a Message</label>
                <input type="text" value={this.state.newMessageContent} onChange={ (e) => this.setNewMessageContent(e)}/>
                <input type="submit"/>
              </form>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}


export default MessageList;
