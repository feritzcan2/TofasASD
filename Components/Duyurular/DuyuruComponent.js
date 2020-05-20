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
  ImageBackground,
} from "react-native";
import { normalize } from "../../HelperFunctions";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { Linking } from "expo";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
export default class DuyuruComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailShown: false,
    };
  }

  renderAnnouncementDetail = (data, index) => {
    this.setState({
      detailShown: true,
      detail: data,
    });
  };

  renderAnnouncement = (data, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={(i, j) => this.renderAnnouncementDetail(data, index)}
        style={styles.announcementContainer}
      >
        <Text style={styles.headerText}>{data.Header}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 10,
            marginTop: 30,
          }}
        >
          <View>
            <Text style={styles.dateHeaderText}>Başlangıç Tarihi</Text>
            <Text style={styles.dateText}>{data.StartDate.split("T")[0]}</Text>
          </View>
          <View>
            <Text style={styles.dateHeaderText}>Bitiş Tarihi</Text>
            <Text style={styles.dateText}>{data.EndDate.split("T")[0]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderDetail = () => {
    let self = this;
    return (
      <Modal
        transparent
        animationType={"fade"}
        visible={this.state.detailShown}
        onRequestClose={() =>
          function () {
            console.log("loader modal closed");
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
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ detailShown: false, detail: null })
                  }
                >
                  <Text
                    style={{
                      fontSize: normalize(40),
                      fontWeight: "bold",
                      color: "red",
                      alignSelf: "flex-end",
                    }}
                  >
                    X
                  </Text>
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
                height: screenHeight * 0.5,
                width: screenWidth * 0.8,
                resizeMode: "cover",
              }}
              scrollEnabled={false}
              injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
              scalesPageToFit={true}
              source={{ html: this.state.detail.Content }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 10,
                marginTop: 30,
              }}
            >
              <View>
                <Text style={styles.dateHeaderText}>Başlangıç Tarihi</Text>
                <Text style={styles.dateText}>
                  {this.state.detail.StartDate.split("T")[0]}
                </Text>
              </View>
              <View>
                <Text style={styles.dateHeaderText}>Bitiş Tarihi</Text>
                <Text style={styles.dateText}>
                  {this.state.detail.EndDate.split("T")[0]}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={async function () {
                try {
                  Linking.openURL(
                    "https://b2b.opar.com" + self.state.detail.FilePath
                  );
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              <Text
                style={[
                  styles.dateHeaderText,
                  { color: "blue", textAlign: "center" },
                ]}
              >
                {this.state.detail.FileName}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          imageStyle={{ width: "100%", height: "100%" }}
          style={{ height: "30%", width: "100%", resizeMode: "stretch" }}
          source={require("../../assets/headerbg.png")}
        >
          <Text style={styles.duyuruHeaderText}>DUYURULAR</Text>
        </ImageBackground>
        {this.state.detailShown !== true && (
          <ScrollView style={styles.scrollContainer}>
            {this.props.data.map((data, index) => {
              return this.renderAnnouncement(data, index);
            })}
          </ScrollView>
        )}
        {this.state.detailShown === true && this.renderDetail()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f3f6",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  scrollContainer: {
    width: "80%",
    position: "absolute",
    top: "15%",
    left: "10%",
    height: "75%",
  },
  announcementContainer: {
    borderRadius: 10,
    minHeight: screenHeight * 0.13,
    backgroundColor: "white",
    marginTop: screenHeight * 0.02,
    justifyContent: "space-between",
  },
  headerText: {
    color: "#464646",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
    fontWeight: "600",
    fontSize: normalize(15),
  },
  duyuruHeaderText: {
    color: "#e7ee98",

    fontSize: normalize(25),
    marginTop: "15%",
    textAlign: "center",
    fontWeight: "800",
  },
  dateHeaderText: {
    color: "#bbbbbb",
    fontSize: normalize(12),
  },
  dateText: {
    color: "#464646",
    alignSelf: "center",
    fontSize: normalize(13),
  },
});
