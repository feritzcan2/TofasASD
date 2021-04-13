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

export default class BestThreeComponent2 extends React.Component {
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
                        </Text>
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
            
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#616c72", fontWeight: 'bold', fontSize: normalize(14) }}>
                    </Text></View>
                    <View style={{ flex: 1.7, justifyContent: "center", alignItems: "center" }}>
                <View style={{ flex: 1, justifyContent: "center" }}><Image
                    source={require("../../assets/second.png")}
                    style={{ flex: 1, height: "100%", aspectRatio: 1 }}
                    resizeMode="stretch"
                /></View>
            </View>
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

        return <View style={{ flex: 1, flexDirection: "column" }}>
                    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                       
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "#616c72", fontWeight: 'bold', fontSize: normalize(14) }}>
                               </Text>
                        </View>
 <View style={{ flex: 1.3, justifyContent: "center", alignItems: "center" }}>
                            <View style={{  flex: 0.65, justifyContent: "flex-end" }}><Image
                                source={require("../../assets/third.png")}
                                style={{ flex: 1, height: "100%", aspectRatio: 1 }}
                                resizeMode="stretch"
                            /></View>
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
    getFirst=(index,data,min)=>{
        function findLargest3(dataa,index) {
            let first = dataa[0].WeightPoint
            let count=0;
            for(let a=0;a<dataa.length;a++){
                if(dataa[a].WeightPoint !== first){
                    first=dataa[a].WeightPoint
                    count++;
                }
                if(count===index)
                return dataa.filter((document) => document.WeightPoint >=first)
            }
          }
          function findBetween(dataa,index,index2) {
            let first = dataa[0].WeightPoint
            let second = dataa[0].WeightPoint
            let count=0;
            let count2=index+1
            for(let a=0;a<dataa.length;a++){
                if(dataa[a].WeightPoint !== first &&dataa[a].WeightPoint !== second &&count=== index && count2!==index2){
                    second=dataa[a].WeightPoint
                    count2++;
                }
                if(dataa[a].WeightPoint !== first && count!==index){
                    first=dataa[a].WeightPoint
                    count++;
                }

                if(count=== index && count2===index2){
                    console.log(index,index2,first,second)
                    return dataa.filter((document) => document.WeightPoint >=second&&document.WeightPoint <first)

                }
            }
          }
    if(index===1){
        var out=[]
        let first = this.props.data[0].WeightPoint
        console.log(first)

        let first2 = this.props.data[1].WeightPoint
        console.log(first2)

        let first3 = this.props.data[2].WeightPoint
        let first4 = this.props.data[3].WeightPoint
        console.log(first3)
        return this.props.isA?findLargest3(this.props.data,3,0):findLargest3(this.props.data,1,0)
      }
    if(index===2){

        return this.props.isA?findBetween(this.props.data,3,8):findBetween(this.props.data,1,4)
    }
    if(index===3){
        var out=[]
        let first = this.props.data[0].WeightPoint
        let second
        return this.props.isA?findBetween(this.props.data,7,12):findBetween(this.props.data,3,6)

    }
    }
    render() {

        let second = this.getFirst(2,this.props.data,this.props.isA)
        let first = this.getFirst(1,this.props.data,this.props.isA)

        let third = this.getFirst(3,this.props.data,this.props.isA)
        return (
            <View style={{ flexDirection: "row", height: screenHeight * 0.3, marginRight: "3%", marginLeft: "3%", marginBottom: "3%" }}>

            {this.renderSecond(second)}
            {this.renderFirst(first)}

            {this.renderThird(third)}
                  </View>
        )
    }
}
