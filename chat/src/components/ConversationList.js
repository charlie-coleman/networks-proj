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
      <View style={styles.convoList}>
        {
          this.props.conversations.map(c => (
            <View style={styles.conversation} key={c.id}>
              <View style={ styles.conversationInfo }>
                <Text style={ styles.conversationTitle }>{ c.name }</Text>
                <Text style={ styles.conversationMembers}>{ c.users.map(u => u.name).join(', ') }</Text>
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
        <TouchableWithoutFeedback style={styles.buttonStyle}
          onPress={ this.props.open }
          color="powderblue"
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
    display: "flex",
    width: "100%",
    flexDirection: "column",
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  conversation: {
    display: "flex",
    width: "80%",
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    padding: 5
  },
  conversationTitle: {
    fontSize: '16pt',
  },
  conversationMembers: {
    fontSize: '11pt',
    color: 'gray'
  },
  buttonStyle: {
    backgroundColor: 'powderblue',
    padding: 10,
    borderRadius: 10
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
