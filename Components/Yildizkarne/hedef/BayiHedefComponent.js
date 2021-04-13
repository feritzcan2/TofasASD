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
import { normalize } from "../../../HelperFunctions";

const screenHeight = Dimensions.get("screen").height;

export default class BayiHedefComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableVisible: [false, false, false, false, false, false, false, false],
    };
  }
  toggleVisible = (index) => {
    let tableVisible = this.state.tableVisible;
    tableVisible[index] = !tableVisible[index];
    this.setState({ tableVisible });
  };
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  renderRow = (rowData, index, isHeader, type) => {
    let colName1 =
      type === 0
        ? "B_YPH_T"
        : type === 1
          ? "B_YMK_T"
          : type === 2
            ? "B_OW_T"
            : type === 3
              ? "B_AIH_T"
              : type === 4
                ? "B_FPS_T"
                : type === 5
                  ? "B_SDH_T"
                  : type === 6
                    ? "B_BKK_T"
                    : [];
    let colName2 =
      type === 0
        ? "B_YPH_E"
        : type === 1
          ? "B_YMK_E"
          : type === 2
            ? "B_OW_E"
            : type === 3
              ? "B_AIH_E"
              : type === 4
                ? "B_FPS_E"
                : type === 5
                  ? "B_SDH_E"
                  : type === 6
                    ? "B_BKK_E"
                    : [];
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader ? "KOD" : rowData.Code}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 120,
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
            {isHeader ? "ÜNVAN" : rowData.Name}
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader
              ? colName1
              : this.numberWithCommas(rowData[colName1].toFixed(0))}
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader
              ? colName2
              : this.numberWithCommas(rowData[colName2].toFixed(0))}
          </Text>
        </View>
      </View>
    );
  };
  renderTable = (index) => {
    const data = this.props.data;

    return (
      <ScrollView key={"d" + index} horizontal={true}>
        <View key={"d" + index} style={{ marginTop: screenHeight * 0.04 }}>
          {this.renderRow(data[0], null, true, index)}
          {data.map((rowData, indexX) => {
            return this.renderRow(rowData, indexX, false, index);
          })}
        </View>
      </ScrollView>
    );
  };

  render() {
    let visible = this.state.tableVisible;
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View style={{ height: "100%" }}>
            <Text style={styles.text}>{this.props.detail.Name}</Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: normalize(13),
                  color: this.props.detail.IsActive === true ? "green" : "red",
                },
              ]}
            >
              {this.props.detail.IsActive === true ? "  aktif" : "  pasif"}
            </Text>
          </View>
          <TouchableOpacity
            style={{ height: "100%" }}
            onPress={this.props.close}
          >
            <Text style={styles.text}> GİZLE</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ marginTop: screenHeight * 0.04 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(0)}>
              <Text style={[styles.headerText, { backgroundColor: "#F8CDA0" }]}>
                YEDEK PARÇA İŞ HACMİ (A)
              </Text>
            </TouchableOpacity>
            {visible[0] === true && this.renderTable(0)}
          </View>
          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(1)}>
              <Text style={[styles.headerText, { backgroundColor: "#CEEDD1" }]}>
                OPARWEB CRM HEDEFİ
              </Text>
            </TouchableOpacity>
            {visible[1] === true && this.renderTable(1)}
          </View>
          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(2)}>
              <Text style={[styles.headerText, { backgroundColor: "#FCEBA6" }]}>
                OPAR WEB
              </Text>
            </TouchableOpacity>
            {visible[2] === true && this.renderTable(2)}
          </View>
          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(3)}>
              <Text style={[styles.headerText, { backgroundColor: "#B1CE95" }]}>
                AKSESUAR İŞ HACMİ
              </Text>
            </TouchableOpacity>
            {visible[3] === true && this.renderTable(3)}
          </View>

          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(4)}>
              <Text style={[styles.headerText, { backgroundColor: "#F1CCB1" }]}>
                FOKUS ÜRÜN GRUBU SATIŞI
              </Text>
            </TouchableOpacity>
            {visible[4] === true && this.renderTable(4)}
          </View>
          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(5)}>
              <Text style={[styles.headerText, { backgroundColor: "#FFFD55" }]}>
                STOK DEVİR HIZI
              </Text>
            </TouchableOpacity>
            {visible[5] === true && this.renderTable(5)}
          </View>
          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(6)}>
              <Text style={[styles.headerText, { backgroundColor: "#B7C6E4" }]}>
                B2B KAMPANYA PANELİNDEKİ KAMPANYA ADETİ
              </Text>
            </TouchableOpacity>
            {visible[6] === true && this.renderTable(6)}
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
  }, rowText: {
    width: "100%",
    textAlign: "center",
    fontSize: normalize(12),
    color: "#657077",
  },
  text: {
    fontSize: normalize(16),
    color: "#473e54",
    padding: 5,
    fontWeight: 'bold',
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
