import React from 'react';
import { connect } from 'react-redux';
import { openChat, sendMessage } from '../store';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import './style.css';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        
        this.send = this.send.bind(this);
    }
    
    componentDidMount() {
        openChat({ user: this.props.user, receiver: this.props.receiver });
    }
    
    send(message) {
        sendMessage(message.text, this.props.user, this.props.receiver);
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
    receiver: state.receiver
});

export default connect(mapState)(Chat);