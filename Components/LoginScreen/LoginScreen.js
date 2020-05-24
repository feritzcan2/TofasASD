import React, { Component } from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import Form from "./Form";
import Wallpaper from "./Wallpaper";
import ButtonSubmit from "./ButtonSubmit";
import SignupSection from "./SignupSection";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pw: "",
    };
  }
  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form
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
