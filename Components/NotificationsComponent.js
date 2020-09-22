import React from "react";
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    Modal,
    Dimensions,

    Text,
    TouchableHighlight,
    TouchableOpacity, Platform
} from "react-native";
import { WebView } from "react-native-webview";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
import Tabs from "react-native-tabs";
import { ScrollView } from "react-native-gesture-handler";
import { normalize } from "../HelperFunctions";

export default class NotificationsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "duyurular",
            detailShown: false
        }
    }

    renderDetail = () => {
        const fontSize = Platform.OS === 'android' ? "100%" : "200%";

        let self = this;
        return (
            <Modal
                transparent
                animationType={"fade"}
                visible={this.state.detailShown}
                onRequestClose={() =>
                    function () {
                    }
                }
            >
                <View
                    style={[
                        styles.modalBackground,
                        { backgroundColor: `rgba(0,0,0,${0.6})` },
                    ]}
                >
                    <View style={styles.detailContainer}>
                        <View style={{ height: "10%" }}>
                            <View
                                style={{
                                    width: "25%",
                                    height: "100%",
                                    alignSelf: "flex-end",
                                    alignItems: "flex-end",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setState({ detailShown: false, detail: null })
                                    }
                                >
                                    <Image style={{ resizeMode: "stretch", height: screenWidth / 11, width: screenWidth / 11 }} source={require("../assets/cancel.png")} />

                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.headerText}>{this.state.detail.Header}</Text>
                        </View>
                        <WebView
                            ref={"webview"}
                            style={{
                                backgroundColor: "transparent",
                                alignSelf: "center",
                                height: screenHeight * 0.4,
                                width: screenWidth * 0.8,
                                resizeMode: "cover",
                            }}
                            scrollEnabled={false}
                            injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                            scalesPageToFit={false}
                            source={{
                                html: `<style>
    body { font-size: ${fontSize}; word-wrap: break-word; overflow-wrap: break-word; }
</style>`+
                                    this.state.detail.Content
                            }}
                        />


                    </View>
                </View>
            </Modal>
        );
    };

    renderNotification = (notification, index) => {
        return <TouchableOpacity
            onPress={() => this.setState({ detail: notification, detailShown: true })}
            key={index}
            onStartShouldSetResponder={() => true} style={{
                width: "100%", minHeight: screenHeight * 0.1,
                borderWidth: 1,
                borderColor: "#DDDDDD",
                justifyContent: "center", marginTop: screenHeight * 0.01,
                marginBottom: screenHeight * 0.01,
                backgroundColor: "#5c636b"
                , alignItems: "center"
            }}>

            <Text style={{

                marginLeft: "5%",
                marginRight: "5%",
                color: "white",
                fontSize: normalize(12),
            }}> {notification.Header}</Text>

        </TouchableOpacity>
    }

    renderNotifications = (data, isRead) => {

        return <ScrollView
            style={{
                zIndex: 500000,
                marginTop: screenHeight * 0.15,
                marginBottom: screenHeight * 0.1,

                width: "90%",
                alignSelf: "center",
                height: screenHeight * 0.6,
            }}
        >
            {data.map((notification, index) => {
                return this.renderNotification(notification, index);
            })}
        </ScrollView>
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.container}>
                    <Tabs
                        selected={this.state.page}
                        style={{
                            top: "0%",
                            zIndex: 5000,
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
                    {this.state.detailShown === true && this.renderDetail()}

                </View>
                <TouchableOpacity style={styles.closeContainer} onPress={this.props.toggleBildirim} />


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
    closeContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        width: "25%",
        marginTop: 13,
        display: "flex",
    },
    modalBackground: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    detailContainer: {
        width: "80%",
        marginTop: "15%",
        height: "75%",
        backgroundColor: "#f0f3f6",
    }, headerText: {
        color: "#464646",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        textAlign: "center",
        fontWeight: "600",
        fontSize: normalize(15),
    },
});
