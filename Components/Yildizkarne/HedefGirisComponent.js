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
import PuanDurumuComponent from "./PuanDurumuComponent";
import { normalize } from "../../HelperFunctions";
import TypmDetayComponent from "./TypmDetayComponent";
import AsdDetayComponent from "./AsdDetayComponent";
import HedefDetailComponent from "./HedefDetailComponent";

export default class HedefGirisComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: "bayi" };
  }

  render() {
    const { selectedTab, performanceData } = this.state;
    return (
      <View style={{ flex: 1, borderTopColor: "orange", borderTopWidth: 1 }}>
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
            borderRadius: 10,
          }}
          onSelect={(el) => this.setState({ page: el.props.name })}
        >
          <Text
            name="bayi"
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
            Bayi Hedefleri
          </Text>
          <Text
            name="danisman"
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
            Danışman Hedef
          </Text>
        </Tabs>

        <View style={{ flex: 1, marginTop: "15%" }}>
          {this.state.page === "danisman" && (
            <HedefDetailComponent
              type="danisman"
              hedefler={this.props.data.danismanHedef}
            />
          )}
          {this.state.page === "bayi" && (
            <HedefDetailComponent
              type="bayi"
              hedefler={this.props.data.bayiHedef}
            />
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
