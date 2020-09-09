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
import SwipeGesture from "../Components/swipe-gesture"

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

      let notifications = this.state.notifications
      notifications.read = data
      if (this.mounted === true)
        this.setState({ notifications })
    }).catch(e => {
      console.log("notif err: ", e)
    })
    getNotifications(false).then(data => {

      let notifications = this.state.notifications
      notifications.nonRead = data
      notifications.read = data
      if (this.mounted === true)
        this.setState({ notifications })
    }).catch(e => {
      console.log("notif err: ", e)
    })
  }
  onSwipePerformed = (action) => {
    /// action : 'left' for left swipe
    /// action : 'right' for right swipe
    /// action : 'up' for up swipe
    /// action : 'down' for down swipe

    switch (action) {
      case 'left': {
        if (this.props.menuOpen === true) {
          this.props.toggleMenu();

        }
        break;
      }
      case 'right': {
        console.log('right Swipe performed');
        break;
      }
      case 'up': {
        console.log('up Swipe performed');
        break;
      }
      case 'down': {
        console.log('down Swipe performed');
        break;
      }
      default: {
        console.log('Undeteceted action');
      }
    }
  }
  componentDidMount = () => {
    this.mounted = true

  }
  componentWillUnmount = () => {
    this.mounted = false
  }

  render() {

    return <View style={{ marginTop: 10 }}>
      <SwipeGesture gestureStyle={{
        height: '100%',
        width: '100%'
      }}
        onSwipePerformed={this.onSwipePerformed}>
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
      </SwipeGesture>

    </View>
  }
}
