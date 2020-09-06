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
  Animated
} from "react-native";
import { normalize } from "../../HelperFunctions";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { Linking } from "expo";
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
export default class DuyuruComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shakeAnimation = new Animated.Value(0);

    this.state = {
      detailShown: false,
      startValue: new Animated.Value(0.3)
    };
  }

  startShake = () => {
    Animated.sequence([
      Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(this.shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
    ]).start();
  }

  renderAnnouncementDetail = (data, index) => {
    this.setState({
      detailShown: true,
      detail: data,
    });
  };
  componentDidMount() {

    if (this.props.notifCount > 0) {
      this.startShake()
    }

  }
  shouldComponentUpdate(nextProps) {

    if ((!this.props.notifCount || this.props.notifCount === 0) && nextProps.notifCount > 0)
      this.startShake()
    return true
  }
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
            <Text style={styles.dateText}>{data.StartDate.split("T")[0].split('-')[2] + '.' + data.StartDate.split("T")[0].split('-')[1] + '.' + data.StartDate.split("T")[0].split('-')[0]}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.dateHeaderText}>Bitiş Tarihi</Text>
            <Text style={styles.dateText}>{data.EndDate.split("T")[0].split('-')[2] + '.' + data.EndDate.split("T")[0].split('-')[1] + '.' + data.EndDate.split("T")[0].split('-')[0]}</Text>
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
                  <Image style={{ resizeMode: "stretch", height: screenWidth / 11, width: screenWidth / 11 }} source={require("../../assets/cancel.png")} />

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
              source={{
                html: `<style>
    body { font-size: 200%; word-wrap: break-word; overflow-wrap: break-word; }
</style>`+ this.state.detail.Content
              }}
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
                {this.state.detail.FileName ? this.state.detail.FileName : 'İsimsiz'}
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

        <View style={{
          width: screenWidth, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '7%', paddingTop: '7%', paddingBottom: '3%', alignItems: 'center'
        }} >
          <Image source={require('../../assets/logoDuyuru.png')} style={{ resizeMode: 'contain', width: screenWidth * 0.5, height: screenHeight * 0.1, }} />
          <Animated.View style={{
            flex: 1, alignItems: 'flex-end', transform: [{ translateX: this.shakeAnimation }],
          }}>
            <Avatar
              source={require("../../assets/notificationIcon.png")}
              size="medium"
              onPress={this.props.toggleBildirim}
            />
            <Badge
              value={this.props.notifCount}
              status="success"
              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
            />
          </Animated.View>
        </View>
        <Text style={styles.duyuruHeaderText}>DUYURULAR</Text>

        {this.state.detailShown !== true && (
          <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 40 }}>
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
    backgroundColor: "#f0f0f0",
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
    top: "20%",
    left: "10%",
    height: "69%",
    paddingBottom: 300
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
    fontWeight: "bold",
    fontSize: normalize(15),
  },
  duyuruHeaderText: {
    color: "#46BAA7",
    alignSelf: "center",
    fontSize: normalize(26),
    marginTop: "0%",
    textAlign: "center",
    fontWeight: "bold",
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
