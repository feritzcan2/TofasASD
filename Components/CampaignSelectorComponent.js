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
import { getBayiList } from "../Api/GeneralPerformance";

export default class CampaignSelectorComponent extends React.Component {
  constructor(props) {
    super(props);
    let kampanyalar = [];
    for (let a = 0; a < props.campaigns.length; a++) {
      kampanyalar.push({
        value: props.campaigns[a],
      });
    }
    this.state = {
      selectedCampaign: props.selectedCampaign,
      campaigns: kampanyalar,
    };
  }

  render() {
    return (
      <Modal
        transparent
        animationType={"fade"}
        visible={this.props.visible}
        onRequestClose={() => function () {}}
      >
        <View
          style={[
            styles.modalBackground,
            { backgroundColor: `rgba(0,0,0,${0.8})` },
          ]}
        >
          <View style={styles.contentContainer}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>KAMPANYA BİLGİLERİ</Text>
            </View>
            <Text style={styles.text}>
              {this.state.selectedCampaign.Header}
            </Text>
            <View style={styles.smallSeperator} />

            <View style={styles.doubleTextContainer}>
              <Text style={styles.textBold}>Kampanya Kodu {"  "}</Text>
              <Text style={styles.text}>
                {this.state.selectedCampaign.Code}
              </Text>
            </View>
            <View style={styles.smallSeperator} />
            <Text style={styles.textBold}>Kampanya Ana Koşulu</Text>
            <Text style={styles.text}>
              ASD kendi satış hedefini asgari 100 % gerçekleştirilmiş olmalıdır.
            </Text>
            <View style={styles.smallSeperator} />

            <Text style={styles.textBold}>Kampanya Tarihi</Text>
            <Text style={styles.text}>01/03/2019 - 31/03/2019</Text>
            <View style={styles.smallSeperator} />

            <View style={styles.seperator}></View>
            <Dropdown
              containerStyle={{ width: "90%", alignSelf: "center" }}
              label="KAMPANYALAR"
              value={this.state.selectedCampaign.Header}
              valueExtractor={(item, index) => {
                return this.state.campaigns[index].value.Header;
              }}
              data={this.state.campaigns}
              onChangeText={(value, index, data) => {
                this.setState({
                  selectedCampaign: this.state.campaigns[index].value,
                });
              }}
            />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.props.changeCampaign(this.state.selectedCampaign)
                }
                style={{
                  backgroundColor: "#473e54",
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.headerText}>TAMAM</Text>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#473e54",
  },
  doubleTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: normalize(20),
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: normalize(16),
    color: "#473e54",
    padding: 5,
  },
  textBold: {
    fontSize: normalize(15),
    color: "#473e54",
    padding: 5,
    fontWeight: "bold",
    alignSelf: "center",
  },
  seperator: {
    marginTop: 20,
    width: "100%",
    height: 2.5,
    backgroundColor: "#473e54",
  },
  smallSeperator: {
    width: "80%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "#473e54",
  },
});
