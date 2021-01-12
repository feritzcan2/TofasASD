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
const screenWidth = Dimensions.get("screen").width;
import ConfettiCannon from 'react-native-confetti-cannon';

export default class BestThreeComponent extends React.Component {
    constructor(props) {
        super(props);

    }

    renderFirst=(first)=>{
        var names = ""
        for(let a=0;a<first.length;a++){
            names+=first[a].Name+"\n"
        }
        return  <View style={{
            flex: 1, flexDirection: "column"
            , borderBottomWidth: 4, borderColor: "#bdbdbd"
        }}>

            <View style={{
                flex: 1, borderBottomWidth: 4, borderColor: "#bdbdbd", justifyContent: "space-evenly"
            }}>
                <View style={{ flex: 1.3, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flex: 1, justifyContent: "center" }}><Image
                        source={require("../../assets/first.png")}
                        style={{ flex: 1, height: "100%", aspectRatio: 1 }}
                        resizeMode="stretch"
                    /></View>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "#616c72", fontWeight: 'bold', fontSize: normalize(14) }}>
                        {first[0].WeightPoint.toFixed(2)} Puan</Text>
                </View>

            </View>

            <View style={{ flex: 1.5, backgroundColor: "#dddddd", justifyContent: "space-between" }}>
                <View style={{
                    flex: 1, alignItems: "center", justifyContent: "center",
                    borderBottomWidth: 2, borderColor: "#bdbdbd"
                }}>

                    <Text
                        style={{ color: "#c69d69", fontSize: normalize(30), fontWeight: "bold" }}>1</Text></View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                  <ScrollView nestedScrollEnabled = {true}>

                  <Text
                        style={{ color: "#353535", fontSize: normalize(12), fontWeight: 'bold' }}>{names}</Text>
                  </ScrollView>

                </View>
            </View>

        </View>
      
    }
    renderSecond=(second)=>{
        var names = ""
        for(let a=0;a<second.length;a++){
            names+=second[a].Name+"\n"
        }
        return <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ height: "5%" }}></View>
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <ConfettiCannon style={{ backgroundColor: 'red' }} count={200} origin={{ x: -10, y: 100 }} fadeOut={true} autoStartDelay={0} explosionSpeed={0} />
            <View style={{ flex: 1.7, justifyContent: "center", alignItems: "center" }}>
                <View style={{ flex: 1, justifyContent: "center" }}><Image
                    source={require("../../assets/second.png")}
                    style={{ flex: 1, height: "100%", aspectRatio: 1 }}
                    resizeMode="stretch"
                /></View>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#616c72", fontWeight: 'bold', fontSize: normalize(14) }}>
                    {second[0].WeightPoint.toFixed(2)} Puan</Text></View>

        </View>
        <View style={{
            flex: 1, justifyContent: "space-between", backgroundColor: "#dddddd"
            , borderWidth: 4, borderColor: "#bdbdbd", borderLeftWidth: 0
        }}>
            <View style={{
                flex: 1, alignItems: "center", justifyContent: "center"
                , borderBottomWidth: 2, borderColor: "#bdbdbd"
            }}><Text
                style={{ color: "#bdbdbd", fontSize: normalize(30), fontWeight: "bold" }}>2</Text></View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ScrollView nestedScrollEnabled = {true}><Text
                style={{ color: "#353535", fontSize: normalize(12), fontWeight: 'bold' }}>{names}</Text></ScrollView>
                
                </View>
        </View>
    </View>
    }
    renderThird=(third)=>{
        var names = ""
        for(let a=0;a<third.length;a++){
            names+=third[a].Name+"\n"
        }

        console.log("third ",third)
        return <View style={{ flex: 1, flexDirection: "column" }}>
                    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                        <View style={{ flex: 1.3, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ flex: 0.65, justifyContent: "center" }}><Image
                                source={require("../../assets/third.png")}
                                style={{ flex: 1, height: "100%", aspectRatio: 1 }}
                                resizeMode="stretch"
                            /></View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "#616c72", fontWeight: 'bold', fontSize: normalize(14) }}>
                                {third[0].WeightPoint.toFixed(2)} Puan</Text>
                        </View>

                    </View>
                    <View style={{
                        flex: 0.75, backgroundColor: "#dddddd", justifyContent: "space-evenly"
                        , borderWidth: 4, borderColor: "#bdbdbd", borderRightWidth: 0
                    }}>
                        <View style={{
                            flex: 1, alignItems: "center", justifyContent: "center"
                            , borderBottomWidth: 2, borderColor: "#bdbdbd"
                        }}>
                            <Text
                                style={{ color: "#7f4627", fontSize: normalize(30), fontWeight: "bold" }}>3</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <ScrollView nestedScrollEnabled = {true}><Text
                            style={{ color: "#353535", fontSize: normalize(12), fontWeight: 'bold' }}>{names}</Text></ScrollView>
                            </View>
                    </View>
                </View>
           
    }
    getFirst=(index,data)=>{

    if(index===1){
        var out=[]
        let first = this.props.data[0].WeightPoint
        return data.filter((document) => document.WeightPoint === first)
    }
    if(index===2){
        var out=[]
        let first = this.props.data[0].WeightPoint
        for(let a=0;a<data.length;a++){
            if(data[a].WeightPoint !== first)
            return data.filter((document) => document.WeightPoint === data[a].WeightPoint)
        }
        return out
    }
    if(index===3){
        var out=[]
        let first = this.props.data[0].WeightPoint
        let second
        for(let a=0;a<data.length;a++){
            if(data[a].WeightPoint !== first)
            {
                second = data[a].WeightPoint
                break
            }
        }
        for(let a=0;a<data.length;a++){
            if(data[a].WeightPoint !== first && data[a].WeightPoint !== second)
            return data.filter((document) => document.WeightPoint === data[a].WeightPoint)
        }
        return out
    }
    }
    render() {

        let second = this.getFirst(2,this.props.data)
        let first = this.getFirst(1,this.props.data)

        let third = this.getFirst(3,this.props.data)
        return (
            <View style={{ flexDirection: "row", height: screenHeight * 0.3, marginRight: "3%", marginLeft: "3%", marginBottom: "3%" }}>

            {this.renderSecond(second)}
            {this.renderFirst(first)}

            {this.renderThird(third)}
                  </View>
        )
    }
}
