import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  Modal,
  Dimensions,
  TouchableOpacity, TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import MenuDrawer from "react-native-side-drawer";

import LoginScreen from "../Components/LoginScreen/LoginScreen";
import DuyuruComponent from "../Components/Duyurular/DuyuruComponent";
import NotificationsComponent from "../Components/NotificationsComponent";
import { getNotifications } from "../Api/Bildirim";

class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
}
export default class DuyuruContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3], notificationOpen: false,
      notifications: { read: [1, 1, 1], nonRead: [1] }
    };
    getNotifications()
  }

  toggleBildirim = () => {
    this.setState({ notificationOpen: !this.state.notificationOpen })
  }

  render() {

    return <TouchableWithoutFeedback
      disabled={!this.state.notificationOpen}
      onPress={() => {
        console.log("cloe")
        if (this.state.notificationOpen) this.toggleBildirim();
      }}
    ><View>
        <MenuDrawer
          open={this.state.notificationOpen}
          drawerContent={
            <NotificationsComponent
              notifications={this.state.notifications}

            />
          }
          drawerPercentage={100}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >

          <DuyuruComponent notifCount={this.state.notifications.nonRead.length}
            toggleBildirim={this.toggleBildirim} data={this.props.data} />
        </MenuDrawer>
      </View>
    </TouchableWithoutFeedback>

  }
}
