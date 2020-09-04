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
  TextInput
} from "react-native";
import DatePicker from "react-native-datepicker";

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import MusteriBazliTableComponent from "./MusteriBazliTableComponent"
import { getCustomerList } from "../../Api/Login";
import { normalize } from "../../HelperFunctions";
import { searchCustomer, getListInvoice, setCustomerNotes, sendCustomerNotes } from "../../Api/MusteriApi";
const screenHeight = Dimensions.get("window").height;

export default class MusteriBazliComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCode: "",
      selectedAnalyzeFilters: {},
      keyboardShown: false,
      data: [],
      searchingName: "",
      searchingCode: "",
      startDate: "",
      endDate: "",
      filters: { analyze: "", definition: "", typeCode: "" },
      dropDownData: this.prepareData(),
      note: ''
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
  faturaRef = React.createRef();
  bayiKoduRef = React.createRef();
  parcaKodRef = React.createRef();
  miktarRef = React.createRef();
  bayiAdiRef = React.createRef();
  asdRef = React.createRef();

  prepareData = () => {

    let analyze = []
    let definition = []
    let typeCode = []
    if (global.analyzeCode && global.analyzeCode.length > 0) {
      for (let a = 0; a < global.analyzeCode.length; a++) {
        analyze.push({
          value: global.analyzeCode[a].Name,
        })
      }
    }
    else {
      analyze.push({
        value: "",
      })
    }
    if (global.definition && global.definition.length > 0) {
      for (let a = 0; a < global.definition.length; a++) {
        definition.push({
          value: global.definition[a].Name,
        })
      }
    }
    else {
      definition.push({
        value: "",
      })
    }
    if (global.typeCode && global.typeCode.length > 0) {
      for (let a = 0; a < global.typeCode.length; a++) {
        typeCode.push({
          value: global.typeCode[a].Name,
        })
      }
    }
    else {
      typeCode.push({
        value: "",
      })
    }
    return { analyzeData: analyze, definition: definition, typeCode: typeCode }

  }
  onTextEdit = (text, isUsername) => {
    this.props.setCustomerNull()
    if (isUsername === true) {
      this.setState({ searchingName: text, data: null, tableData: null });
    } else {
      this.setState({ searchingCode: text, data: null, tableData: null });
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
          value={this.state.dropDownData.analyzeData[0].Value}
          data={this.state.dropDownData.analyzeData}
          onChangeText={(value, index, data) => {
            let flters = this.state.filters;
            flters.analyze = "" + value;
            this.setState({ filters: flters });
          }}
        />
        <Dropdown
          containerStyle={{ width: "90%", flex: 1, alignSelf: "center" }}
          label="TANIM KODU"
          value={this.state.dropDownData.definition[0].Value}
          data={this.state.dropDownData.definition}
          onChangeText={(value, index, data) => {
            let flters = this.state.filters;
            flters.definition = "" + value;
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

          onSubmitEditing={this.onSubmit}
          ref={this.bayiKoduRef}
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

            ref={this.faturaRef}
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
            ref={this.miktarRef}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <DatePicker
            style={{ width: "40%" }}
            date={this.state.startDate}
            mode="date"
            placeholder="BAŞLANGIÇ"
            format="YYYY-MM-DD"

            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={
              {
                // ... You can check the source to find the other keys.
              }
            }
            onDateChange={(date) => {
              this.setState({ startDate: date });
            }}
          />
          <DatePicker
            style={{ width: "40%" }}
            date={this.state.endDate}
            mode="date"
            placeholder="BİTİŞ"
            format="YYYY-MM-DD"

            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={
              {
                // ... You can check the source to find the other keys.
              }
            }
            onDateChange={(date) => {
              this.setState({ endDate: date });
            }}
          />
        </View>
        <Dropdown
          containerStyle={{ width: "90%", flex: 1, alignSelf: "center" }}
          label="MAMÜL TİPİ"
          value={this.state.dropDownData.typeCode[0].Value}
          data={this.state.dropDownData.typeCode}
          onChangeText={(value, index, data) => {
            let flters = this.state.filters;
            flters.typeCode = "" + value;
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
          ref={this.bayiAdiRef}

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
            ref={this.parcaKodRef}

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
            ref={this.asdRef}

          />
        </View>
        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", alignSelf: "center", width: "80%", height: screenHeight * 0.07, backgroundColor: "#74b566" }}
          onPress={
            () => {
              let { current: field } = this.faturaRef;

              let filters = {
                DateStart: this.state.startDate,
                DateEnd: this.state.endDate,
                DealerCode: "" + this.bayiKoduRef.current.value(),
                FactorNOSearch: "" + this.faturaRef.current.value(),
                AmountSearch: "" + this.miktarRef.current.value(),
                DealerName: "" + this.bayiAdiRef.current.value(),
                ProductCodeSearch: "" + this.parcaKodRef.current.value(),
                ASDSearch: "" + this.asdRef.current.value(),
                SelectedAnalize: this.state.filters.analyze,
                SelectedDefinition: this.state.filters.definition,
                SelectedType: this.state.filters.typeCode,
                CustomerCode: this.props.selectedCustomer.CustomerCode,
                RowFrom: "0",
                RowTo: "10"
              }
              getListInvoice(filters).then(datta => {
                console.log("dd:", datta)
                this.setState({ tableData: datta })
              })
            }
          }><Text style={{ fontSize: normalize(18), color: "white" }}>ARAMA YAP</Text></TouchableOpacity>
      </View>
    );
  };

  renderDetail = () => {

    let peopleContact = this.props.selectedCustomer && this.props.selectedCustomer.MemberList
      && this.props.selectedCustomer.MemberList.length > 0 ? this.props.selectedCustomer.MemberList[0] : null
    console.log(this.props.customerNote)
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
          value={peopleContact ? peopleContact.BirthDate.split("T")[0] : ""}
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
          value={peopleContact ? peopleContact.Name + " " + peopleContact.Surname : ""}
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
          value={peopleContact ? peopleContact.BirthDate.split("T")[0] : ""}
          editable={false}
          label="İletişim Kurulacak Kişi Doğum Tarihi"
          baseColor="#69747a"
          keyboardType="default"
          tintColor="red"
          formatText={(text) => this.onTextEdit(text, false)}
          onSubmitEditing={this.onSubmit}
          ref={this.pwRef}
        />
        <Text style={styles.headerText}> Müşteri Notu </Text>
        <TextInput
          style={{ borderColor: '#444', borderWidth: 1, paddingHorizontal: 5, borderRadius: 5 }}
          onChangeText={this.props.onChangeNote}
          value={this.props.customerNote}
          placeholder='Müşteri Notu'
          multiline
        />
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", alignSelf: "center", width: "45%", height: screenHeight * 0.05, backgroundColor: "#74b566", marginVertical: 5 }}
            onPress={
              () => {
                setCustomerNotes(this.props.selectedCustomer.CustomerId, this.props.customerNote).then(data => {
                  console.log("dd:", data)
                })
              }
            }><Text style={{ fontSize: normalize(18), color: "white" }}>Notu Kaydet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", alignSelf: "center", width: "45%", height: screenHeight * 0.05, backgroundColor: "#74b566", marginVertical: 5 }}
            onPress={
              () => {
                sendCustomerNotes(this.props.selectedCustomer.Email, this.props.customerNote).then(data => {
                  console.log("dd:", data)
                })
              }
            }><Text style={{ fontSize: normalize(18), color: "white" }}>Notu Mail At</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerText}> Müşteriye Satışlar </Text>
        {this.renderSatislar()}


      </View>
    );
  };

  renderDetails = () => {

  }
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
                this.state.keyboardShown || (this.state.data && this.state.data.length > 0)
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
                this.state.keyboardShown || (this.state.data && this.state.data.length > 0)
                  ? screenHeight * 0.1
                  : screenHeight * 0.05,
            }}
          ></View>

          {this.props.selectedCustomer !== null && this.renderDetail()}
          {this.props.selectedCustomer === null && this.state.data &&
            this.state.data.map((element, index) => {
              return this.renderRow(element, index);
            })}
          {this.state.tableData && <MusteriBazliTableComponent
            performanceData={this.state.tableData} />}
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
