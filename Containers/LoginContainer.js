import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import LoginScreen from "../Components/LoginScreen/LoginScreen";
import { getAnalizeCode } from "../Api/MusteriApi";

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userData: null,
    };

  }

  render() {
    return <LoginScreen setLoggedIn={this.props.setLoggedIn} />;
  }
}
