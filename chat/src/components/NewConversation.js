import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { createConvo } from '../store';

class NewConversation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      users: [this.props.user],
      errorText: ' '
    }
    this.createConversation = this.createConversation.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  onNameChange(name) {
    this.setState({ name });
  }

  createConversation() {
    if (this.state.name !== '' && this.state.users.length > 1) {
      this.setState({
        errorText: ' '
      });
      createConvo(this.state.name, this.state.users.map(u => u.id));
      this.props.close();
    }
    else {
      this.setState({
        errorText: 'You need a name and at least one member for your groupchat!'
      });
    }
  }

  addUser(u) {
    this.setState({
      users: [...this.state.users, u]
    });
  }

  removeUser(u) {
    this.setState({
      users: this.state.users.filter(user => user.id !== u.id)
    });
  }

  render() {
    return (
      <View style={ styles.newChatHolder }>
        <View style={ styles.inputDiv }>
          <View style={ styles.name }>
            <Text style={ styles.inputLabel }>Name of GroupChat: </Text>
            <TextInput
              onChangeText={ name => this.onNameChange(name) }
              style={ styles.nameInput }
              onKeyPress={ (e) => {
                if (e.key === 'Enter') this.createConversation();
              } }
            />
          </View>
          <TouchableWithoutFeedback
            onPress={ this.props.close }
          >
            <View style={ styles.closeButton }>
              <Text style={ styles.closeText }>&times;</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={ styles.userListHolder }>
          <View style={ styles.userList }>
            <Text style={ styles.listTitle }>In Groupchat</Text>
            {
              this.state.users.filter(u => u.id !== this.props.user.id).map(u => (
                <View key={u.id} style={ styles.user }>
                  <Text style={ styles.userName }>{u.name}</Text>
                  <TouchableWithoutFeedback
                    onPress={() => this.removeUser(u)}
                  >
                    <View style={ styles.buttonStyle }>
                      <Text style={ styles.buttonText }> - </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))
            }
          </View>
          <View style={ styles.userList }>
            <Text style={ styles.listTitle }>Not in Groupchat</Text>
            {
              this.props.users
                .filter(u => u.id !== this.props.user.id)
                .filter(u => this.state.users.indexOf(u) === -1)
                .map(u => (
                <View key={u.id} style={ styles.user }>
                  <Text style={ styles.userName }>{u.name}</Text>
                  <TouchableWithoutFeedback
                    onPress={ () => this.addUser(u) }
                  >
                    <View style={ styles.buttonStyle }>
                      <Text style={ styles.buttonText }> + </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))
            }
          </View>
        </View>
        <Text style={ styles.errorText }>{ this.state.errorText }</Text>
        <View style={ styles.submission }>
          <TouchableWithoutFeedback
            onPress={ this.createConversation }
          >
            <View style={ styles.doneButton }>
              <Text style={ styles.doneText }>Done!</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  newChatHolder: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 25
  },
  errorText: {
    color: 'red',
    fontSize: '15pt'
  },
  inputDiv: {
    display: 'flex',
    width: '50%',
    flexDirection: 'row',
    marginBottom: 25
  },
  inputLabel: {
    fontSize: '18pt'
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  nameInput: {
      borderWidth: 0.5,
      borderColor: 'black',
      color: '#000',
      padding: 5,
      fontSize: '14pt'
  },
  userListHolder: {
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
  },
  listTitle: {
    fontSize: '18pt'
  },
  userList: {
    paddingBottom: 15
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  userName: {
    fontSize: '14pt'
  },
  buttonStyle: {
    borderRadius: 2,
    width: 25,
    height: 25,
    backgroundColor: 'powderblue',
  },
  buttonText: {
    fontSize: '14pt',
    textAlign: 'center'
  },
  doneButton: {
    backgroundColor: 'powderblue',
    padding: 10,
    borderRadius: 10
  },
  doneText: {
    fontSize: '16pt'
  },
  closeButton: {
    backgroundColor: 'crimson',
    borderRadius: 2,
    width: 25,
    height: 25
  },
  closeText: {
    fontSize: '18pt',
    lineHeight: 25,
    textAlign: 'center'
  },
  submission: {
    display: 'flex',
    flexDirection: 'row',
  }
});

const mapState = (state) => ({
  user: state.user,
  users: state.users
});

export default connect(mapState)(NewConversation);
