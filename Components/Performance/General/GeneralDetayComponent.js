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
export default class GeneralDetayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 1, 1, 3, 3, 3]
        }

    }


    convertText(text) {
        return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
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
                            <Text style={styles.headerText}>GENEL DETAY</Text>
                        </View>
                        <View style={{ margin: "5%" }}>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1.5, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
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
                                    textAlign: "center",
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>{this.props.detailAreaData ? this.props.detailAreaData.region : ""}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1.5
                                    , backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
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
                                    textAlign: "center",
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>{this.props.detailAreaData ? this.props.detailAreaData.dealerName : ""}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1.5, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
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
                                    textAlign: "center",
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>{this.props.detailAreaData ? this.props.detailAreaData.name : ""}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1.5, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>HEDEF
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3, borderBottomWidth: 0.5, borderBottomColor: "#667077"

                                }}><Text style={{
                                    textAlign: "center",
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>{this.props.detailAreaData ? this.props.detailAreaData.PriceTargetStr + '' : ""}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1.5, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
                                        textAlign: "center",
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>HEDEFE TABİ SATIŞ TUTARI
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3, borderBottomWidth: 0.5, borderBottomColor: "#667077"

                                }}><Text style={{
                                    textAlign: "center",
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>{this.props.detailAreaData ? this.props.detailAreaData.PriceLinkedTargetStr + ' ₺' : ""}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1.5, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>PERFORMANS
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3, borderBottomWidth: 0.5, borderBottomColor: "#667077"

                                }}><Text style={{
                                    textAlign: "center",
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>{this.props.detailAreaData ? this.props.detailAreaData.TargetPercentStr + ' %' : ""}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>SATIŞ HEDEFLERİ
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>HEDEFE KALAN CİRO
                                </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1.5, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>95 %
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3, borderBottomWidth: 0.5, borderBottomColor: "#667077"

                                }}
                                >{this.props.detailAreaData ? <Text style={{
                                    textAlign: "center",
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>{(this.props.detailAreaData.PriceTarget * 95 / 100) - this.props.detailAreaData.PriceLinkedTarget > 0 && this.props.detailAreaData ? this.convertText(((this.props.detailAreaData.PriceTarget * 95 / 100) - this.props.detailAreaData.PriceLinkedTarget).toFixed(0)) + ' ₺ Kaldı.' : 'Tamamlandı.'}
                                </Text> : null}
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1.5, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>105 %
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3, borderBottomWidth: 0.5, borderBottomColor: "#667077"

                                }}>{this.props.detailAreaData ? <Text style={{
                                    textAlign: "center",
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>{(this.props.detailAreaData.PriceTarget * 105 / 100) - this.props.detailAreaData.PriceLinkedTarget > 0 ? this.convertText(((this.props.detailAreaData.PriceTarget * 105 / 100) - this.props.detailAreaData.PriceLinkedTarget).toFixed(0)) + ' ₺ Kaldı.' : 'Tamamlandı.'}
                                </Text> : null}
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1.5, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>115 %
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3, borderBottomWidth: 0.5, borderBottomColor: "#667077"

                                }}>{this.props.detailAreaData ? <Text style={{
                                    textAlign: "center",
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>{(this.props.detailAreaData.PriceTarget * 115 / 100) - this.props.detailAreaData.PriceLinkedTarget > 0 ? this.convertText(((this.props.detailAreaData.PriceTarget * 115 / 100) - this.props.detailAreaData.PriceLinkedTarget).toFixed(0)) + ' ₺ Kaldı.' : 'Tamamlandı.'}
                                </Text> : null}
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 3 }}>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 1.5, backgroundColor: "#473e54",
                                }}>
                                    <Text style={{
                                        textAlign: "center",
                                        fontSize: normalize(11),
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>125 %
                                </Text>
                                </View>
                                <View style={{
                                    justifyContent: "center", alignItems: "center",
                                    flex: 3, borderBottomWidth: 0.5, borderBottomColor: "#667077"

                                }}>{this.props.detailAreaData ? <Text style={{
                                    textAlign: "center",
                                    fontSize: normalize(11),
                                    marginTop: 5,
                                    marginBottom: 5,
                                    color: "#667077",
                                    fontWeight: "bold"
                                }}>{(this.props.detailAreaData.PriceTarget * 125 / 100) - this.props.detailAreaData.PriceLinkedTarget > 0 ? this.convertText(((this.props.detailAreaData.PriceTarget * 125 / 100) - this.props.detailAreaData.PriceLinkedTarget).toFixed(0)) + ' ₺ Kaldı.' : 'Tamamlandı.'}
                                </Text> : null}
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={this.props.close}
                            style={{ justifyContent: "center", alignItems: "center", height: "10%", backgroundColor: "#473e54" }}>
                            <Text style={{ textAlign: "center", fontSize: normalize(20), color: "white", fontWeight: "bold" }}>KAPAT</Text>
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
