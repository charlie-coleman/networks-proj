import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Conversations from './Conversations';
import Chat from './Chat';

class ChangeableContent extends React.Component {
    render() {
        let Content = Login;
        if (this.props.user.id && !this.props.conversation.id) {
            Content = Conversations;
        } else if (this.props.user.id && this.props.conversation.id) {
            Content = Chat;
        }
        return (
            <Content />
        );
    }
}

const mapState = (state) => ({
    user: state.user,
    conversation: state.conversation
});

export default connect(mapState)(ChangeableContent);
