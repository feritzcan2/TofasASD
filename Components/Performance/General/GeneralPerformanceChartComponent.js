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
  Alert,
  ToastAndroid,
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
import Svg, {
  Text as SvgText,
  Line,
  Circle
} from 'react-native-svg';
import { normalize } from "../../../HelperFunctions";
var screenHeight = Dimensions.get("screen").height;
var screenWidth = Dimensions.get("screen").width;

import LoginScreen from "../../LoginScreen/LoginScreen";

export default class GeneralPerformanceChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalHeader: '',
      modalText: '',
      smallData: props.performanceData ? props.performanceData.slice(0, 1) : [],
      page: 1
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.performanceData !== nextProps.performanceData) {
      this.setState({ smallData: nextProps.performanceData.slice(0, nextState.page) })
    }

    return true;
  }

  getMaxValue = (data) => {
    let max = 100000;
    for (let a = 0; a < data.length; a++) {
      let value = data[a].target;
      if (value > max) max = value;
    }
    let kalan = max % 100000;
    return max + (kalan > 0 ? 100000 - kalan : 0);
  };
  getMaxHedefValue = (data) => {
    let max = 1;
    ;

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
      ? parseInt(data.hepsi)
      : this.props.hedefTuru === 1
        ? parseInt(data.perakende)
        : this.props.hedefTuru === 2
          ? parseInt(data.sigorta)
          : this.props.hedefTuru === 3
            ? parseInt(data.yetkili)
            : parseInt(data.hepsi);
  }
  renderPerformanceTable = (data, index) => {
    let barData = [];

    for (let a = 0; a < data.length; a++) {
      barData.push({
        hedef: parseInt(data[a].target),
        hedefeTabiSatis: this.getTabiSatis(data[a]),
        hedefGerceklestirme: parseInt(data[a].hedefGerceklestirme),
      });
    }
    let keys = ["hedefeTabiSatis"];
    let keys2 = ["hedef"];

    const verticalContentInset = { top: 10, bottom: 10 };
    let max = this.getMaxValue(data);
    let maxHedef = 100;
    let minHedef = this.getMinHedefValue(data);
    let hedefInterval = (Math.abs(maxHedef) + Math.abs(minHedef)) / 6;
    //.log("max: ", maxHedef, " min : ", minHedef);
    return (
      <View key={"aaaaaa" + index} style={{ marginTop: screenHeight * 0.05 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ modalVisible: false })
            }}
            style={{ height: screenHeight, width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: screenWidth * 0.8, alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 1, backgroundColor: '#fff', paddingVertical: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{this.state.modalHeader}</Text>
              <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.numberWithCommas(this.state.modalText)}</Text>
            </View>
          </TouchableOpacity>
        </Modal>
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
          <View style={{ width: 70, height: 300 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.numberWithCommas(parseInt((max / 6) * 6 / 100000) * 100000)}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.numberWithCommas(parseInt((max / 6) * 5 / 100000) * 100000)}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.numberWithCommas(parseInt((max / 6) * 4 / 100000) * 100000)}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.numberWithCommas(parseInt((max / 6) * 3 / 100000) * 100000)}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{this.numberWithCommas(parseInt((max / 6) * 2 / 100000) * 100000)}</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>{this.numberWithCommas(parseInt((max / 6) * 1 / 100000) * 100000)}</Text>
              <Text>0</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>

            <View style={{ width: data.length * 140, height: 300, flexDirection: 'row' }}>
              {barData.map((item, index) => {
                return (
                  <View
                    key={"mmsmsms" + index}
                    style={{ width: 140, height: 300, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ height: 300 * barData[index].hedef / max, width: 55, backgroundColor: '#3d86c5', alignItems: 'flex-end' }}
                      onPress={() => {
                        this.setState({ modalVisible: true, modalHeader: data[index].name, modalText: 'Hedef: ' + item.hedef })
                      }}>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalVisible: true, modalHeader: data[index].name, modalText: 'Hedefe Tabi Satış: ' + item.hedefeTabiSatis })
                      }}
                      style={{ height: 300 * barData[index].hedefeTabiSatis / max, width: 55, backgroundColor: '#cc4728', alignItems: 'flex-end' }}>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <View style={{ width: data.length * 140, height: 200, flexDirection: 'row', position: "absolute", left: 40 }}>

              {barData.map((item, index) => {
                return (
                  <Svg height="260" width={140}>

                    <SvgText
                      fill="#2c982c"
                      stroke="#fff"
                      fontSize="20"
                      fontWeight="bold"
                      onPress={() => {
                        this.setState({ modalVisible: true, modalHeader: data[index].name, modalText: 'Hedefe Gerçekleşme: ' + item.hedefGerceklestirme })
                      }}
                      x="25"
                      y={120 + (100 - item.hedefGerceklestirme) + 25}
                      textAnchor="middle"
                    >
                      {item.hedefGerceklestirme}%
</SvgText>
                    <Line
                      x1="5"
                      y1={120 + (100 - item.hedefGerceklestirme)}
                      x2={index + 1 != barData.length ? "140" : "0"}
                      y2={index + 1 != barData.length ? 120 + (100 - barData[(index + 1)].hedefGerceklestirme) : 120 + (100 - item.hedefGerceklestirme)}
                      stroke="#ff9900"
                      strokeWidth="3" />
                    <Circle cx="7" cy={120 + (100 - item.hedefGerceklestirme)} r="7" fill="#ff9900" />
                  </Svg>
                );
              })}



            </View>

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
                        width: 120,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ color: "#473e54", fontSize: normalize(15), textAlign: 'center' }}
                      >
                        {data.name}
                      </Text>
                    </View>

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
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 13).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 12).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 11).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 10).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 9).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 8).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 7).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 6).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 5).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 4).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 3).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef + hedefInterval * 2).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'top' }}>{(minHedef).toFixed(0)} %</Text>
            </View>
            <View style={{ flex: 1, }}>

            </View>
            <View style={{ flex: 1, }}>

            </View>
            <View style={{ flex: 1, }}>

            </View>
            <View style={{ flex: 1, }}>

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

  renderFlatList = () => {
    return <FlatList data={this.state.smallData}
      onEndReached={() => {
        if (this.props.performanceData.length > this.state.page) {
          this.setState({
            page: this.state.page + 1,
            smallData: this.props.performanceData.slice(0, this.state.page + 1)
          })
        }
      }}
      onEndReachedThreshold={.7}
      keyExtractor={(item, index) => index.toString()}

      renderItem={({ item, index }) => {
        return this.renderArea(item, index)
      }}
    ></FlatList>
  }


  render() {
    return this.renderFlatList()
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
