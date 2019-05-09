import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { openConvo } from '../store';

class ConversationList extends React.Component {
  constructor() {
    super();

    this.openConversation = this.openConversation.bind(this);
  }

  openConversation(id) {
    openConvo(id);
  }

  render() {
    return (
      <View style={ styles.convoList }>
        <View style={ styles.conversations }>
          {
            this.props.conversations.map(c => (
              <View style={styles.conversation} key={c.id}>
                <View style={ styles.conversationInfo }>
                  <Text style={ styles.conversationTitle }>{ c.name }</Text>
                  <Text style={ styles.conversationMembers }>{ c.users.map(u => u.name).join(', ') }</Text>
                </View>
                <TouchableWithoutFeedback
                  style={ styles.buttonStyle }
                  onPress={ () => this.openConversation(c.id) }
                >
                  <View style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Open</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ))
          }
        </View>
        <TouchableWithoutFeedback
          style={styles.buttonStyle}
          onPress={ this.props.open }
        >
          <View style={styles.buttonStyle}>
            <Text style={styles.buttonText}>New Conversation</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  convoList: {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    alignItems: 'center',
    width: '100vw',
    flexGrow: 1
  },
  conversations: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
  },
  conversation: {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: "80%",
    padding: 5
  },
  conversationInfo: {
    flexGrow: 1
  },
  conversationTitle: {
    fontSize: '16pt'
  },
  conversationMembers: {
    fontSize: '11pt',
    color: 'gray'
  },
  buttonStyle: {
    backgroundColor: 'powderblue',
    flexGrow: 0,
    padding: 10,
    borderRadius: 10,
    margin: 15
  },
  buttonText: {
    fontSize: '16pt',
  }
})

const mapState = (state) => ({
  user: state.user,
  users: state.users,
  conversations: state.conversations
});

export default connect(mapState)(ConversationList);
