import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

import Tabs from "react-native-tabs";
import PerformanceContainer from "./PerformanceContainer";

export default class TabsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { page: "second" };
  }
  render() {
    return (
      <View style={styles.container}>
        <Tabs
          selected={this.state.page}
          style={{
            backgroundColor: "white",
            flex: 1,
            height: "10%",
          }}
          selectedStyle={{ color: "red" }}
          onSelect={(el) => this.setState({ page: el.props.name })}
        >
          <Text name="first">First</Text>
          <Text
            name="second"
            selectedIconStyle={{
              height: "100%",
              borderTopWidth: 2,
              borderTopColor: "green",

              flex: 1,
            }}
          >
            Second
          </Text>
          <Text name="third">Third</Text>
          <Text name="fourth" selectedStyle={{ color: "green" }}>
            Fourth
          </Text>
          <Text name="fifth">Fifth</Text>
        </Tabs>
        <PerformanceContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
