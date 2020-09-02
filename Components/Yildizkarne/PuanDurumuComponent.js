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
import { normalize } from "../../HelperFunctions";
import BestThreeComponent from "./BestThreeComponent";

const screenHeight = Dimensions.get("screen").height;

export default class PuanDurumuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableVisible: [false, false, false, false],
    };
  }
  toggleVisible = (index) => {
    let tableVisible = this.state.tableVisible;
    tableVisible[index] = !tableVisible[index];
    this.setState({ tableVisible });
  };
  renderRow = (rowData, index, isHeader, isDanisman) => {
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
            {isHeader ? "SIRA" : rowData.Index}
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
            {isHeader ? "GRUP" : rowData.Group}
          </Text>
        </View>
        {isDanisman === true && (
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
              {isHeader ? "BAYİ KOD" : rowData.Dealer.Code}
            </Text>
          </View>
        )}
        {isDanisman === true && (
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
              {isHeader ? "BAYİ ÜNVAN" : rowData.Dealer.Name}
            </Text>
          </View>
        )}
        {/* <View
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
            {isHeader ? "KOD" : rowData.Code}
          </Text>
        </View> */}
        <View
          style={{
            height: "100%",
            flex: 1.7,
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
            {isHeader ? (isDanisman === true ? "İSİM" : "ÜNVAN") : rowData.Name}
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
            {isHeader ? "PUAN" : rowData.WeightPoint.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };
  renderTable = (index) => {
    const allData = this.props.data;
    console.log(allData)
    let data =
      index === 0
        ? allData.toptanYedekA
        : index === 1
          ? allData.toptanYedekB
          : index === 2
            ? allData.aktifDanismanA
            : index === 3
              ? allData.aktifDanismanB
              : [];
    return (
      <View key={"d" + index} style={{ marginTop: screenHeight * 0.04 }}>
        <View >
          <BestThreeComponent data={data} />
        </View>

        <View >
          {this.renderRow(data[0], null, true, index === 2 || index === 3)}
          {data.map((rowData, indexX) => {
            if (indexX === 0 || indexX === 1 || indexX === 2) return
            return this.renderRow(
              rowData,
              indexX,
              false,
              index === 2 || index === 3
            );
          })}
        </View>
      </View>
    );
  };

  render() {
    let visible = this.state.tableVisible;
    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={{ marginTop: screenHeight * 0.04 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(0)}>
              <Text style={styles.headerText}>
                TOPTAN YEDEK PARÇA MÜDÜRÜ (A)
              </Text>
            </TouchableOpacity>
            {visible[0] === true && this.renderTable(0)}
          </View>
          <View style={{ marginTop: screenHeight * 0.08 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(1)}>
              <Text style={styles.headerText}>
                TOPTAN YEDEK PARÇA MÜDÜRÜ (B)
              </Text>
            </TouchableOpacity>
            {visible[1] === true && this.renderTable(1)}
          </View>
          <View style={{ marginTop: screenHeight * 0.08 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(2)}>
              <Text style={styles.headerText}>AKTİF SATIŞ DANIŞMANI (A)</Text>
            </TouchableOpacity>
            {visible[2] === true && this.renderTable(2)}
          </View>
          <View style={{ marginTop: screenHeight * 0.08 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(3)}>
              <Text style={styles.headerText}>AKTİF SATIŞ DANIŞMANI (B)</Text>
            </TouchableOpacity>
            {visible[3] === true && this.renderTable(3)}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "8%",
    display: "flex",
  },
  rowText: { fontSize: normalize(12) },
  headerText: {
    color: "#457ab2",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fceba6",
    width: "100%",
    fontSize: normalize(18),
    paddingTop: 10,
    paddingBottom: 10,
  },
});
