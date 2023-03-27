import { StatusBar } from 'expo-status-bar';
import React from "react";

import { Alert, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, Pressable, View, Button } from "react-native";

import styles from "../styles/styles";

export default function Login() {

    return(
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Instamobile</Text>
              <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
              <Button buttonStyle={styles.loginButton} onPress={() => onLoginPress()} title="Login" />
              <Button containerStyle={styles.fbLoginButton} type='clear' onPress={() => onFbLoginPress()} title="Login With Facebook" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>        
    );

}