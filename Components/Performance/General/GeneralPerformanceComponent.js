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
  AsyncStorage,
} from "react-native";
import Display from "react-native-display";

import Tabs from "react-native-tabs";

import PerformanceChartComponent from "./GeneralPerformanceChartComponent";
import GeneralPerformanceTableComponent from "./GeneralPerformanceTableComponent";
import {
  getBayiList,
  getGenelPerformance,
} from "../../../Api/GeneralPerformance";
import { normalize } from "../../../HelperFunctions";
import FilterComponent from "../../FilterComponent";
import GeneralDetayComponent from "./GeneralDetayComponent";
export default class GeneralPerformanceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userData: null,
      filterVisible: false,
      performanceData: [],
      page: "tablo",
      detailVisible:false
    };
  }

  changeTab = (tab) => {
    this.setState({ selectedTab: tab });
  };
  showDetail = (data) => {
      this.setState({ detailVisible: true, detailAreaData: data })
  }
  render() {
    const { selectedTab, performanceData } = this.state;
    return (
      <View style={{ flex: 1, marginBottom: "3%" }}>
        <GeneralDetayComponent
          visible={this.state.detailVisible}
          detailAreaData={this.state.detailAreaData}
          close={() => this.setState({ detailVisible: false })}
        />
        <FilterComponent
          selectedFilters={this.props.filters}
          apply={this.props.applyFilters}
          filterVisible={this.state.filterVisible}
          closeFilter={() => this.setState({ filterVisible: false })}
        />

        <Tabs
          selected={this.state.page}
          style={{
            top: "6%",
            zIndex: 50000,
            backgroundColor: "white",
            height: "10%",
            padding: 10,
          }}
          selectedStyle={{
            color: "orange",
            borderRadius: 10,
          }}
          onSelect={(el) => this.setState({ page: el.props.name })}
        >
          <Text
            name="tablo"
            style={{
              fontSize:
                this.state.page === "tablo" ? normalize(25) : normalize(15),
            }}
            selectedIconStyle={{
              height: "100%",
              borderBottomWidth: 2,
              borderBottomColor: "orange",
              flex: 1,
            }}
          >
            TABLO
          </Text>
          <Text
            name="grafik"
            style={{
              fontSize:
                this.state.page === "grafik" ? normalize(25) : normalize(15),
            }}
            selectedIconStyle={{
              height: "100%",
              fontSize: normalize(25),
              borderBottomWidth: 2,
              borderBottomColor: "orange",
              flex: 1,
            }}
          >
            GRAFİK
          </Text>
        </Tabs>

        <View style={{ flex: 1, marginTop: "15%" }}>
          <TouchableOpacity
            onPress={() => this.setState({ filterVisible: true })}
          >
            <Text
              style={{
                width: "70%",
                textAlign: "center",
                padding: 5,
                backgroundColor: "#FFCCCB",
                color: "white",
                alignSelf: "center",
                marginTop: "15%",
                fontSize: normalize(20),
              }}
            >
              FİLTRE SEÇ
            </Text>
          </TouchableOpacity>
          {this.state.page === "tablo" && (
            <GeneralPerformanceTableComponent
              performanceData={this.props.performanceData}
              hedefTuru={this.props.filters.hedefTuru}
              isDetail={this.props.isDetail}
              showDetail={this.showDetail}
            />
          )}
          {this.state.page === "grafik" && (
            <PerformanceChartComponent
              hedefTuru={this.props.filters.hedefTuru}
              performanceData={this.props.performanceData}
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
