import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";

import { normalize } from "../../../HelperFunctions";
var screenHeight = Dimensions.get("screen").height;
var screenWidth = Dimensions.get("screen").width;

import LoginScreen from "../../LoginScreen/LoginScreen";

export default class GeneralPerformanceTableComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRow = (rowData, index, isHeader) => {
    return (
      <View
        key={"r " + index}
        style={[
          {
            flex: 1,
            borderBottomColor: "white",
            borderBottomWidth: 2,
            height: screenHeight * 0.08,
            flexDirection: "row",
          },
          isHeader ? { backgroundColor: "#f6f6f6" } : {},
        ]}
      >
        <View
          style={{
            height: "100%",
            flex: 1.5,
            borderColor: "#dbe0e2",
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.rowText,
              isHeader ? { fontWeight: "800", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader ? rowData.DealerName : rowData.name}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            flex: 1,
            borderColor: "#dbe0e2",
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.rowText,
              isHeader ? { fontWeight: "800", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader ? "HEDEF" : rowData.target + " ₺"}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            flex: 1,
            borderColor: "#dbe0e2",
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.rowText,
              isHeader ? { fontWeight: "800", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader ? "TÜM SATIŞ" : rowData.tumSatis + " ₺"}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            flex: 1,
            borderColor: "#dbe0e2",
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.rowText,
              isHeader ? { fontWeight: "800", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader
              ? "HEDEFE TABİ SATIŞ"
              : this.props.hedefTuru === 0
                ? rowData.hepsi
                : this.props.hedefTuru === 1
                  ? rowData.perakende
                  : this.props.hedefTuru === 2
                    ? rowData.sigorta
                    : this.props.hedefTuru === 3
                      ? rowData.yetkili
                      : "s" + " ₺"}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            flex: 1,
            borderColor: "#dbe0e2",
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.rowText,
              isHeader ? { fontWeight: "800", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader ? "PRİME TABİ SATIŞ" : rowData.primeTabiSatis + " ₺"}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            flex: 1,
            borderColor: "#dbe0e2",
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.rowText,
              isHeader ? { fontWeight: "800", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader
              ? "HEDEF GERÇEKLEŞME"
              : rowData.hedefGerceklestirme.toFixed(2) + " %"}
          </Text>
        </View>
      </View>
    );
  };
  renderPerformanceTable = (data, index) => {
    return (
      <View key={"d" + index} style={{ marginTop: screenHeight * 0.04 }}>
        {this.renderRow(data[0], null, true)}
        {data.map((rowData, index) => {
          return this.renderRow(rowData, index);
        })}
      </View>
    );
  };
  renderArea = (data, index) => {
    return (
      <View key={"a:" + index} style={styles.areaContainer}>
        <View style={styles.bolgeTextContainer}>
          <Text style={styles.bolgeText}>
            {data[0][0]["Region"] + ".BÖLGE"}
          </Text>
        </View>

        <View>
          {data.map((data, index) => {
            return this.renderPerformanceTable(data, index);
          })}
        </View>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.performanceData &&
          this.props.performanceData.map((data, index) => {
            return this.renderArea(data, index);
          })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  areaContainer: {
    flex: 1,
    marginTop: screenHeight * 0.05,
  },
  areaScrollContainer: {
    backgroundColor: "white",
    marginTop: screenHeight * 0.03,
    marginLeft: screenWidth * 0.03,
    marginRight: screenWidth * 0.03,
    marginBottom: screenHeight * 0.03,
  },
  areaHeaderContainer: {
    height: screenHeight * 0.1,
    backgroundColor: "white",
  },
  rowText: {
    fontSize: normalize(8),
    color: "#657077",
  },
  bolgeText: {
    color: "white",
    fontSize: normalize(25),
    marginLeft: "10%",
  },
  bolgeTextContainer: {
    height: screenHeight * 0.07,
    width: screenWidth,
    backgroundColor: "#473e54",
    justifyContent: "center",
  },
});
