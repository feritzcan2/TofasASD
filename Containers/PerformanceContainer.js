import React from "react";
import { View, StyleSheet, Image, Text, AsyncStorage, Platform } from "react-native";

import Tabs from "react-native-tabs";
import {
  getBayiList,
  getGenelPerformance,
  getCampaigns,
  getCampaignPerformance, getRegions
} from "../Api/GeneralPerformance";
import { normalize } from "../HelperFunctions";
import FilterComponent from "../Components/FilterComponent";
import GeneralPerformanceComponent from "../Components/Performance/General/GeneralPerformanceComponent";
import KampanyaPerformanceComponent from "../Components/Performance/Kampanya/KampanyaPerformanceComponent";

export default class PerformanceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userData: null,
      filterVisible: false,
      campaignFilterVisible: false,
      kampanyaSelectionVisible: false,
      performanceData: [],
      kampanyaPerformanceData: [],
      campaigns: global.campaigns,
      selectedCampaign:
        global.campaigns && global.campaigns.length > 0
          ? global.campaigns[global.campaigns.length - 1]
          : null,
      page: "GENEL",
      isDetail: false
    };
    if (global.regions && global.regions.length > 0) {
      this.state.selectedPerformanceFilters = {
        hedefTuru: 0,
        region: global.regions[0].Value,
        dealerCode: "",
        quarter: 1,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        donemTuru: 1,
      }
      getGenelPerformance(this.state.selectedPerformanceFilters).then((data) => {
        this.preparePerformanceData(data);
      });
    } else {
      getRegions().then((data) => {
        if (global.regions && global.regions.length > 0) {
          this.state.selectedPerformanceFilters = {
            hedefTuru: 0,
            region: global.regions[0].Value,
            dealerCode: "",
            quarter: 1,
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            donemTuru: 1,
          }
          getGenelPerformance(this.state.selectedPerformanceFilters).then((data) => {
            this.preparePerformanceData(data);
          });
        }
      });
    }

    if (!global.campaigns) {
      getCampaigns().then((data) => {
        this.setState({
          campaigns: data,
          selectedCampaign: data && data.length > 0 ? data[data.length - 1] : null,
        });
      });
    } else if (this.state.selectedCampaign) {
      getCampaignPerformance(this.state.selectedCampaign.Id).then((data) => {
        this.preperaKampanyaData(data, true);

      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.selectedCampaign !== null &&
      nextState.selectedCampaign &&
      this.state.selectedCampaign !== nextState.selectedCampaign
    ) {
      getCampaignPerformance(nextState.selectedCampaign.Id).then((data) => {

        this.preparePerformanceData(data, true);
      });
    }
    return true;
  }

  changeCampaign = (campaign) => {
    if (this.state.selectedCampaign.Id !== campaign.Id) {
      this.setState({
        selectedCampaign: campaign,
        campaignFilterVisible: false,
      }, () => getCampaignPerformance(campaign.Id).then((data) => {
        this.preperaKampanyaData(data, true);
      }));
    } else {
      this.setState({ campaignFilterVisible: false });
    }
  };

  changeTab = (tab) => {
    this.setState({ selectedTab: tab });
  };

  applyPerformanceFilter = (filters) => {

    this.setState({ selectedPerformanceFilters: filters });
    if (filters.donemTuru == 2) {
      this.setState({ isDetail: true })
    } else {
      this.setState({ isDetail: false })
    }
    getGenelPerformance(filters).then((data) => {
      this.preparePerformanceData(data);
    });
  };

  preparePerformanceData = (serverData, isKampanya) => {

    let listData = serverData && serverData.Item1 ? serverData.Item1 : []
    let datas = {};
    for (let a = 0; a < listData.length; a++) {
      let data = listData[a];
      let campaignTarget = {
        PriceLinkedTarget: data.PriceLinkedTargetStr,
        TargetPercentStr: data.TargetPercentStr,
        PriceTarget: data.PriceTarget,
        TargetPercent: data.TargetPercent,
        CampaignType: 1,
        PriceLinkedTarget: data.PriceLinkedTarget,
        PriceLinkedTargetStr: data.PriceLinkedTargetStr,
        MinSalePercent: 100,
        MinSaleType: 2
      }
      let rowData = {
        DealerName: data.DealerName,
        Region: data.Region,
        name: data.SalesmanName,
        target: parseInt(data.PriceTarget, 10),
        tumSatis: parseInt(data.PriceTotal, 10),
        tabiSatis: parseInt(data.PriceLinkedTarget, 10),
        primeTabiSatis: parseInt(data.PricePrim, 10),
        hepsi: parseInt(data.PriceLinkedTarget, 10),
        perakende: parseInt(data.PriceLinkedTarget_Perakende, 10),
        sigorta: parseInt(data.PriceLinkedTarget_Sigorta, 10),
        yetkili: parseInt(data.PriceLinkedTarget_Servis, 10),
        hedefGerceklestirme: data.TargetPercent,
        campaignDetail: campaignTarget
      };

      if (datas[data.DealerCode]) {
        datas[data.DealerCode].push(rowData);
      } else {
        datas[data.DealerCode] = [rowData];
      }
    }

    let dataArray = [];

    for (var key in datas) {
      // check if the property/key is defined in the object itself, not in parent
      if (datas.hasOwnProperty(key)) {
        dataArray.push(datas[key]);
      }
    }

    datas = {};
    for (let a = 0; a < dataArray.length; a++) {
      if (datas[dataArray[a][0].Region]) {
        datas[dataArray[a][0].Region].push(dataArray[a]);
      } else {
        datas[dataArray[a][0].Region] = [dataArray[a]];
      }
    }
    let regionArray = [];

    for (var key in datas) {
      // check if the property/key is defined in the object itself, not in parent
      if (datas.hasOwnProperty(key)) {
        regionArray.push(datas[key]);
      }
    }

    let regionData = []
    let regionListData = serverData && serverData.Item2 ? serverData.Item2 : []
    let allData = null

    for (let a = 0; a < regionListData.length; a++) {
      let data = regionListData[a];
      let campaignTarget = {
        PriceLinkedTarget: data.PriceLinkedTargetStr,
        TargetPercentStr: data.TargetPercentStr,
        PriceTarget: data.PriceTarget,
        TargetPercent: data.TargetPercent,
        CampaignType: 1,
        PriceLinkedTarget: data.PriceLinkedTarget,
        PriceLinkedTargetStr: data.PriceLinkedTargetStr,
        MinSalePercent: 100,
        MinSaleType: 2
      }
      let rowData = {

        DealerName: data.DealerName,
        Region: data.Region,
        name: (a + 1) + " .Bölge",
        target: parseInt(data.PriceTarget, 10),
        tumSatis: parseInt(data.PriceTotal, 10),
        tabiSatis: parseInt(data.PriceLinkedTarget, 10),
        primeTabiSatis: parseInt(data.PricePrim, 10),
        hepsi: parseInt(data.PriceLinkedTarget, 10),
        perakende: parseInt(data.PriceLinkedTarget_Perakende, 10),
        sigorta: parseInt(data.PriceLinkedTarget_Sigorta, 10),
        yetkili: parseInt(data.PriceLinkedTarget_Servis, 10),
        hedefGerceklestirme: data.TargetPercent,
        campaignDetail: campaignTarget
      };

      regionData.push(rowData)
    }

    if (serverData.Item3 && serverData.Item3.length > 0) {
      let data = serverData.Item3[0];
      let campaignTarget = {
        PriceLinkedTarget: data.PriceLinkedTargetStr,
        TargetPercentStr: data.TargetPercentStr,
        PriceTarget: data.PriceTarget,
        TargetPercent: data.TargetPercent,
        CampaignType: 1,
        PriceLinkedTarget: data.PriceLinkedTarget,
        PriceLinkedTargetStr: data.PriceLinkedTargetStr,
        MinSalePercent: 100,
        MinSaleType: 2
      }
      allData = {
        DealerName: data.DealerName,
        Region: data.Region,
        name: "TÜRKİYE",
        target: parseInt(data.PriceTarget, 10),
        tumSatis: parseInt(data.PriceTotal, 10),
        tabiSatis: parseInt(data.PriceLinkedTarget, 10),
        primeTabiSatis: parseInt(data.PricePrim, 10),
        hepsi: parseInt(data.PriceLinkedTarget, 10),
        perakende: parseInt(data.PriceLinkedTarget_Perakende, 10),
        sigorta: parseInt(data.PriceLinkedTarget_Sigorta, 10),
        yetkili: parseInt(data.PriceLinkedTarget_Servis, 10),
        hedefGerceklestirme: data.TargetPercent,
        campaignDetail: campaignTarget
      };

    }
    if (isKampanya === true) {
      this.setState({ selectedCampaignPerformance: regionArray });
    } else this.setState({ performanceData: regionArray, regionData: regionData, allData: allData });
  };


  preperaKampanyaData = (serverData, isKampanya) => {
    let datas = {};
    for (let a = 0; a < serverData.length; a++) {
      let data = serverData[a];
      let campaignTarget = {
        PriceLinkedTarget: data.PriceLinkedTargetStr,
        TargetPercentStr: data.TargetPercentStr,
        PriceTarget: data.PriceTarget,
        TargetPercent: data.TargetPercent,
        CampaignType: 1,
        PriceLinkedTarget: data.PriceLinkedTarget,
        PriceLinkedTargetStr: data.PriceLinkedTargetStr,
        MinSalePercent: 100,
        MinSaleType: 2
      }
      let rowData = {
        DealerName: data.DealerName,
        Region: data.Region,
        name: data.SalesmanName,
        target: parseInt(data.PriceTarget, 10),
        tumSatis: parseInt(data.PriceTotal, 10),
        tabiSatis: parseInt(data.PriceLinkedTarget, 10),
        primeTabiSatis: parseInt(data.PricePrim, 10),
        hepsi: parseInt(data.PriceLinkedTarget, 10),
        perakende: parseInt(data.PriceLinkedTarget_Perakende, 10),
        sigorta: parseInt(data.PriceLinkedTarget_Sigorta, 10),
        yetkili: parseInt(data.PriceLinkedTarget_Servis, 10),
        hedefGerceklestirme: data.TargetPercent,
        campaignDetail: campaignTarget
      };

      if (datas[data.DealerCode]) {
        datas[data.DealerCode].push(rowData);
      } else {
        datas[data.DealerCode] = [rowData];
      }
    }

    let dataArray = [];

    for (var key in datas) {
      // check if the property/key is defined in the object itself, not in parent
      if (datas.hasOwnProperty(key)) {
        dataArray.push(datas[key]);
      }
    }

    datas = {};
    for (let a = 0; a < dataArray.length; a++) {
      if (datas[dataArray[a][0].Region]) {
        datas[dataArray[a][0].Region].push(dataArray[a]);
      } else {
        datas[dataArray[a][0].Region] = [dataArray[a]];
      }
    }
    let regionArray = [];

    for (var key in datas) {
      // check if the property/key is defined in the object itself, not in parent
      if (datas.hasOwnProperty(key)) {
        regionArray.push(datas[key]);
      }
    }
    this.setState({ selectedCampaignPerformance: regionArray });

  };

  render() {
    const { selectedTab, performanceData } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Tabs
          selected={this.state.page}
          style={{
            top: Platform.OS == 'android' ? "3%" : "5%",
            zIndex: 50000,
            backgroundColor: "#424e60",
            color: "#9da4ad",
          }}
          selectedStyle={{
            color: "white",
            backgroundColor: "#2d3542",
            padding: 10,
            borderRadius: 10,
          }}
          onSelect={(el) => this.setState({ page: el.props.name })}
        >
          <Text
            name="GENEL"
            style={{
              fontSize:
                this.state.page === "tablo" ? normalize(25) : normalize(15),
            }}
            selectedIconStyle={{
              height: "100%",
              borderBottomColor: "white",
              flex: 1,
            }}
          >
            GENEL
          </Text>
          <Text
            name="KAMPANYA"
            style={{
              fontSize:
                this.state.page === "grafik" ? normalize(25) : normalize(15),
            }}
            selectedIconStyle={{
              height: "100%",
              fontSize: normalize(25),
              borderBottomColor: "orange",
              flex: 1,
            }}
          >
            KAMPANYA
          </Text>
        </Tabs>

        <View style={{ flex: 1, marginTop: "10%" }}>
          {this.state.page === "GENEL" && (
            <GeneralPerformanceComponent
              applyFilters={this.applyPerformanceFilter}
              filters={this.state.selectedPerformanceFilters}
              performanceData={this.state.performanceData}
              regionData={this.state.regionData}
              allData={this.state.allData}
              isDetail={this.state.isDetail}
            />
          )}
          {this.state.page === "KAMPANYA" && (
            <KampanyaPerformanceComponent
              campaignFilterVisible={this.state.campaignFilterVisible}
              showCampaignFilter={() =>
                this.setState({ campaignFilterVisible: true })
              }
              changeCampaign={this.changeCampaign}
              selectedCampaignPerformance={
                this.state.selectedCampaignPerformance
              }
              campaigns={this.state.campaigns}
              selectedCampaign={this.state.selectedCampaign}
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
