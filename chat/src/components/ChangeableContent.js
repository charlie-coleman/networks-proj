import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Users from './Users';
import Chat from './Chat';

class ChangeableContent extends React.Component {
    render() {
        let Content = Login;
        if (this.props.user.id && !this.props.receiver.id) {
            Content = Users;
        } else if (this.props.user.id && this.props.receiver.id) {
            Content = Chat;
        }
        return (
            <Content />
        );
    }
}

const mapState = (state) => ({
    user: state.user,
    receiver: state.receiver
});

export default connect(mapState)(ChangeableContent);