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

import {
  LineChart,
  BarChart,
  Grid,
  XAxis,
  YAxis,
  StackedBarChart,
} from "react-native-svg-charts";
import * as scale from "d3-scale";

import { normalize } from "../../../HelperFunctions";
var screenHeight = Dimensions.get("screen").height;
var screenWidth = Dimensions.get("screen").width;

import LoginScreen from "../../LoginScreen/LoginScreen";

export default class KampanyaPerformanceChartComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.performanceData !== nextProps.performanceData) {
      this.render();
    }
    return true;
  }

  getMaxValue = (data) => {
    let max = 100000;
    for (let a = 0; a < data.length; a++) {
      let value = parseInt(data[a].target.replace(".", ""));
      if (value > max) max = value;
    }
    let kalan = max % 100000;
    return max + (kalan > 0 ? 100000 - kalan : 0);
  };
  getMaxHedefValue = (data) => {
    let max = 1;
    debugger;

    for (let a = 0; a < data.length; a++) {
      let value = data[a].hedefGerceklestirme;
      if (value > max) max = value;
    }
    let kalan = max % 1;
    return max + (kalan > 0 ? 1 - kalan : 0);
  };
  getMinHedefValue = (data) => {
    let min = 0;
    for (let a = 0; a < data.length; a++) {
      let value = data[a].hedefGerceklestirme;
      if (value < min) min = value;
    }
    let kalan = min % 1;
    return min - kalan;
  };
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  getTabiSatis(data) {
    return this.props.hedefTuru === 0
      ? parseInt(data.hepsi.replace(".", "").replace(",", ""))
      : this.props.hedefTuru === 1
        ? parseInt(data.perakende.replace(".", "").replace(",", ""))
        : this.props.hedefTuru === 2
          ? parseInt(data.sigorta.replace(".", "").replace(",", ""))
          : this.props.hedefTuru === 3
            ? parseInt(data.yetkili.replace(".", "").replace(",", ""))
            : parseInt(data.hepsi.replace(".", "").replace(",", ""));
  }
  renderPerformanceTable = (data, index) => {
    let barData = [];
    for (let a = 0; a < data.length; a++) {
      barData.push({
        hedef: parseInt(data[a].target.replace(".", "").replace(",", "")),
        hedefeTabiSatis: this.getTabiSatis(data[a]),
        hedefGerceklestirme: data[a].hedefGerceklestirme,
      });
    }
    let keys = ["hedefeTabiSatis", "hedef"];

    const verticalContentInset = { top: 10, bottom: 10 };
    let max = this.getMaxValue(data);
    let maxHedef = 100;
    let minHedef = this.getMinHedefValue(data);
    let hedefInterval = (Math.abs(maxHedef) + Math.abs(minHedef)) / 6;
    //.log("max: ", maxHedef, " min : ", minHedef);
    return (
      <View key={"aaaaaa" + index} style={{ marginTop: screenHeight * 0.05 }}>
        <View style={{ marginLeft: "20%" }}>
          <Text
            style={{
              color: "gray",
              fontWeight: "bold",
              fontSize: normalize(25),
              backgroundColor: "transparent",
            }}
          >
            {data && data[0] && data[0].DealerName ? data[0].DealerName : ""}
          </Text>
        </View>
        <ScrollView
          key={"sss:" + index}
          style={{
            marginTop: 50,
            marginLeft: "3%",
            marginRight: "3%",
          }}
          horizontal={true}
        >
          <View style={{ width: 60, height: 300 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.numberWithCommas(parseInt((max / 6) * 6))}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.numberWithCommas(parseInt((max / 6) * 5))}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.numberWithCommas(parseInt((max / 6) * 4))}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.numberWithCommas(parseInt((max / 6) * 3))}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.numberWithCommas(parseInt((max / 6) * 2))}</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>{this.numberWithCommas(parseInt((max / 6) * 1))}</Text>
              <Text>0</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <StackedBarChart
              spacingInner={0.3}
              data={barData}
              colors={["#CC4728", "#3d68c5"]}
              keys={keys}
              style={{ height: 300, width: data.length * 140 }}
              svg={{ fill: "rgb(134, 65, 244)" }}
              yMin={0}
              yMax={max}
            >
              <Grid />
            </StackedBarChart>
            <LineChart
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: 300,
                width: data.length * 140,
              }}
              data={barData}
              yAccessor={({ item }) => item.hedefGerceklestirme}
              yMin={minHedef}
              contentInset={{ left: 40 }}
              yMax={maxHedef}
              svg={{ stroke: "#F29D39", strokeWidth: 5 }}
            />

            <View
              style={{
                marginLeft: 7,
                height: 60,
                flexDirection: "row",
                width: data.length * 140,
                justifyContent: "space-between",
              }}
            >
              {data.map((data, index) => {
                return (
                  <View key={"ssss" + index} style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ color: "#473e54", fontSize: normalize(15) }}
                      >
                        {data.name}
                      </Text>
                    </View>
                    <View style={{ width: 45 }}></View>
                  </View>
                );
              })}
            </View>

            <View
              style={{
                width: screenWidth,
                alignItems: "center",
                flexDirection: "row",
                height: 25,
              }}
            >
              <View
                style={{
                  backgroundColor: "#3d68c5",
                  width: 50,
                  height: "100%",
                }}
              />
              <Text style={{ marginLeft: 10, fontSize: normalize(12) }}>
                Hedef
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  backgroundColor: "#CC4728",
                  width: 50,
                  height: "100%",
                }}
              />
              <Text style={{ marginLeft: 10, fontSize: normalize(12) }}>
                Hedefe tabi satış
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  backgroundColor: "#F29D39",
                  width: 50,
                  height: "30%",
                }}
              />
              <Text style={{ marginLeft: 10, fontSize: normalize(12) }}>
                Hedef Gerçekleşme
              </Text>
            </View>
          </View>
          <View style={{ width: 60, height: 300 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{(minHedef + hedefInterval * 6).toFixed(1)}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{(minHedef + hedefInterval * 5).toFixed(1)}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{(minHedef + hedefInterval * 4).toFixed(1)}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{(minHedef + hedefInterval * 3).toFixed(1)}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{(minHedef + hedefInterval * 2).toFixed(1)}</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>{(minHedef + hedefInterval).toFixed(1)}</Text>
              <Text>{minHedef.toFixed(1)}</Text>
            </View>
          </View>
        </ScrollView>
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
