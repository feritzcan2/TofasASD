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
import Tabs from "react-native-tabs";

import LoginScreen from "../Components/LoginScreen/LoginScreen";
import DuyuruComponent from "../Components/Duyurular/DuyuruComponent";
import { normalize } from "../HelperFunctions";
import PuanDurumuComponent from "../Components/Yildizkarne/PuanDurumuComponent";
import KarneDetayComponent from "../Components/Yildizkarne/KarneDetayComponent";
import ParametreComponent from "../Components/Yildizkarne/params/ParametreComponent";
import HedefGirisComponent from "../Components/Yildizkarne/HedefGirisComponent";

export default class YildizKarneContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: "puan" };
  }

  render() {
    const { selectedTab, performanceData } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Tabs
          selected={this.state.page}
          style={{
            top: "3%",
            color: "#9da4ad",
            zIndex: 50000,
            backgroundColor: "#424e60",
            height: "10%",
          }}
          selectedStyle={{
            color: "white",
            backgroundColor: "#2d3542",
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 10,
          }}
          onSelect={(el) => this.setState({ page: el.props.name })}
        >
          <Text
            name="puan"
            style={{
              fontSize: normalize(15),
              color: "#9da4ad",
            }}
            selectedIconStyle={{
              height: "100%",
              borderBottomWidth: 2,
              borderBottomColor: "orange",
              flex: 1,
            }}
          >
            PUAN
          </Text>

          <Text
            name="detay"
            style={{
              fontSize: normalize(15),
              color: "#9da4ad",
            }}
            selectedIconStyle={{
              height: "100%",
              fontSize: normalize(15),
              borderBottomWidth: 2,
              borderBottomColor: "orange",
              flex: 1,
            }}
          >
            DETAY
          </Text>
          {/* <Text
            name="parametreler"
            style={{
              fontSize: normalize(13),
              color: "#9da4ad",
            }}
            selectedIconStyle={{
              height: "100%",
              fontSize: normalize(13),
              borderBottomWidth: 2,
              borderBottomColor: "orange",
              flex: 2,
            }}
          >
            PARAMETRE
          </Text>
          <Text
            name="hedef"
            style={{
              backgroundColor: "#424e60",
              fontSize: normalize(15),
              color: "#9da4ad",
            }}
            selectedIconStyle={{
              height: "100%",
              fontSize: normalize(15),
              borderBottomWidth: 2,
              borderBottomColor: "orange",
              flex: 2,
            }}
          >
            Hedef Girişi
          </Text> */}
        </Tabs>

        <View style={{ flex: 1, marginTop: "15%" }}>
          {this.state.page === "puan" && (
            <PuanDurumuComponent data={this.props.yildizData.puanDurumu} />
          )}
          {this.state.page === "detay" && (
            <KarneDetayComponent data={this.props.yildizData.karneDetail} />
          )}
          {this.state.page === "parametreler" && (
            <ParametreComponent data={this.props.yildizData.params} />
          )}
          {this.state.page === "hedef" && (
            <HedefGirisComponent data={this.props.yildizData.hedef} />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  filterContainer: {
    zIndex: 5000,
    position: "absolute",
    bottom: "20%",
    alignSelf: "center",
    width: "40%",
    aspectRatio: 1,
  },
});
