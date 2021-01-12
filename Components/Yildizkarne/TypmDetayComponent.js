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

export default class TypmDetayComponent extends React.Component {
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
        {/* <View
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
              isHeader ? { fontWeight:"bold", color: "#5a5a5a" } : {},
            ]}
          >
            {isHeader ? "KOD" : rowData.Code}
          </Text>
        </View> */}
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
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
              isHeader ? { fontWeight: "bold", color: "#5a5a5a" } : {},
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
        ? allData.yedekParca
        : index === 1
          ? allData.yeniMusteri
          : index === 2
            ? allData.oparWeb
            : index === 3
              ? allData.aksesuarHacmi
              : index === 4
                ? allData.yerelIletisim
                : index === 5
                  ? allData.firsatParcalari
                  : index === 6
                    ? allData.stokDevir
                    : index === 7
                      ? allData.kampanyaPaneli
                      : [];
    return (
      <ScrollView key={"d" + index} horizontal={true}>
        <View key={"d" + index} style={{ marginTop: screenHeight * 0.04 }}>
          {this.renderRow(data[0], null, true, index === 2 || index === 3)}
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
                YEDEK PARÇA İŞ HACMİ (A)
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
          {/* <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(4)}>
              <Text style={[styles.headerText, { backgroundColor: "#D0CECE" }]}>
                YEREL İLETİŞİM
              </Text>
            </TouchableOpacity>
            {visible[4] === true && this.renderTable(4)}
          </View> */}
          <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(5)}>
              <Text style={[styles.headerText, { backgroundColor: "#F1CCB1" }]}>
                FIRSAT PARÇALARININ SATIŞI
              </Text>
            </TouchableOpacity>
            {visible[5] === true && this.renderTable(5)}
          </View>
          {/* <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(6)}>
              <Text style={[styles.headerText, { backgroundColor: "#FFFD55" }]}>
                STOK DEVİR HIZI
              </Text>
            </TouchableOpacity>
            {visible[6] === true && this.renderTable(6)}
          </View> */}
          {/* <View style={{ marginTop: screenHeight * 0.06 }}>
            <TouchableOpacity onPress={() => this.toggleVisible(7)}>
              <Text style={[styles.headerText, { backgroundColor: "#B7C6E4" }]}>
                B2B KAMPANYA PANELİNDEKİ KAMPANYA ADETİ
              </Text>
            </TouchableOpacity>
            {visible[7] === true && this.renderTable(7)}
          </View> */}
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
  }, rowText: {
    width: "100%",
    textAlign: "center",
    fontSize: normalize(12),
    color: "#657077",
  },
});
