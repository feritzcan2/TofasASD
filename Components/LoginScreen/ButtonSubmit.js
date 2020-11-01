import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Dimensions,
  Image,
  Alert,
  View,
  AsyncStorage,
} from "react-native";
import { Actions, ActionConst } from "react-native-router-flux";

import spinner from "../../assets/loading.gif";
import { login, getCustomerList } from "../../Api/Login";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  componentDidMount() {
    // this._onPress()
  }

  _onPress() {

    // login("test2", "2").then((status) => {

    // login("TEST", "E2018RYZ").then((status) => {
    //   
    //   this._onGrow();
    //   this.setState({ isLoading: false });
    //   this.buttonAnimated.setValue(0);
    //   this.growAnimated.setValue(0);
    //   if (status === true) { 
    //     this.props.setLoggedIn();
    //   } else {
    //     alert("Giriş bilgileri yanlış!");
    //   }
    // });
    // return

    // "test2", "2"
    //    login(this.props.username, this.props.pw).then((status) => {

    login(this.props.username, this.props.pw).then((status) => {
      this._onGrow();
      this.setState({ isLoading: false });
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
      if (status === true) {
        AsyncStorage.setItem("loginUsername", this.props.username)
        AsyncStorage.setItem("loginPw", this.props.pw)
        this.props.setLoggedIn();
      } else {
        alert("Giriş bilgileri yanlış!");
      }
    });



    // setTimeout(() => {
    //   this._onGrow();
    // }, 2000);

    // setTimeout(() => {
    //   Actions.secondScreen();
    //   this.setState({ isLoading: false });
    //   this.buttonAnimated.setValue(0);
    //   this.growAnimated.setValue(0);
    // }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
                <Text style={styles.text}>LOGIN</Text>
              )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, { transform: [{ scale: changeScale }] }]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#304baa",
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: "#F035E0",
    borderRadius: 100,
    alignSelf: "center",
    zIndex: 99,
    backgroundColor: "#F035E0",
  },
  text: {
    color: "white",
    backgroundColor: "transparent",
  },
  image: {
    width: 24,
    height: 24,
  },
});
