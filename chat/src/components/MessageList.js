import React from 'react';
import { connect } from 'react-redux';

class MessageList extends React.Component {
  componentDidMount() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  componentDidUpdate() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    return (
      <ul className="message-list" ref={ messageList => this.messageList = messageList}>
      {
        this.props.messages.slice(0).reverse().map(message => {
          var classname = "message";
          if (this.props.user.id === message.user._id)
            classname = "mymessage";
          return (
            <li key={message._id} className={ classname }>
              <div>
                {message.user.name}
              </div>
              <div>
                {message.text}
              </div>
            </li>
          )
        })
      }
      </ul>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  messages: state.messages
});

export default connect(mapState)(MessageList);
