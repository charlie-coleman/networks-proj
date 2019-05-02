import React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { login, register } from '../store';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange(type, value) {
        this.setState({ [type]: value });
    }

    handleLogin() {
      login(this.state);
    }

    handleRegister() {
      register(this.state);
    }

    render() {
      return (
          <View style={ styles.container }>
              <Text style={ styles.text }>Enter your name and password:</Text>
              <TextInput
                  onChangeText={ value => this.handleChange('name', value) }
                  returnKeyType='next'
                  autoCorrect={false}
                  onSubmitEditing={ () => this.passwordInput.focus() }
                  style={ styles.input }
              />
              <TextInput
                  onChangeText={ value => this.handleChange('password', value) }
                  secureTextEntry
                  returnKeyType='go'
                  autoCapitalize='none'
                  style={ styles.input }
                  ref={ input => this.passwordInput = input}
              />
              <View style={ styles.buttonHolder }>
                <TouchableWithoutFeedback
                  onPress={ this.handleLogin }
                >
                  <View style={ styles.buttonStyle }>
                    <Text style={ styles.buttonText }>Login</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={ this.handleRegister }
                >
                  <View style={ styles.buttonStyle }>
                    <Text style={ styles.buttonText }>Create Account</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
          </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        width: '90%',
        borderWidth: 0.5,
        borderColor: 'black',
        color: '#000',
        textAlign: 'center',
        marginTop: 10
    },
    button: {
        width: '75%',
        backgroundColor: 'blue',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingVertical: 15
    },
    buttonHolder: {
      display: 'flex',
      flexDirection: 'row'
    },
    buttonStyle: {
      backgroundColor: 'powderblue',
      padding: 10,
      borderRadius: 10,
      margin: 5,
      minWidth: '20%'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    }
});
