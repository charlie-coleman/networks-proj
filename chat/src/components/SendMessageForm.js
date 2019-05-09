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

    componentDidMount() {
      this.input.focus();
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.message !== '')
          sendMessage(this.state.message, this.props.user, this.props.conversation.id);
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
                    ref={ inp => this.input = inp }
                />
            </form>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    conversation: state.conversation
});

export default connect(mapState)(SendMessageForm);
