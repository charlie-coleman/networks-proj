import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../store';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import './style.css';


class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.send = this.send.bind(this);
    }

    send(message) {
      console.log(this.props.conversation.id);
        sendMessage(message.text, this.props.user, this.props.conversation.id);
    }

    render() {
        return (
            <div className="app">
                <MessageList />
                <SendMessageForm />
            </div>
        );
    }
}

const mapState = (state) => ({
    messages: state.messages,
    user: state.user,
    conversation: state.conversation
});

export default connect(mapState)(Chat);
