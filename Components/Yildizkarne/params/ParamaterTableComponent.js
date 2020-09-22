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

export default class ParamaterTableComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBayiRow = (rowData, index, isHeader, isDanisman) => {
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
            {isHeader ? "BAYİ KODU" : rowData.Code}
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
            {isHeader ? "BAYİ ADI" : rowData.Name}
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
            {isHeader ? "BÖLGE" : rowData.Area}
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
            {isHeader ? "YILDIZ KARNE GRUBU" : rowData.TympGroup}
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
            {isHeader ? "GRUP" : rowData.Group}
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
            {isHeader ? "HEDEF %" : rowData.Target}
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
            {isHeader ? "ALT LİMİT %" : rowData.Limit}
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
            {isHeader ? "ÜST LİMİT %" : rowData.TopLimit}
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
            {isHeader ? "ASD ADET" : rowData.AsdQuantity}
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
            {isHeader ? "PROMOSYON ADET" : rowData.PromotionQuantity}
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
            {isHeader ? "OWV" : rowData.StoreQuantity}
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
            {isHeader ? "YEMEK ADET" : rowData.FoodQuantity}
          </Text>
        </View>
      </View>
    );
  };
  renderRow = (rowData, index, isHeader, isDanisman) => {
    return (
      <View
        key={"Rr " + index}
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
            width: 170,
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
            {isHeader ? "ADI" : rowData.Name}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 90,
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
            {isHeader ? "HEDEF" : rowData.Target}
          </Text>
        </View>

        <View
          style={{
            height: "100%",
            width: 90,
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
            {isHeader ? "ALT LİMİT" : rowData.Limit}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 90,
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
            {isHeader ? "ÜST LİMİT" : rowData.TopLimit}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 90,
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
            {isHeader ? "TİP" : rowData.Type}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 70,
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
      </View>
    );
  };
  render() {
    const data = this.props.data;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{this.props.type} Parametreleri</Text>
        </View>
        <ScrollView horizontal={true}>
          <View style={{ marginTop: screenHeight * 0.04 }}>
            {this.props.type === "Bayi" && this.renderBayiRow(null, null, true)}
            {this.props.type !== "Bayi" && this.renderRow(null, null, true)}
            {data.map((rowData, indexX) => {
              if (this.props.type === "Bayi")
                return this.renderBayiRow(rowData, indexX, false);
              else return this.renderRow(rowData, indexX, false);
            })}
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#473e54",
  }, rowText: {
    width: "100%",
    textAlign: "center",
    fontSize: normalize(12),
    color: "#657077",
  },
  headerText: {
    fontSize: normalize(20),
    color: "white",
    fontWeight: "bold",
  },
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
