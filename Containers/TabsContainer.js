import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from "react-native";

import Tabs from "react-native-tabs";
import PerformanceContainer from "./PerformanceContainer";

import DuyuruContainer from "./DuyuruContainer";
import { getAnnouncements } from "../Api/Duyuru";
import MusteriBazliContainer from "./MusteriBazliContainer";
import YildizKarneContainer from "./YildizKarneContainer";
import {
  getYildizPuanDetail,
  getYildizKarneDetails,
  getYildizKarneBayiParams,
  getYildizKarneTympParams,
  getHedef,
} from "../Api/YildizKarneApi";

export default class TabsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "yildiz",
      performanceData: [],
      duyuruData: [],
      yildizData: {
        hedef: { bayiHedef: [], danismanHedef: [] },
        puanDurumu: {
          toptanYedekA: [],
          toptanYedekB: [],
          aktifDanismanA: [],
          aktifDanismanB: [],
        },
        karneDetail: {
          typm: {
            yedekParca: [],
            yeniMusteri: [],
            oparWeb: [],
            aksesuarHacmi: [],
            yerelIletisim: [],
            firsatParcalari: [],
            stokDevir: [],
            kampanyaPaneli: [],
          },
          asd: {
            satisHedef: [],
            yeniMusteri: [],
            aksesuarSatis: [],
            firsatParca: [],
            dmpSatis: [],
          },
        },
        params: { bayi: [], typm: [], asd: [] },
      },
      yildizKarneData: null,
    };
    getAnnouncements().then((d) => {
      this.setState({ duyuruData: d });
    });
    getYildizPuanDetail().then((data) => {
      this.prepareYildizData(data);
    });
    getYildizKarneDetails().then((data) => {
      this.prepareYildizKarneDetailData(data);
    });
    getYildizKarneBayiParams().then((data) => {
      let yildizData = this.state.yildizData;
      yildizData.params.bayi = data;
      this.setState({ yildizData: yildizData });
    });
    getYildizKarneTympParams().then((data) => {
      this.prepareYildizKarneParamsData(data);
    });
    getHedef("0").then((data) => {
      let yildizData = this.state.yildizData;
      yildizData.hedef.bayiHedef = data;
      this.setState({ yildizData: yildizData });
    });
    getHedef("1").then((data) => {
      let yildizData = this.state.yildizData;
      yildizData.hedef.danismanHedef = data;
      this.setState({ yildizData: yildizData });
    });
  }
  prepareYildizKarneParamsData = (data) => {
    let yildizData = this.state.yildizData;

    let typm = [];
    let asd = [];
    for (let a = 0; a < data.length; a++) {
      let row = data[a];
      if (row.Code[0] === "B") typm.push(row);
      if (row.Code[0] === "S") asd.push(row);
    }

    yildizData.params.typm = typm;
    yildizData.params.asd = asd;

    this.setState({ yildizData: yildizData });
  };
  prepareYildizKarneDetailData = (data) => {
    let yildizData = this.state.yildizData;

    let karneDetail = {
      typm: {
        yedekParca: [],
        yeniMusteri: [],
        oparWeb: [],
        aksesuarHacmi: [],
        yerelIletisim: [],
        firsatParcalari: [],
        stokDevir: [],
        kampanyaPaneli: [],
      },
      asd: {
        satisHedef: [],
        yeniMusteri: [],
        aksesuarSatis: [],
        firsatParca: [],
        dmpSatis: [],
      },
    };
    for (let a = 0; a < data.length; a++) {
      let row = data[a];
      if (row.TympTypeCode === "S_SHG") karneDetail.asd.satisHedef.push(row);
      if (row.TympTypeCode === "S_YMK") karneDetail.asd.yeniMusteri.push(row);
      if (row.TympTypeCode === "S_AS") karneDetail.asd.aksesuarSatis.push(row);
      if (row.TympTypeCode === "S_FP") karneDetail.asd.firsatParca.push(row);
      if (row.TympTypeCode === "S_DS") karneDetail.asd.dmpSatis.push(row);

      if (row.TympTypeCode === "B_YPH") karneDetail.typm.yedekParca.push(row);
      if (row.TympTypeCode === "B_YMK") karneDetail.typm.yeniMusteri.push(row);
      if (row.TympTypeCode === "B_OW") karneDetail.typm.oparWeb.push(row);
      if (row.TympTypeCode === "B_AIH")
        karneDetail.typm.aksesuarHacmi.push(row);
      if (row.TympTypeCode === "B_YI") karneDetail.typm.yerelIletisim.push(row);
      if (row.TympTypeCode === "B_FPS")
        karneDetail.typm.firsatParcalari.push(row);
      if (row.TympTypeCode === "B_SDH") karneDetail.typm.stokDevir.push(row);
      if (row.TympTypeCode === "B_BKK")
        karneDetail.typm.kampanyaPaneli.push(row);
    }

    yildizData.karneDetail = karneDetail;

    this.setState({ yildizData: yildizData });
  };
  prepareYildizData = (data) => {
    let yildizData = this.state.yildizData;

    let puanDurumu = {
      toptanYedekA: [],
      toptanYedekB: [],
      aktifDanismanA: [],
      aktifDanismanB: [],
    };
    for (let a = 0; a < data.length; a++) {
      let row = data[a];
      if (row.Type === 0 && row.TympGroup === "A")
        puanDurumu.toptanYedekA.push(row);
      if (row.Type === 0 && row.TympGroup === "B")
        puanDurumu.toptanYedekB.push(row);
      if (row.Type === 1 && row.TympGroup === "A")
        puanDurumu.aktifDanismanA.push(row);
      if (row.Type === 1 && row.TympGroup === "B")
        puanDurumu.aktifDanismanB.push(row);
    }

    puanDurumu.toptanYedekA = puanDurumu.toptanYedekA.sort(function (a, b) {
      return a.Index - b.Index;
    });
    puanDurumu.toptanYedekB = puanDurumu.toptanYedekB.sort(function (a, b) {
      return a.Index - b.Index;
    });
    puanDurumu.aktifDanismanA.sort(function (a, b) {
      return a.Index - b.Index;
    });
    puanDurumu.aktifDanismanB.sort(function (a, b) {
      return a.Index - b.Index;
    });
    yildizData.puanDurumu = puanDurumu;

    this.setState({ yildizData: yildizData });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.page !== "duyurular" && nextState.page === "duyurular") {
      getAnnouncements().then((d) => {
        this.setState({ duyuruData: d });
      });
    }
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <Tabs
          selected={this.state.page}
          style={{
            zIndex: 50000,
            backgroundColor: "white",
            height: "10%",
          }}
          selectedStyle={{ color: "red" }}
          onSelect={(el) => this.setState({ page: el.props.name })}
        >
          <Text
            name="duyurular"
            selectedIconStyle={{
              height: "100%",
              borderTopWidth: 2,
              borderTopColor: "green",
              flex: 1,
            }}
          >
            Duyurular
          </Text>
          <Text
            name="genel"
            selectedIconStyle={{
              height: "100%",
              borderTopWidth: 2,
              borderTopColor: "green",
              flex: 1,
            }}
          >
            Performans Takibi
          </Text>
          <Text
            name="musteri"
            selectedIconStyle={{
              height: "100%",
              borderTopWidth: 2,
              borderTopColor: "green",
              flex: 1,
            }}
          >
            Müşteri Bazlı Satışlar
          </Text>
          <Text
            name="yildiz"
            selectedIconStyle={{
              height: "100%",
              borderTopWidth: 2,
              borderTopColor: "green",
              flex: 1,
            }}
          >
            Yıldız Karne
          </Text>
        </Tabs>
        {this.state.page === "duyurular" && (
          <DuyuruContainer data={this.state.duyuruData} />
        )}
        {this.state.page === "genel" && (
          <PerformanceContainer performanceData={this.state.performanceData} />
        )}
        {this.state.page === "yildiz" && (
          <YildizKarneContainer yildizData={this.state.yildizData} />
        )}
        {this.state.page === "musteri" && <MusteriBazliContainer />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
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
});
