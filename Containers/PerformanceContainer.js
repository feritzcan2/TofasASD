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

import LoginScreen from "../Components/LoginScreen/LoginScreen";
import PerformanceChartComponent from "../Components/PerformanceChartComponent";
import PerformanceComponent from "../Components/PerformanceComponent";
import { getBayiList, getGenelPerformance } from "../Api/GeneralPerformance";

export default class PerformanceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userData: null,
      performanceData: [],
    };

    AsyncStorage.getItem("perff").then((localData) => {
      if (localData) {
        this.preparePerformanceData(JSON.parse(localData));
        console.log("get from local");
      } else {
        getGenelPerformance().then((data) => {
          if (data) {
            AsyncStorage.setItem("perff", JSON.stringify(data));
            this.preparePerformanceData(data);
          }
        });
      }
    });
  }

  preparePerformanceData = (serverData) => {
    let datas = {};
    for (let a = 0; a < serverData.length; a++) {
      let data = serverData[a];
      let rowData = {
        DealerName: data.DealerName,
        Region: data.Region,
        name: data.SalesmanName,
        target: data.PriceTargetStr,
        tumSatis: data.PriceTotalStr,
        tabiSatis: data.PriceLinkedTargetStr,
        primeTabiSatis: data.PriceLinkedTargetStr,
        hedefGerceklestirme: data.TargetPercent,
      };
      console.log(data.TargetPercentStr);
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

    console.log("data size " + dataArray.length);
    console.log("regionArray size " + regionArray.length);
    this.setState({ performanceData: regionArray });
  };

  render() {
    return (
      <PerformanceChartComponent performanceData={this.state.performanceData} />
    );
  }
}
