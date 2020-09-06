import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginContainer from "./Containers/LoginContainer";
import TabsContainer from "./Containers/TabsContainer";
import { Asset } from "expo-asset";
import { getAnalizeCode, getTypeCode, getDefinition } from "./Api/MusteriApi";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userData: null,
    };
    this.loadAssets()
  }
  loadAssets = async () => {
    return new Promise(async function (resolve, reject) {
      await Asset.loadAsync([
        //BUTTON
        require("./assets/cancel.png"),
        require("./assets/eye_black.png"),
        require("./assets/first.png"),
        require("./assets/headerbg.jpg"),
        require("./assets/headerbg.png"),
        require("./assets/icon.png"),
        require("./assets/left-arrow.png"),
        require("./assets/loading.gif"),
        require("./assets/logo.png"),
        require("./assets/notificationIcon.png"),
        require("./assets/password.png"),
        require("./assets/second.png"),
        require("./assets/splash.png"),
        require("./assets/success.png"),
        require("./assets/third.png"),
        require("./assets/username.png"),
        require("./assets/wallpaper.png"),
      ]);
      resolve();
      return;
    });
  };
  setLoggedIn = () => {
    getAnalizeCode().then(data => {
      global.analyzeCode = data
    })
    getTypeCode().then(data => {
      global.typeCode = data
    })
    getDefinition().then(data => {
      global.definition = data
    })
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
