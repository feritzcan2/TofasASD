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
import { Circle, G, Line, Rect } from "react-native-svg";

import {
  LineChart,
  BarChart,
  Grid,
  XAxis,
  YAxis,
  StackedBarChart,
} from "react-native-svg-charts";
import * as scale from "d3-scale";

import { normalize } from "../HelperFunctions";
var screenHeight = Dimensions.get("screen").height;
var screenWidth = Dimensions.get("screen").width;

import LoginScreen from "../Components/LoginScreen/LoginScreen";

export default class PerformanceChartComponent extends React.Component {
  constructor(props) {
    super(props);
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
  renderPerformanceTable = (data, index) => {
    let barData = [];
    for (let a = 0; a < data.length; a++) {
      barData.push({
        hedef: parseInt(data[a].target.replace(".", "").replace(",", "")),
        hedefeTabiSatis: parseInt(
          data[a].tabiSatis.replace(".", "").replace(",", "")
        ),
        hedefGerceklestirme: data[a].hedefGerceklestirme,
      });
    }
    let keys = ["hedefeTabiSatis", "hedef"];

    const verticalContentInset = { top: 10, bottom: 10 };
    let max = this.getMaxValue(data);
    let maxHedef = this.getMaxHedefValue(data);
    let minHedef = this.getMinHedefValue(data);
    console.log(maxHedef, minHedef);
    let hedefInterval = (Math.abs(maxHedef) + Math.abs(minHedef)) / 6;
    //.log("max: ", maxHedef, " min : ", minHedef);
    const Tooltip = ({ x, y }) => (
      <G
        x={x(5) - 75 / 2}
        key={"tooltip"}
        onPress={() => console.log("tooltip clicked")}
      >
        <G y={50}>
          <Rect
            height={40}
            width={75}
            stroke={"grey"}
            fill={"white"}
            ry={10}
            rx={10}
          />
          <Text
            x={75 / 2}
            dy={20}
            alignmentBaseline={"middle"}
            textAnchor={"middle"}
            stroke={"rgb(134, 65, 244)"}
          >
            {`${data[5]}ºC`}
          </Text>
        </G>
        <G x={75 / 2}>
          <Line y1={50 + 40} y2={y(data[5])} stroke={"grey"} strokeWidth={2} />
          <Circle
            cy={y(data[5])}
            r={6}
            stroke={"rgb(134, 65, 244)"}
            strokeWidth={2}
            fill={"white"}
          />
        </G>
      </G>
    );

    return (
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
        <View>
          <StackedBarChart
            spacingInner={0.3}
            data={barData}
            colors={["red", "blue"]}
            keys={keys}
            style={{ height: 300, width: data.length * 140 }}
            svg={{ fill: "rgb(134, 65, 244)" }}
            yMin={0}
            yMax={max}
          >
            <Tooltip />

            <LineChart
              yAccessor={({ item }) => parseFloat(item.hedefGerceklestirme)}
              style={{ height: 300 }}
              yMin={minHedef}
              contentInset={{ left: 40 }}
              yMax={maxHedef}
              svg={{ stroke: "#444", strokeWidth: 3 }}
            />
            <Grid />
          </StackedBarChart>
          <Grid />

          <View
            style={{
              marginLeft: 7,
              height: 80,
              flexDirection: "row",
              width: data.length * 140,
              justifyContent: "space-between",
            }}
          >
            {data.map((data, index) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#473e54", fontSize: normalize(15) }}>
                      {data.name}
                    </Text>
                  </View>
                  <View style={{ width: 45 }}></View>
                </View>
              );
            })}
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
    );
  };
  renderArea = (data, index) => {
    return (
      <View key={"a:" + index} style={styles.areaContainer}>
        <View style={styles.bolgeTextContainer}>
          <Text style={styles.bolgeText}>{index + 1 + ".BÖLGE"}</Text>
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
    marginBottom: "20%",
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
