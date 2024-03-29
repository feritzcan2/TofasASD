let url = "https://b2b.opar.com/api/adminmobile";
let getUserUrl = "https://puan.donmezdebriyaj.com.tr/api/user/GetUser/";
let customerListUrl =
  "https://puan.donmezdebriyaj.com.tr/api/user/GetCustomerList/";
import { AsyncStorage } from "react-native";
import { getBayiList, getCampaigns, getRegions, getGenelPerformance } from "./GeneralPerformance";
import { getNotifications } from "./Bildirim";
import { getAnnouncements } from "./Duyuru";
import { getCustomerNotes } from "./MusteriApi";

export function relogin() {
  return new Promise(async function (resolve, reject) {

    let rers = await AsyncStorage.getItem("relogging");
    if (rers === "true") {
      resolve(false)
      return
    }

    await AsyncStorage.setItem("relogging", "true");


    var username = await AsyncStorage.getItem("Username");
    var password = await AsyncStorage.getItem("Password");
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: "",
      },
      body: JSON.stringify({
        Data: {
          Parameters: {
            Username: username,
            Password: password,
            DeviceModel: "",
            DeviceBrand: "",
            DeviceImei: "",
            Name: "Login",
          },
          Name: "Login",
        },
      }),
    }).catch(function (error) {



      // ADD THIS THROW error
      throw error;
    });

    result = await result.json().catch((error) => {

      resolve(false);
      return;
    });

    if (result.Data === null || result.Message !== "Success") {


      resolve(false);
      return;
    }



    global.userData = result.Data;
    await AsyncStorage.setItem("relogging", "false");

    resolve(true);
  });
}
export function login(UserName, Password) {
  return new Promise(async function (resolve, reject) {

    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: "",
      },
      body: JSON.stringify({
        Data: {
          Parameters: {
            Username: UserName,
            Password: Password,
            DeviceModel: "",
            DeviceBrand: "",
            DeviceImei: "",
            Name: "Login",
          },
          Name: "Login",
        },
      }),
    }).catch(function (error) {
      resolve(false);

      return
    });;

    result = await result.json().catch((error) => {
      resolve(false);
      return;
    });

    if (result.Data === null || result.Message !== "Success") {

      resolve(false);
      return;
    }
    await AsyncStorage.setItem("Username", "" + UserName);
    await AsyncStorage.setItem("Password", "" + Password);
    await AsyncStorage.setItem("userStored", "true");
    global.userData = result.Data;
    global.genelPerformance = {}
    global.campaignPerformance = {}
    getBayiList();
    getRegions()
    getCampaigns();
    getAnnouncements()
    getGenelPerformance({
      hedefTuru: 0,
      region: 0,
      dealerCode: "",
      quarter: 1,
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      donemTuru: 1,
    })
    resolve(true);
  });
}
export function getUser(phone, password, token) {

  return new Promise(async function (resolve, reject) {

    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      resolve({
        statusCode: 401,
      });
      return
    }
    let result = await fetch(getUserUrl + phone, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    result = await result.json().catch((error) => {


      resolve({
        statusCode: 401,
      });
      return;
    });
    if (result.data === null || result.data === undefined) {


      resolve({
        statusCode: 401,
      });
      return;
    }

    resolve(result.data);
  });
}
export function getCustomerList(text) {


  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let res = await getCustomerList(text)
      resolve(res)
      return
    }
    let result = await fetch(customerListUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
      body: JSON.stringify({
        Text: text,
        CityId: -1,
      }),
    });
    result = await result.json().catch((error) => {


      resolve({
        statusCode: 401,
      });
      return;
    });
    if (result.data === null || result.data === undefined) {


      resolve({
        statusCode: 401,
      });
      return;
    }

    resolve(result.data);
  });
}

export function loginFromCache() {
  return new Promise(async function (resolve, reject) {

    let stored = await AsyncStorage.getItem("userStored").catch((e) => {

    });
    if (stored !== "true") {
      global.loggedIn = false;
      global.token = "";
      resolve({
        statusCode: 401,
      });
      return;
    }

    let phone = await AsyncStorage.getItem("phone").catch((e) => {

    });
    let pw = await AsyncStorage.getItem("password").catch((e) => {

    });

    let data = await loginWithPhone(phone, pw);



    resolve(data);
  });
}
