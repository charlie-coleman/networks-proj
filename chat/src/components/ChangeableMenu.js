import React from 'react';
import { connect } from 'react-redux';
import { logout, chooseChat } from '../store';

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
        if (this.props.user.id && this.props.receiver.id) {
            chooseChat();
        }
    }
    
    render() {
        return (
            <div className='title-cont'>
                <div className="title">Networks Chat App</div>
                <a href="/" onClick={ (e) => { e.preventDefault(); this.returnToUsers();} }>
                    <div className="menu-link" >
                        User list
                    </div>
                </a>
                <a href="/" onClick={ (e) => { e.preventDefault(); this.logoutB() } }>
                    <div className="menu-link">
                        Logout
                    </div>
                </a>
            </div> 
        );
    }
}

const mapState = (state) => ({
    user: state.user,
    receiver: state.receiver
});

export default connect(mapState)(ChangeableMenu);