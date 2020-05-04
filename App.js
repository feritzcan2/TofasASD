import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginContainer from "./Containers/LoginContainer";
import TabsContainer from "./Containers/TabsContainer";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userData: null,
    };
  }
  setLoggedIn = () => {
    this.setState({ loggedIn: true });
  };
  render() {
    if (this.state.loggedIn === true) {
      return <TabsContainer />;
    } else {
      return <LoginContainer setLoggedIn={this.setLoggedIn} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
