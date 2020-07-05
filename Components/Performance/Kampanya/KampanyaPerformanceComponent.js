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

import PerformanceChartComponent from "./KampanyaPerformanceChartComponent";
import PerformanceTableComponent from "./KampanyaPerformanceTableComponent";

import { normalize } from "../../../HelperFunctions";
import FilterComponent from "../../FilterComponent";
import CampaignSelectorComponent from "../../CampaignSelectorComponent";
import KampanyaDetayComponent from "./KampanyaDetayComponent";

export default class KampanyaPerformanceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userData: null,
      kampanyaSelectionVisible: false,
      performanceData: [],
      page: "tablo",
      detailVisible: false
    };
  }

  changeTab = (tab) => {
    this.setState({ selectedTab: tab });
  };

  showDetail = () => {
    this.setState({ detailVisible: true })
  }

  render() {
    const { selectedTab, performanceData } = this.state;
    return (
      <View style={{ flex: 1, marginBottom: "3%" }}>
        <KampanyaDetayComponent
          visible={this.state.detailVisible}
          close={() => this.setState({ detailVisible: false })}
        />
        <CampaignSelectorComponent
          selectedCampaign={this.props.selectedCampaign}
          selectedFilters={this.props.filters}
          campaigns={this.props.campaigns}
          changeCampaign={this.props.changeCampaign}
          visible={this.props.campaignFilterVisible}
          close={() => this.setState({ kampanyaSelectionVisible: false })}
        />


        <Tabs
          selected={this.state.page}
          style={{
            top: "5%",
            zIndex: 50000,
            backgroundColor: "white",
            height: "10%",
            padding: 10,
          }}
          selectedStyle={{
            color: "orange",
            backgroundColor: "yellow",
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

        <View style={{ flex: 1, marginTop: "5%" }}>
          <TouchableOpacity onPress={this.props.showCampaignFilter}>
            <Text
              style={{
                width: "70%",
                textAlign: "center",
                padding: 10,
                backgroundColor: "#FFCCCB",
                color: "white",
                alignSelf: "center",
                marginTop: "15%",
                fontSize: normalize(15),
              }}
            >
              KAMPANYA DEĞİŞTİR
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              width: "70%",
              textAlign: "center",
              color: "black",
              alignSelf: "center",
              marginTop: "1%",
              fontSize: normalize(15),
            }}
          >
            {this.props.selectedCampaign.Header}
          </Text>
          {this.state.page === "tablo" && (
            <PerformanceTableComponent
              performanceData={this.props.selectedCampaignPerformance}
              hedefTuru={0}
              showDetail={this.showDetail}
            />
          )}
          {this.state.page === "grafik" && (
            <PerformanceChartComponent
              hedefTuru={0}
              performanceData={this.props.selectedCampaignPerformance}
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
