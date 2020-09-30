import React, { Component } from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import Form from "./Form";
import Wallpaper from "./Wallpaper";
import ButtonSubmit from "./ButtonSubmit";
import SignupSection from "./SignupSection";
import { AsyncStorage } from "react-native";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pw: "",
    };


  }
  componentDidMount() {
    AsyncStorage.getItem("loginUsername").then(data => {

      if (data)
        this.setState({ username: data })
    })
    AsyncStorage.getItem("loginPw").then(data => {
      if (data)
        this.setState({ pw: data })
    })
  }
  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form
          username={this.state.username}
          pw={this.state.pw}
          setUsername={(username) => this.setState({ username })}
          setPassword={(pw) => this.setState({ pw: pw })}
        />
        <SignupSection />
        <ButtonSubmit
          username={this.state.username}
          pw={this.state.pw}
          setLoggedIn={this.props.setLoggedIn}
        />
      </Wallpaper>
    );
  }
}
