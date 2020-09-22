import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image, Dimensions, ImageBackground, View } from "react-native";

import bgSrc from "../../assets/loginbg.png";

export default class Wallpaper extends Component {
  render() {
    return (
      <View style={styles.picture} source={bgSrc}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
});
