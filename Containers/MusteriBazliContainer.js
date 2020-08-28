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

import MusteriBazliComponent from "../Components/MusteriBazli/MusteriBazliComponent";
import { getCustomer, getCustomerNotes, getWarehouse, getAnalizeCode } from "../Api/MusteriApi";
import { getYildizPuanDetail } from "../Api/YildizKarneApi";

export default class MusteriBazliContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedCustomer: null, customerId: null };
  }

  setCustomerNull = () => {
    this.setState({ selectedCustomer: null })
  }

  selectCustomer = (customer) => {
    if (this.state.inProgress === true) return;
    this.setState({ inProgress: true });
    getCustomer(customer.Id)
      .then((d) => {
        this.setState({
          inProgress: false,
          selectedCustomer: d,
          customerId: customer.Id,
        });
      })
      .catch((e) => {
        this.setState({ inProgress: false });
      });

    getCustomerNotes(customer.Id)
      .then((d) => {
        this.setState({
          customerNote: d,
        });
      }
      )
      .catch((e) => console.log(e));
    getWarehouse(customer.Id)
      .then((d) => console.log("ware", d))
      .catch((e) => console.log(e));
    getAnalizeCode(customer.Id)
  };

  render() {
    return (
      <MusteriBazliComponent
        setCustomerNull={this.setCustomerNull}
        selectedCustomer={this.state.selectedCustomer}
        selectCustomer={this.selectCustomer}
        customerNote={this.state.customerNote}
        data={this.props.data}
      />
    );
  }
}
