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

const screenHeight = Dimensions.get("screen").height;

export default class AsdDetayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableVisible: [false, false, false, false, false],
    };
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
            width: 60,
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
            {isHeader ? "BAYİ KODU" : rowData.Dealer.Code}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 100,
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
            {isHeader ? "BAYİ ADI" : rowData.Dealer.Name}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 100,
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
        </View>
        <View
          style={{
            height: "100%",
            width: 150,
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
            {isHeader ? "ÜNVAN" : rowData.Name}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 60,
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
            {isHeader ? "AĞIRLIK" : rowData.Weight}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 110,
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
              ? "GERÇEKLEŞEN"
              : this.numberWithCommas(rowData.ActualTarget.toFixed(0))}
          </Text>
        </View>

        <View
          style={{
            height: "100%",
            width: 110,
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
              ? "HEDEF"
              : this.numberWithCommas(rowData.Target.toFixed(0))}
          </Text>
        </View>

        <View
          style={{
            height: "100%",
            width: 110,
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
              ? "ALT LİMİT"
              : this.numberWithCommas(rowData.Limit.toFixed(0))}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 110,
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
              ? "ÜST LİMİT"
              : this.numberWithCommas(rowData.TopLimit.toFixed(0))}
          </Text>
        </View>

        <View
          style={{
            height: "100%",
            width: 100,
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
            {isHeader ? "GERÇ. %" : rowData.ActualTargetPercent.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 100,
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
            {isHeader ? "PER. PUAN" : rowData.Point.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 100,
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
            {isHeader ? "AĞIRLIK PUAN" : rowData.WeightPoint.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };
  renderTable = (index) => {
    const allData = this.props.data;
    let data =
      index === 0
        ? allData.satisHedef
        : index === 1
          ? allData.yeniMusteri
          : index === 2
            ? allData.aksesuarSatis
            : index === 3
              ? allData.firsatParca
              : index === 4
                ? allData.dmpSatis
                : [];
    return (
      <ScrollView key={"d" + index} horizontal={true}>
        <View key={"d" + index} style={{ marginTop: screenHeight * 0.04 }}>
          {this.renderRow(data[0], null, true)}
          {data.map((rowData, indexX) => {
            return this.renderRow(rowData, indexX, false);
          })}
        </View>
      </ScrollView>
    );
  };

  render() {
    let visible = this.state.tableVisible;
    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={{ marginTop: screenHeight * 0.04 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(0)}>
              <Text style={[styles.headerText, { backgroundColor: "#F8CDA0" }]}>
                SATIŞ HEDEFİ GERÇEKLEŞME
              </Text>
            </TouchableOpacity>
            {visible[0] === true && this.renderTable(0)}
          </View>
          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(1)}>
              <Text style={[styles.headerText, { backgroundColor: "#CEEDD1" }]}>
                YENİ MÜŞTERİ KAZANIMI
              </Text>
            </TouchableOpacity>
            {visible[1] === true && this.renderTable(1)}
          </View>
          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(2)}>
              <Text style={[styles.headerText, { backgroundColor: "#FCEBA6" }]}>
                AKSESUAR SATIŞI
              </Text>
            </TouchableOpacity>
            {visible[2] === true && this.renderTable(2)}
          </View>
          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(3)}>
              <Text style={[styles.headerText, { backgroundColor: "#B1CE95" }]}>
                FIRSAT PARÇALARININ SATIŞI
              </Text>
            </TouchableOpacity>
            {visible[3] === true && this.renderTable(3)}
          </View>
          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(4)}>
              <Text style={[styles.headerText, { backgroundColor: "#D0CECE" }]}>
                DMP SATIŞI
              </Text>
            </TouchableOpacity>
            {visible[4] === true && this.renderTable(4)}
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
  headerText: {
    color: "#457ab2",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fceba6",
    width: "100%",
    fontSize: normalize(20),
    paddingTop: 10,
    paddingBottom: 10,
  },
});
