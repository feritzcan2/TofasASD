import React from "react";
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    Text,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";
import Tabs from "react-native-tabs";
import { ScrollView } from "react-native-gesture-handler";
import { normalize } from "../HelperFunctions";

export default class NotificationsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "duyurular",
        }
    }

    renderNotification = (notification, index) => {
        return <View
            key={index}
            onStartShouldSetResponder={() => true} style={{
                width: "100%", minHeight: "10%",
                borderBottomWidth: 1,
                borderBottomColor: "#538ac5",
                justifyContent: "center", marginTop: "5%",
                marginBottom: "5%",
            }}>

            <Text style={{

                marginLeft: "5%",
                marginRight: "5%",
                color: "white",
                fontSize: normalize(12),
            }}>sadsa dsa dsa dsadsadsadsajdknsadjsadassadsa dsa dsa dsadsadsadsajdknsadjsadassadsa dsa dsa dsadsadsadsajdknsadjsadassadsa dsa dsa dsadsadsadsajdknsadjsadassadsa dsa dsa dsadsadsadsajdknsadjsadassadsa dsa dsa dsadsadsadsajdknsadjsadassadsa dsa dsa dsadsadsadsajdknsadjsadassadsa dsa dsa dsadsadsadsajdknsadjsadas</Text>

        </View>
    }

    renderNotifications = (data, isRead) => {
        return <ScrollView
            style={{
                marginTop: "20%",
                marginBottom: "15%",
                width: "90%",
                alignSelf: "center",
                height: "90%",
            }}
        >
            {data.map((notification, index) => {
                return this.renderNotification(notification, index);
            })}
        </ScrollView>
    }

    render() {
        return (
            <View style={styles.container}>
                <Tabs
                    selected={this.state.page}
                    style={{
                        top: "0%",
                        zIndex: 500000,
                        backgroundColor: "#1f2832",
                        height: "10%",
                        flex: 1,
                    }}
                    selectedStyle={{ color: "white" }}
                    onSelect={(el) => this.setState({ page: el.props.name })}
                >
                    <Text
                        name="duyurular"
                        selectedIconStyle={{
                            height: "100%",
                            borderBottomWidth: 3,
                            borderBottomColor: "#538ac5",
                            flex: 1,
                        }}
                    >
                        OKUNMAMIŞ
                 </Text>
                    <Text
                        name="genel"
                        selectedIconStyle={{
                            height: "100%",
                            borderBottomWidth: 3,
                            borderBottomColor: "#538ac5",
                            flex: 1,
                        }}
                    >
                        OKUNMUŞ
                    </Text>
                </Tabs>
                {this.state.page === "duyurular" &&
                    this.renderNotifications(this.props.notifications.nonRead, false)}
                {this.state.page === "genel" &&
                    this.renderNotifications(this.props.notifications.read, false)}
                <View style={{ backgroundColor: "white" }}></View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1f2832",
        width: "75%",
        marginTop: 13,
        display: "flex",
    },

});
