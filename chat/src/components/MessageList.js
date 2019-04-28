import React from 'react';
import { connect } from 'react-redux';

class MessageList extends React.Component {
    render() {
        return (
            <ul className="message-list">
            {
                this.props.messages.slice(0).reverse().map(message => {
                    var classname = "mymessage";
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