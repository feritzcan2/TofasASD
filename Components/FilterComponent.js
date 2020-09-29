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
import { normalize } from "../HelperFunctions";
import { Dropdown } from "react-native-material-dropdown";
import { getBayiList, getRegions } from "../Api/GeneralPerformance";

export default class FilterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.createData();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.selectedFilters !== nextProps.selectedFilters)
      this.setState({ filters: { ...nextProps.selectedFilters } });
    return true;
  }

  createData = () => {
    let yilData = [];
    for (let yil = 2018; yil <= new Date().getFullYear(); yil++) {
      yilData.push({
        value: yil,
      });
    }
    let bayiler = [
      {
        value: "TÜM BAYİLER",
      },
    ];
    let bolgeler = [
    ];
    if (global.bayiler) {
      for (let a = 0; a < global.bayiler.length; a++) {
        if (global.bayiler[a].ShortName != '' && !global.bayiler[a].Deleted) {
          bayiler.push({
            value: global.bayiler[a],
          });
        }

      }
    } else {
      getBayiList().then((e) => {
        this.setState(this.createData())
        return;
      });
      return { notReady: true };
    }
    if (global.regions) {
      for (let a = 0; a < global.regions.length; a++) {
        bolgeler.push({
          value: global.regions[a].Text,
        });
      }
    } else {

      getRegions().then((e) => {
        this.setState(this.createData())
        return;
      });
      return { notReady: true };
    }

    return {
      notReady: false,
      filters: { ...this.props.selectedFilters },
      bolgeData: bolgeler,
      bayiData: bayiler,
      yilData: yilData,
      donemData: [
        ,
        {
          value: "AYLIK",
        },
        {
          value: "ÇEYREK",
        },
        {
          value: "YILLIK",
        }, {
          value: "AY YTD",
        }
      ],
      quarterData: [
        {
          value: "1. Çeyrek",
        },
        {
          value: "2. Çeyrek",
        },
        {
          value: "3. Çeyrek",
        },
        {
          value: "4. Çeyrek",
        },
      ],
      ayData: [
        {
          value: "OCAK",
        },
        {
          value: "ŞUBAT",
        },
        {
          value: "MART",
        },
        {
          value: "NİSAN",
        },
        {
          value: "MAYIS",
        },
        {
          value: "HAZİRAN",
        },
        {
          value: "TEMMUZ",
        },
        {
          value: "AĞUSTOS",
        },
        {
          value: "EYLÜL",
        },
        {
          value: "EKİM",
        },
        {
          value: "KASIM",
        },
        {
          value: "ARALIK",
        },
      ],
      hedefData: [
        {
          value: "HEPSİ",
        },
        {
          value: "Perakende",
        },
        {
          value: "Sigorta",
        },
        {
          value: "Yetkili Servis",
        },
      ],
    };
  };
  render() {
    if (this.state.notReady === true) return <View></View>
    return (
      <Modal
        transparent
        animationType={"fade"}
        visible={this.props.filterVisible}
        onRequestClose={() => function () { }}
      >
        <View
          style={[
            styles.modalBackground,
            { backgroundColor: `rgba(0,0,0,${0.8})` },
          ]}
        >
          <View style={styles.contentContainer}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>FİLTRELER</Text>
            </View>
            <Dropdown
              containerStyle={{ width: "90%", alignSelf: "center" }}
              label="BÖLGELER"
              value={this.state.bolgeData[this.state.filters.region].value}
              data={this.state.bolgeData}
              onChangeText={(value, index, data) => {
                let flters = this.state.filters;
                flters.region = index;
                this.setState({ filters: flters });
              }}
            />
            <Dropdown
              containerStyle={{ width: "90%", alignSelf: "center" }}
              label="BAYİLER"
              value={
                this.state.filters.dealerName
                  ? this.state.filters.dealerName
                  : this.state.bayiData[0].value
              }
              valueExtractor={(item, index) => {
                if (index === 0) return "TÜM BAYİLER";
                return this.state.bayiData[index].value.ShortName != '' ? this.state.bayiData[index].value.ShortName : this.state.bayiData[index].value.Name;
              }}
              data={this.state.bayiData}
              onChangeText={(value, index, data) => {
                let code = "";
                if (index !== 0) {
                  code = this.state.bayiData[index].value.Code;
                }
                let flters = this.state.filters;
                flters.dealerCode = code;
                if (index === 0) flters.dealerName = "TÜM BAYİLER";
                else
                  flters.dealerName = this.state.bayiData[
                    index
                  ].value.ShortName;
                this.setState({ filters: flters });
              }}
            />
            <Dropdown
              containerStyle={{ width: "90%", alignSelf: "center" }}
              label="YIL"
              value={this.state.filters.year}
              data={this.state.yilData}
              onChangeText={(value, index, data) => {
                let flters = this.state.filters;
                flters.year = value;
                this.setState({ filters: flters });
              }}
            />
            <Dropdown
              containerStyle={{ width: "90%", alignSelf: "center" }}
              label="DÖNEM"
              value={this.state.donemData[this.state.filters.donemTuru].value}
              data={this.state.donemData}
              onChangeText={(value, index, data) => {
                let flters = this.state.filters;
                flters.donemTuru = index;
                this.setState({ filters: flters });
              }}
            />
            {this.state.filters.donemTuru == 2 ? <Dropdown
              containerStyle={{ width: "90%", alignSelf: "center" }}
              label="ÇEYREK"
              value={this.state.quarterData[this.state.filters.quarter - 1].value}
              data={this.state.quarterData}
              onChangeText={(value, index, data) => {
                let flters = this.state.filters;
                flters.quarter = index + 1;
                this.setState({ filters: flters });
              }}
            /> : null}
            {(this.state.filters.donemTuru !== 3 && this.state.filters.donemTuru !== 2) ? <Dropdown
              containerStyle={{ width: "90%", alignSelf: "center" }}
              label="AY"
              value={this.state.ayData[this.state.filters.month].value}
              onChangeText={(value, index, data) => {
                let flters = this.state.filters;
                flters.month = index;
                this.setState({ filters: flters });
              }}
              data={this.state.ayData}
            /> : null}
            <Dropdown
              containerStyle={{ width: "90%", alignSelf: "center" }}
              label="HEDEFE TABİ SATIŞ"
              value={this.state.hedefData[this.state.filters.hedefTuru].value}
              onChangeText={(value, index, data) => {
                let flters = this.state.filters;
                flters.hedefTuru = index;
                this.setState({ filters: flters });
              }}
              data={this.state.hedefData}
            />
            <View
              style={{
                width: "100%",
                height: "7%",
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ filters: { ...this.props.selectedFilters } });
                  this.props.closeFilter();
                }}
                style={{
                  height: "100%",
                  backgroundColor: "red",
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.headerText}>İPTAL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.apply(this.state.filters);
                  this.props.closeFilter();
                }}
                style={{
                  height: "100%",
                  backgroundColor: "red",
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.headerText}>UYGULA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    alignSelf: "center",
    width: "40%",
    aspectRatio: 1,
  },
  contentContainer: { width: "70%", backgroundColor: "#F5FCFF" },

  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#473e54",
  },
  headerText: {
    fontSize: normalize(20),
    color: "white",
    fontWeight: "bold",
  },
});
