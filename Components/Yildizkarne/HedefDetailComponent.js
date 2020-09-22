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
import Tabs from "react-native-tabs";
import PuanDurumuComponent from "./PuanDurumuComponent";
import { normalize } from "../../HelperFunctions";
import TypmDetayComponent from "./TypmDetayComponent";
import AsdDetayComponent from "./AsdDetayComponent";
import BayiHedefComponent from "./hedef/BayiHedefComponent";
import { getHedefDetail } from "../../Api/YildizKarneApi";
import DanismanHedefComponent from "./hedef/DanismanHedefComponent";

export default class HedefDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHedef: null,
    };
  }

  renderHedef = (hedef, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          marginTop: 50,
          height: 50,
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View style={{ height: "100%" }}>
          <Text style={styles.text}>{hedef.Name}</Text>
          <Text
            style={[
              styles.text,
              {
                fontSize: normalize(13),
                color: hedef.IsActive === true ? "green" : "red",
              },
            ]}
          >
            {hedef.IsActive === true ? "  aktif" : "  pasif"}
          </Text>
        </View>
        <TouchableOpacity
          style={{ height: "100%" }}
          onPress={() => {
            getHedefDetail(hedef.Id).then((data) => {
              this.setState({ selectedHedef: data, hedefDetail: hedef });
            });
          }}
        >
          <Text style={styles.text}> GÖSTER</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderHedefList = () => {
    return (
      <View>
        {this.props.hedefler.map((rowData, index) => {
          return this.renderHedef(rowData, index);
        })}
      </View>
    );
  };
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.state.selectedHedef === null && this.renderHedefList()}
        {this.state.selectedHedef !== null && this.props.type === "bayi" && (
          <BayiHedefComponent
            data={this.state.selectedHedef}
            detail={this.state.hedefDetail}
            close={() => {
              this.setState({ selectedHedef: null });
            }}
          />
        )}
        {this.state.selectedHedef !== null && this.props.type === "danisman" && (
          <DanismanHedefComponent
            data={this.state.selectedHedef}
            detail={this.state.hedefDetail}
            close={() => {
              this.setState({ selectedHedef: null });
            }}
          />
        )}
      </ScrollView>
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
  text: {
    fontSize: normalize(16),
    color: "#473e54",
    padding: 5,
    fontWeight: 'bold',
  },
});
