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


export default class BestThreeComponent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let first = this.props.data[0]
        let second = this.props.data[1]
        let third = this.props.data[2]
        console.log(third)
        return <View style={{ flexDirection: "row", height: screenHeight * 0.3, marginRight: "3%", marginLeft: "3%", marginBottom: "3%" }}>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ height: "5%" }}></View>
                <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                    <View style={{ flex: 1.7, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 1, justifyContent: "center" }}><Image
                            source={require("../../assets/second.png")}
                            style={{ flex: 1, height: "100%", aspectRatio: 1 }}
                            resizeMode="stretch"
                        /></View>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "#616c72", fontWeight: "500", fontSize: normalize(14) }}>
                            {second.WeightPoint.toFixed(2)} Puan</Text></View>

                </View>
                <View style={{
                    flex: 1, justifyContent: "space-between", backgroundColor: "#dddddd"
                    , borderWidth: "4%", borderColor: "#bdbdbd", borderLeftWidth: 0
                }}>
                    <View style={{
                        flex: 1, alignItems: "center", justifyContent: "center"
                        , borderBottomWidth: "2%", borderColor: "#bdbdbd"
                    }}><Text
                        style={{ color: "#bdbdbd", fontSize: normalize(30), fontWeight: "bold" }}>2</Text></View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><Text
                        style={{ color: "#353535", fontSize: normalize(12), fontWeight: "600" }}>{second.Name}</Text></View>
                </View>
            </View>
            <View style={{
                flex: 1, flexDirection: "column"
                , borderBottomWidth: "4%", borderColor: "#bdbdbd"
            }}>
                <View style={{
                    flex: 1, borderBottomWidth: "4%", borderColor: "#bdbdbd", justifyContent: "space-evenly"
                }}>
                    <View style={{ flex: 1.3, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 1, justifyContent: "center" }}><Image
                            source={require("../../assets/first.png")}
                            style={{ flex: 1, height: "100%", aspectRatio: 1 }}
                            resizeMode="stretch"
                        /></View>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "#616c72", fontWeight: "500", fontSize: normalize(14) }}>
                            {first.WeightPoint.toFixed(2)} Puan</Text>
                    </View>

                </View>
                <View style={{ flex: 1.5, backgroundColor: "#dddddd", justifyContent: "space-between" }}>
                    <View style={{
                        flex: 1, alignItems: "center", justifyContent: "center",
                        borderBottomWidth: "2%", borderColor: "#bdbdbd"
                    }}><Text
                        style={{ color: "#c69d69", fontSize: normalize(30), fontWeight: "bold" }}>1</Text></View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><Text
                        style={{ color: "#353535", fontSize: normalize(12), fontWeight: "600" }}>{first.Name}</Text></View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                    <View style={{ flex: 1.3, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 0.65, justifyContent: "center" }}><Image
                            source={require("../../assets/third.png")}
                            style={{ flex: 1, height: "100%", aspectRatio: 1 }}
                            resizeMode="stretch"
                        /></View>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "#616c72", fontWeight: "500", fontSize: normalize(14) }}>
                            {third.WeightPoint.toFixed(2)} Puan</Text>
                    </View>

                </View>
                <View style={{
                    flex: 0.75, backgroundColor: "#dddddd", justifyContent: "space-evenly"
                    , borderWidth: "4%", borderColor: "#bdbdbd", borderRightWidth: 0
                }}>
                    <View style={{
                        flex: 1, alignItems: "center", justifyContent: "center"
                        , borderBottomWidth: "2%", borderColor: "#bdbdbd"
                    }}>
                        <Text
                            style={{ color: "#7f4627", fontSize: normalize(30), fontWeight: "bold" }}>3</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><Text
                        style={{ color: "#353535", fontSize: normalize(12), fontWeight: "600" }}>{third.Name}</Text></View>
                </View>
            </View>
        </View>
    }
}