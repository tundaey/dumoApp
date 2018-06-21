import React from 'react';
import { StyleSheet, Platform, Image, View, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, SocialIcon, Text, FormValidationMessage } from 'react-native-elements'
import { connect } from 'react-redux'
import { login } from '../reducer/auth/actions'
import { signInWithEmail, checkProfileCompletion } from '../helpers/api'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        loading: false
    }
  
    componentDidMount() {
      // firebase things?
      console.log('user did mount', this.props.user)
    }

    onInputChange = (e, field) => {
        this.setState({
            [field]: e
        })
    }

    onLogin = ()=> {
        const { email, password } = this.state;
        const emailError = this.state.email === '' ? true : false
        const passwordError = this.state.password === '' ? true : false

        this.setState({
            emailError: emailError,
            passwordError: passwordError
        })
        
        if(!emailError && !passwordError) {
            this.setState({loading: true})
            this.props.login(email, password).then((response)=> {
                console.log('my response', response)
                if(response.success) {
                    // authSuccess(user);
                    this.props.navigation.navigate( response.user.profileComplete ? 'App' : 'Update') 
                }else{
                    this.setState({error: response.error, loading: false})
                }
                
            })
        }
        
    }

    goToRegister = ()=> this.props.navigation.navigate('Register')
  
    render() {
      return (
          <View style={styles.modules}>
            <Text style={styles.modulesHeader}>Sign In</Text>
            <FormLabel>Email</FormLabel>
            <FormInput 
                keyboardType="email-address" 
                onChangeText={(e)=> this.onInputChange(e, 'email')}/>
            {this.state.emailError ? (
                <FormValidationMessage>{'Please enter an email address'}</FormValidationMessage>
            ): null}
            <FormLabel>Password</FormLabel>
            <FormInput
                secureTextEntry={true} 
                onChangeText={(e)=> this.onInputChange(e, 'password')}/>
             {this.state.passwordError ? (
                <FormValidationMessage>{'Please enter a password'}</FormValidationMessage>
            ): null}
            <Button
                style={{marginTop: 10}}
                raised
                borderRadius={20}
                loading={this.props.authPending}
                onPress={this.onLogin}
                onLongPress={this.onLogin}
                backgroundColor={'#FF6347'}
                title='Login' />
            <SocialIcon
                title='Sign In With Facebook'
                button
                type='facebook'
            />
            <FormValidationMessage
                containerStyle={{marginLeft: 'auto', marginRight: 'auto'}}
            >
            {this.props.loginErrorMessage}
            </FormValidationMessage>
            <Text 
                onLongPress={this.goToRegister}
                onPress={this.goToRegister}
                style={styles.registrationLink} h5>Don't have an account? Register</Text>
            {/* <SocialIcon
                title='Sign In With Google'
                button
                type='google-plus-official'
            /> */}
          </View>
      );
    }
  }

  const mapStateToProps = ({ auth })=> {
      console.log('login auth', auth)
      return {
          user: auth.user,
          authPending: auth.authPending,
          loginError: auth.loginError,
          loginErrorMessage: auth.loginErrorMessage,
      }
  }

  export default connect(mapStateToProps, { login })(Login)
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    logo: {
      height: 80,
      marginBottom: 16,
      marginTop: 32,
      width: 80,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    modules: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    modulesHeader: {
      fontSize: 16,
      marginBottom: 8,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    module: {
      fontSize: 14,
      marginTop: 4,
      textAlign: 'center',
    },
    registrationLink: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });