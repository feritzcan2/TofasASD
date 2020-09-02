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
      data: global.duyurular ? global.duyurular : [], notificationOpen: false,
      notifications: { read: [], nonRead: [] }
    };
    getNotifications(true).then(data => {
      console.log(data)
      console.log('data')
      let notifications = this.state.notifications
      notifications.read = data
      if (this.mounted === true)
        this.setState({ notifications })
    }).catch(e => {
      console.log("notif err: ", e)
    })
    getNotifications(false).then(data => {
      console.log(data)
      console.log('data')
      let notifications = this.state.notifications
      notifications.nonRead = data
      if (this.mounted === true)
        this.setState({ notifications })
    }).catch(e => {
      console.log("notif err: ", e)
    })
  }

  componentDidMount = () => {
    this.mounted = true

  }
  componentWillUnmount = () => {
    this.mounted = false
  }

  render() {

    return <View>
      <MenuDrawer
        open={this.props.menuOpen}
        drawerContent={
          <NotificationsComponent
            notifications={this.state.notifications}
            toggleBildirim={this.props.toggleMenu}
          />
        }
        drawerPercentage={100}
        animationTime={250}
        overlay={true}
        opacity={0.4}
      >
        <TouchableWithoutFeedback
          disabled={!this.state.notificationOpen}
          onPress={() => {
            this.props.toggleMenu();
          }}
        >
          <DuyuruComponent notifCount={this.state.notifications.nonRead.length}
            toggleBildirim={this.props.toggleMenu} data={this.props.data} />
        </TouchableWithoutFeedback>
      </MenuDrawer>
    </View>
  }
}
