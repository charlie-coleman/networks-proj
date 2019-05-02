import React from 'react';
import { connect } from 'react-redux';
import { logout, chooseConversation } from '../store';

class ChangeableMenu extends React.Component {
    constructor() {
        super();
        this.logoutB = this.logoutB.bind(this);
        this.returnToUsers = this.returnToUsers.bind(this);
    }

    logoutB() {
        if (this.props.user.id) {
            logout()
        }
    }

    returnToUsers() {
        if (this.props.user.id && this.props.conversation.id) {
            chooseConversation();
        }
    }

    render() {
      var Content;
      if (this.props.user.id && !this.props.conversation.id) {
        Content = () => (
          <div className='title-cont'>
              <div className="title">Networks Chat App</div>
              <a href="/" onClick={ (e) => { e.preventDefault(); this.logoutB() } }>
                  <div className="menu-link">
                      Logout
                  </div>
              </a>
          </div>
        )
      }
      else if (this.props.user.id && this.props.conversation.id) {
        Content = () => (
          <div className='title-cont'>
              <div className="title">Networks Chat App</div>
              <a href="/" onClick={ (e) => { e.preventDefault(); this.returnToUsers();} }>
                  <div className="menu-link" >
                      Conversation list
                  </div>
              </a>
              <a href="/" onClick={ (e) => { e.preventDefault(); this.logoutB() } }>
                  <div className="menu-link">
                      Logout
                  </div>
              </a>
          </div>
        )
      }
      else {
        Content = () => (
          <div className='title-cont'>
              <div className="title">Networks Chat App</div>
          </div>
        )
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

export default connect(mapState)(ChangeableMenu);
