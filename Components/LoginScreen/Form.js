import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import UserInput from "./UserInput";
import ButtonSubmit from "./ButtonSubmit";
import SignupSection from "./SignupSection";

import usernameImg from "../../assets/username.png";
import passwordImg from "../../assets/password.png";
import eyeImg from "../../assets/eye_black.png";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          value={this.props.username}
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={"none"}
          returnKeyType={"done"}
          autoCorrect={false}
          setText={this.props.setUsername}
        />
        <UserInput
          value={this.props.pw}

          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={"done"}
          autoCapitalize={"none"}
          autoCorrect={false}
          setText={this.props.setPassword}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}
        >
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1.8,
    alignItems: "center",
  },
  btnEye: {
    position: "absolute",
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: "rgba(0,0,0,0.2)",
  },
});
