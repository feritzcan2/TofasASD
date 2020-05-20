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
import DuyuruComponent from "../Components/Duyurular/DuyuruComponent";

export default class DuyuruContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [1, 2, 3] };
  }

  render() {
    return <DuyuruComponent data={this.props.data} />;
  }
}
