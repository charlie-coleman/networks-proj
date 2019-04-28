import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../store';

class SendMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        sendMessage(this.state.message, this.props.user, this.props.receiver);
        this.setState({
            message: ''
        });
    }
    
    render() {
        return (
            <form className="send-message-form" onSubmit={ this.handleSubmit }>
                <input
                    onChange={ this.handleChange }
                    value={ this.state.message }
                    placeholder="Type your message and hit ENTER."
                    type="text"
                />
            </form>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    receiver: state.receiver
});

export default connect(mapState)(SendMessageForm);