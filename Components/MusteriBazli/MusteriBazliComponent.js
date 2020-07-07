import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import DatePicker from "react-native-datepicker";

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";

import { getCustomerList } from "../../Api/Login";
import { normalize } from "../../HelperFunctions";
import { searchCustomer } from "../../Api/MusteriApi";
const screenHeight = Dimensions.get("window").height;

export default class MusteriBazliComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCode: "",
      keyboardShown: false,
      data: [],
      searchingName: "",
      searchingCode: "",
    };
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }
  pwRef = React.createRef();

  onTextEdit = (text, isUsername) => {
    if (isUsername === true) {
      this.setState({ searchingName: text });
    } else {
      this.setState({ searchingCode: text });
    }
    let name = isUsername === true ? text : this.state.searchingName;
    let code = isUsername === false ? text : this.state.searchingCode;
    searchCustomer(name, code)
      .then((data) => {
        this.setState({ data: data });
      })
      .catch((e) => {
        console.log(e);
      });
    return text;
  };

  _keyboardDidShow = (e) => {
    if (this.state.keyboardShown === false)
      this.setState({
        keyboardShown: true,
      });
  };

  _keyboardDidHide = (e) => {
    if (this.state.keyboardShown === true)
      this.setState({
        keyboardShown: false,
      });
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  renderRow = (element, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.customerContainer}
        onPress={() => {
          this.props.selectCustomer(element);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={[styles.headerText]}>İsim</Text>
          <Text style={[styles.nameText]}>{element.Name}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={[styles.headerText]}>Kod</Text>
          <Text style={[styles.nameText]}>{element.Code}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderSatislar = () => {
    return (
      <View>
        <Dropdown
          containerStyle={{ width: "90%", flex: 1, alignSelf: "center" }}
          label="ANALİZ KODU"
          value="tesstt"
          data={[]}
          onChangeText={(value, index, data) => {
            let flters = this.state.filters;
            flters.region = index;
            this.setState({ filters: flters });
          }}
        />
        <Dropdown
          containerStyle={{ width: "90%", flex: 1, alignSelf: "center" }}
          label="TANIM KODU"
          value="tesstt"
          data={[]}
          onChangeText={(value, index, data) => {
            let flters = this.state.filters;
            flters.region = index;
            this.setState({ filters: flters });
          }}
        />
        <OutlinedTextField
          containerStyle={{
            width: "90%",
            alignSelf: "center",
            marginTop: screenHeight * 0.03,
          }}
          label="Bayi kodu giriniz"
          keyboardType="default"
          tintColor="red"
          formatText={(text) => this.onTextEdit(text, false)}
          onSubmitEditing={this.onSubmit}
          ref={this.pwRef}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <OutlinedTextField
            containerStyle={{
              width: "40%",
              alignSelf: "center",
              marginTop: screenHeight * 0.01,
            }}
            label="FATURA NO"
            keyboardType="default"
            tintColor="red"
            formatText={(text) => this.onTextEdit(text, false)}
            onSubmitEditing={this.onSubmit}
            ref={this.pwRef}
          />
          <OutlinedTextField
            containerStyle={{
              width: "40%",
              alignSelf: "center",
              marginTop: screenHeight * 0.01,
            }}
            label="MİKTAR"
            keyboardType="default"
            tintColor="red"
            formatText={(text) => this.onTextEdit(text, false)}
            onSubmitEditing={this.onSubmit}
            ref={this.pwRef}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <DatePicker
            style={{ width: "40%" }}
            date={this.state.date}
            mode="date"
            placeholder="BAŞLANGIÇ"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={
              {
                // ... You can check the source to find the other keys.
              }
            }
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
          />
          <DatePicker
            style={{ width: "40%" }}
            date={this.state.date}
            mode="date"
            placeholder="BİTİŞ"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={
              {
                // ... You can check the source to find the other keys.
              }
            }
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
          />
        </View>
        <Dropdown
          containerStyle={{ width: "90%", flex: 1, alignSelf: "center" }}
          label="MAMÜL TİPİ"
          value="tesstt"
          data={[]}
          onChangeText={(value, index, data) => {
            let flters = this.state.filters;
            flters.region = index;
            this.setState({ filters: flters });
          }}
        />
        <OutlinedTextField
          containerStyle={{
            width: "90%",
            alignSelf: "center",
            marginTop: screenHeight * 0.03,
          }}
          label="BAYİ ADI"
          keyboardType="default"
          tintColor="red"
          formatText={(text) => this.onTextEdit(text, false)}
          onSubmitEditing={this.onSubmit}
          ref={this.pwRef}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <OutlinedTextField
            containerStyle={{
              width: "40%",
              alignSelf: "center",
              marginTop: screenHeight * 0.01,
            }}
            label="PARÇA KODU"
            keyboardType="default"
            tintColor="red"
            formatText={(text) => this.onTextEdit(text, false)}
            onSubmitEditing={this.onSubmit}
            ref={this.pwRef}
          />
          <OutlinedTextField
            containerStyle={{
              width: "40%",
              alignSelf: "center",
              marginTop: screenHeight * 0.01,
            }}
            label="ASD"
            keyboardType="default"
            tintColor="red"
            formatText={(text) => this.onTextEdit(text, false)}
            onSubmitEditing={this.onSubmit}
            ref={this.pwRef}
          />
        </View>
      </View>
    );
  };

  renderDetail = () => {
    return (
      <View>
        <Text style={styles.headerText}> Müşteri Bilgileri </Text>

        <OutlinedTextField
          containerStyle={{
            width: "100%",
            alignSelf: "center",
            marginTop: screenHeight * 0.03,
          }}
          inputContainerStyle={{}}
          value={
            this.props.selectedCustomer.AuthorizedPersonName +
            " " +
            this.props.selectedCustomer.AuthorizedPersonSurname
          }
          editable={false}
          label="Firma Sahibi Ad Soyad"
          baseColor="#69747a"
          keyboardType="default"
          tintColor="red"
          formatText={(text) => this.onTextEdit(text, false)}
          onSubmitEditing={this.onSubmit}
          ref={this.pwRef}
        />
        <OutlinedTextField
          containerStyle={{
            width: "100%",
            alignSelf: "center",
            marginTop: screenHeight * 0.03,
          }}
          value="fsda"
          editable={false}
          label="Firma Sahibi Doğum Tarihi"
          baseColor="#69747a"
          keyboardType="default"
          tintColor="red"
          formatText={(text) => this.onTextEdit(text, false)}
          onSubmitEditing={this.onSubmit}
          ref={this.pwRef}
        />
        <OutlinedTextField
          containerStyle={{
            width: "100%",
            alignSelf: "center",
            marginTop: screenHeight * 0.03,
          }}
          value="fsda"
          editable={false}
          label="İletişim Kurulacak Kişi Ad Soyad"
          baseColor="#69747a"
          keyboardType="default"
          tintColor="red"
          formatText={(text) => this.onTextEdit(text, false)}
          onSubmitEditing={this.onSubmit}
          ref={this.pwRef}
        />
        <OutlinedTextField
          containerStyle={{
            width: "100%",
            alignSelf: "center",
            marginTop: screenHeight * 0.03,
          }}
          value="fsda"
          editable={false}
          label="İletişim Kurulacak Kişi Doğum Tarihi"
          baseColor="#69747a"
          keyboardType="default"
          tintColor="red"
          formatText={(text) => this.onTextEdit(text, false)}
          onSubmitEditing={this.onSubmit}
          ref={this.pwRef}
        />

        <Text style={styles.headerText}> Müşteriye Satışlar </Text>
        {this.renderSatislar()}
      </View>
    );
  };
  render() {
    const { } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView
          style={{
            width: "90%",
            alignSelf: "center",
            height: "90%",
          }}
        >
          <View style={{ height: screenHeight * 0.1 }}></View>
          <Text style={styles.headerText}> Müşteri Ara </Text>
          <View
            style={{
              height:
                this.state.keyboardShown || this.state.data.length > 0
                  ? screenHeight * 0.1
                  : screenHeight * 0.05,
            }}
          ></View>
          <OutlinedTextField
            containerStyle={{
              width: "80%",
              alignSelf: "center",
            }}
            label="Müşteri adı"
            keyboardType="default"
            tintColor="red"
            formatText={(text) => this.onTextEdit(text, true)}
            onSubmitEditing={this.onSubmit}
            ref={this.pwRef}
          />
          <OutlinedTextField
            containerStyle={{
              width: "80%",
              alignSelf: "center",
              marginTop: screenHeight * 0.03,
            }}
            label="Müşteri kodu"
            keyboardType="default"
            tintColor="red"
            formatText={(text) => this.onTextEdit(text, false)}
            onSubmitEditing={this.onSubmit}
            ref={this.pwRef}
          />
          <View
            style={{
              height:
                this.state.keyboardShown || this.state.data.length > 0
                  ? screenHeight * 0.1
                  : screenHeight * 0.05,
            }}
          ></View>

          {this.props.selectedCustomer !== null && this.renderDetail()}
          {this.props.selectedCustomer === null &&
            this.state.data.map((element, index) => {
              return this.renderRow(element, index);
            })}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "100%",
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: normalize(18),
    color: "#DC143C",
  },
  nameText: {
    textAlign: "center",
    fontSize: normalize(14),
    color: "#161616",
  },
  customerContainer: {
    borderBottomColor: "#DC143C",
    borderBottomWidth: 0.4,
    borderRadius: 15,
    marginBottom: screenHeight * 0.05,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    minHeight: screenHeight * 0.1,
    display: "flex",
    flexDirection: "row",
  },
  backContainer: {
    position: "absolute",
    width: "10%",
    aspectRatio: 1,
    top: "5%",
    right: "5%",
  },
  addButtonText: {
    fontWeight: "bold",
    fontSize: normalize(19),
    color: "white",
  },

  registerText: {
    fontWeight: "bold",
    fontSize: normalize(19),
    color: "#DC143C",
  },
  registerLabelText: {
    marginBottom: "5%",
    fontSize: normalize(18),
    color: "#1616",
  },

  topBar: {
    marginTop: "5%",
    alignItems: "center",
    flexDirection: "row",
    height: "10%",
    width: "100%",
    backgroundColor: "#DC143C",
  },
  productImageContainer: {
    marginTop: "15%",
    height: "12%",
    minHeight: "12%",
    aspectRatio: 4,
    maxWidth: "80%",
    alignSelf: "center",
  },

  addButtonContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: "7%",
    borderRadius: 5,
    backgroundColor: "#DC143C",
  },
  registerContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: "7%",
    borderRadius: 5,
  },
});
