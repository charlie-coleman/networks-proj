import React from 'react';
import { connect } from 'react-redux';
import { getConvos, getUsers } from '../store';
import ConversationList from './ConversationList';
import NewConversation from './NewConversation';

class Conversations extends React.Component {
  constructor() {
    super();

    this.state = {
      isCreating: false
    }

    this.openNewConvo = this.openNewConvo.bind(this);
    this.closeNewConvo = this.closeNewConvo.bind(this);
  }

  componentDidMount() {
    getConvos(this.props.user.id);
    getUsers();
  }

  openNewConvo() {
    this.setState({ isCreating: true });
  }

  closeNewConvo() {
    this.setState({ isCreating: false });
  }

  render() {
    var Content = ConversationList;
    if (this.state.isCreating) {
      Content = NewConversation;
    }
    return (
      <Content close={ this.closeNewConvo } open={ this.openNewConvo }/>
    )
  }
}

const mapState = (state) => ({
  user: state.user,
  users: state.users,
  conversations: state.conversations
});

export default connect(mapState)(Conversations);
