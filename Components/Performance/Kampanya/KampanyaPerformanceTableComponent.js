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
  Dimensions, Platform
} from "react-native";

import { normalize } from "../../../HelperFunctions";
var screenHeight = Dimensions.get("screen").height;
var screenWidth = Dimensions.get("screen").width;

import LoginScreen from "../../LoginScreen/LoginScreen";

export default class KampanyaPerformanceTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smallData: props.performanceData ? props.performanceData.slice(0, 1) : [],
      page: 1
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.performanceData !== nextProps.performanceData) {
      this.setState({ smallData: nextProps.performanceData.slice(0, nextState.page) })
    }
    return true
  }
  convertText(text) {
    return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }
  renderRow = (rowData, index, isHeader, isSummary, region) => {
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
              isHeader || isSummary ? { fontWeight: "bold", color: "#5a5a5a" } : {},
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
              isSummary ? { fontWeight: "bold", color: "#5a5a5a", fontSize: Platform.OS == "ios" ? normalize(7) : normalize(10) } : {},
            ]}
          >
            {isHeader ? "HEDEF" : this.convertText(rowData.target.toLocaleString('tr')) + " ₺"}
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader ? "TÜM SATIŞ" : this.convertText(rowData.tumSatis.toLocaleString('tr')) + " ₺"}
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
              isSummary ? { fontWeight: "bold", color: "#5a5a5a", fontSize: Platform.OS == "ios" ? normalize(7) : normalize(10) } : {},

            ]}
          >
            {isHeader
              ? "HEDEFE TABİ SATIŞ"
              : this.props.hedefTuru === 0
                ? this.convertText(rowData.hepsi.toLocaleString('tr')) + " ₺"
                : this.props.hedefTuru === 1
                  ? this.convertText(rowData.perakende.toLocaleString('tr')) + " ₺"
                  : this.props.hedefTuru === 2
                    ? this.convertText(rowData.sigorta.toLocaleString('tr')) + " ₺"
                    : this.props.hedefTuru === 3
                      ? this.convertText(rowData.yetkili.toLocaleString('tr')) + " ₺"
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader ? "PRİME TABİ SATIŞ" : this.convertText(rowData.primeTabiSatis.toLocaleString('tr')) + " ₺"}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            flex: 1,
            flexDirection: "column",
            borderColor: "#dbe0e2",
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text
            style={[
              styles.rowText,
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : { marginTop: "15%" },
            ]}
          >
            {isHeader
              ? "Kampanya Performans" :
              isSummary ? this.props.hedefTuru === 0
                ? (rowData.hepsi / rowData.target * 100).toFixed(2).toLocaleString('tr') + " %"
                : this.props.hedefTuru === 1
                  ? (rowData.perakende / rowData.target * 100).toFixed(2).toLocaleString('tr') + " %"
                  : this.props.hedefTuru === 2
                    ? (rowData.sigorta / rowData.target * 100).toFixed(2).toLocaleString('tr') + " %"
                    : this.props.hedefTuru === 3
                      ? (rowData.yetkili / rowData.target * 100).toFixed(2).toLocaleString('tr') + " %"
                      : "s" + " ₺"
                : rowData.hedefGerceklestirme.toFixed(2).toLocaleString('tr') + " %"}

          </Text>
          {!isHeader && <TouchableOpacity
            onPress={() => {
              let detail = rowData.campaignDetail
              detail.dealerName = rowData.DealerName
              detail.name = rowData.name
              detail.region = region
              this.props.showDetail(detail)
            }}
            style={{
              flex: 1,
              alignItems: "center", justifyContent: "center", width: "80%", backgroundColor: "red", marginBottom: "5%", marginTop: "10%"
            }}>
            <Text
              style={[
                styles.rowText,
                isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : { color: "white" },
              ]}
            >
              İNCELE

          </Text></TouchableOpacity>}
        </View>
      </View>
    );
  };


  CalculateSumary = (data) => {
    let summary = {
      DealerName: "TEST1",
      Region: "TEST2",
      name: "BAYİ TOPLAMI",
      target: 0,
      tumSatis: 0,
      tabiSatis: 0,
      primeTabiSatis: 0,
      hepsi: 0,
      perakende: 0,
      sigorta: 0,
      yetkili: 0,
      hedefGerceklestirme: 0,
    };
    for (let a = 0; a < data.length; a++) {
      let item = data[a]
      summary.hedefGerceklestirme += item.hedefGerceklestirme
      summary.yetkili += item.yetkili
      summary.sigorta += item.sigorta
      summary.perakende += item.perakende
      summary.hepsi += item.hepsi
      summary.primeTabiSatis += item.primeTabiSatis
      summary.tabiSatis += item.tabiSatis
      summary.tumSatis += item.tumSatis
      summary.target += item.target
    }
    return summary
  }
  renderPerformanceTable = (data, index, region) => {
    let summary = this.CalculateSumary(data)

    return (
      <View key={"d" + index} style={{ marginTop: screenHeight * 0.04 }}>
        {this.renderRow(data[0], null, true)}
        {data.map((rowData, index) => {
          return this.renderRow(rowData, index, false, false, region);
        })}
        {this.renderRow(summary, 10220, false, true)}

      </View>
    );
  };
  renderArea = (data, index) => {
    let region = data[0][0]["Region"] + ".BÖLGE"
    return (
      <View key={"a:" + index} style={styles.areaContainer}>
        <View style={styles.bolgeTextContainer}>
          <Text style={styles.bolgeText}>
            {region}
          </Text>
        </View>

        <View>
          {data.map((data, index) => {
            return this.renderPerformanceTable(data, index, region);
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
            smallData: this.props.performanceData ?
              this.props.performanceData.slice(0, this.state.page + 1) : []
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
    marginTop: screenHeight * 0.02,
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
    fontSize: Platform.OS == "ios" ? normalize(7) : normalize(10),
    color: "#657077",
    width: "100%",
    textAlign: "center"
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
