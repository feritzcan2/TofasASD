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
import { normalize } from "../../../HelperFunctions";
let screenHeight = Dimensions.get("window").height
export default class KampanyaDetayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 1, 1, 3, 3, 3]
        }

    }

    renderRow = (rowData, index, isHeader) => {
        return (
            <View
                key={"r " + index}
                style={[
                    {
                        flex: 1,
                        borderBottomColor: "white",
                        borderBottomWidth: 2,
                        height: screenHeight * 0.08,
                        flexDirection: "row",
                    },
                    isHeader ? { backgroundColor: "#f6f6f6" } : {},
                ]}
            >
                <View
                    style={{
                        height: "100%",
                        flex: 1,
                        borderColor: "#dbe0e2",
                        borderWidth: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={[
                            styles.rowText,
                            isHeader ? {
                                fontWeight: "800", color: "#5a5a5a",
                                fontSize: normalize(10)
                            } : {},
                        ]}
                    >
                        {isHeader ? "HEDEF" : "100%"}
                    </Text>
                </View>
                <View
                    style={{
                        height: "100%",
                        flex: 1,
                        borderColor: "#dbe0e2",
                        borderWidth: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={[
                            styles.rowText,
                            isHeader ? {
                                fontWeight: "800", color: "#5a5a5a",
                                fontSize: normalize(10)
                            } : {},
                        ]}
                    >
                        {isHeader ? "PERFORMANS" : "100%"}
                    </Text>
                </View>
                <View
                    style={{
                        height: "100%",
                        flex: 1.5,
                        flexDirection: "row",
                        borderColor: "#dbe0e2",
                        borderWidth: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {!isHeader && <View style={{ height: "30%", aspectRatio: 1 }}>
                        <Image style={{ resizeMode: "stretch", flex: 1, height: undefined, width: undefined }} source={require("../../../assets/success.png")} />
                    </View>}
                    <Text
                        style={[

                            styles.rowText,
                            isHeader ? {
                                fontWeight: "800", color: "#5a5a5a",
                                fontSize: normalize(10)
                            } : { flex: 1 },
                        ]}
                    >
                        {isHeader ? "HEDEFE KALAN CİRO" : "TAMAMLANDI"}

                    </Text>
                </View>
                <View
                    style={{
                        height: "100%",
                        flex: 1,
                        borderColor: "#dbe0e2",
                        borderWidth: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={[
                            styles.rowText,
                            isHeader ? {
                                fontWeight: "800", color: "#5a5a5a",
                                fontSize: normalize(10)
                            } : {},
                        ]}
                    >
                        {isHeader ? "HAKEDİŞ" : " ₺"}
                    </Text>
                </View>
            </View>
        );
    };

    render() {

        return (
            <Modal
                transparent
                animationType={"fade"}
                visible={this.props.visible}
                onRequestClose={() => function () { }}
            >
                <View
                    style={[
                        styles.modalBackground,
                        { backgroundColor: `rgba(0,0,0,${0.8})` },
                    ]}
                >
                    <View style={styles.contentContainer}>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>KAMPANYA DETAY</Text>
                        </View>
                        <View style={{ margin: "5%" }}>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>BÖLGE
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3,
                                    borderBottomWidth: 0.5, borderBottomColor: "#667077"
                                }}><Text style={{
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>Birmot Beylikdüzü
                                </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>BAYİ
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3,
                                    borderBottomWidth: 0.5, borderBottomColor: "#667077"

                                }}><Text style={{
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>Birmot Beylikdüzü
                                </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>ASD
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3, borderBottomWidth: 0.5, borderBottomColor: "#667077"

                                }}><Text style={{
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>Birmot Beylikdüzü
                                </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>TARİH
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3, borderBottomWidth: 0.5, borderBottomColor: "#667077"

                                }}><Text style={{
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>Birmot Beylikdüzü
                                </Text>
                                </View>
                            </View>

                        </View>
                        <ScrollView style={{ maxHeight: screenHeight * 0.4 }}>
                            {this.renderRow(null, null, true)}
                            {

                                this.state.data.map((data, index) => {
                                    return this.renderRow(data, index);
                                })
                            }
                        </ScrollView>
                        <TouchableOpacity
                            onPress={this.props.close}
                            style={{ justifyContent: "center", alignItems: "center", height: "10%", backgroundColor: "#473e54" }}>
                            <Text style={{ fontSize: normalize(20), color: "white", fontWeight: "bold" }}>KAPAT</Text>
                        </TouchableOpacity>
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
    contentContainer: { width: "90%", backgroundColor: "#F5FCFF" },

    modalBackground: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTextContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#473e54",
    },
    headerText: {
        fontSize: normalize(20),
        color: "white",
        fontWeight: "bold",
    }, rowText: {
        fontSize: normalize(11),
        color: "#667077",
    },
});
