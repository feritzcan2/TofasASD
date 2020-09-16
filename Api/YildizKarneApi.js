import { relogin } from "./Login";
import { AsyncStorage } from "react-native";

let url = "https://b2b.opar.com/api/adminmobile/GetList_CustomerSearchASD";

export function getYildizPuanDetail() {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getYildizPuanDetail()
      resolve(result)
      return
    }
    if (!global.userData || !global.userData.Token) resolve(null);

    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: "",
      },
      body: JSON.stringify({
        Token: global.userData.Token,

        Data: {
          Name: "GetList_TympCalculateDataASD",
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      console.log("null data: ", result)
      await relogin();
      result = await getYildizPuanDetail()
      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}

export function getYildizKarneDetails() {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getYildizKarneDetails()
      resolve(result)
      return
    }
    if (!global.userData || !global.userData.Token) resolve(null);

    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: "",
      },
      body: JSON.stringify({
        Token: global.userData.Token,

        Data: {
          Name: "GetList_CalculateTympData",
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      console.log("null data: ", result)
      await relogin();
      result = await getYildizKarneDetails()
      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}

export function getYildizKarneBayiParams() {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getYildizKarneBayiParams()
      resolve(result)
      return
    }
    if (!global.userData || !global.userData.Token) resolve(null);

    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: "",
      },
      body: JSON.stringify({
        Token: global.userData.Token,

        Data: {
          Name: "GetList_TympDealer",
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      console.log("null data: ", result)
      await relogin();
      result = await getYildizKarneBayiParams()
      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}
export function getYildizKarneTympParams() {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getYildizKarneTympParams()
      resolve(result)
      return
    }
    if (!global.userData || !global.userData.Token) resolve(null);

    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: "",
      },
      body: JSON.stringify({
        Token: global.userData.Token,

        Data: {
          Name: "GetList_TympType",
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      console.log("null data: ", result)
      await relogin();
      result = await getYildizKarneTympParams()
      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}

export function getHedef(type) {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getHedef(type)
      resolve(result)
      return
    }
    if (!global.userData || !global.userData.Token) resolve(null);

    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: "",
      },
      body: JSON.stringify({
        Token: global.userData.Token,
        Data: {
          Name: "GetTympTargetHeaderList",
          Parameters: {
            Type: type,
          },
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      console.log("null data: ", result)
      await relogin();
      result = await getHedef(type)
      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}

export function getHedefDetail(id) {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getHedefDetail(id)
      resolve(result)
      return
    }
    if (!global.userData || !global.userData.Token) resolve(null);

    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: "",
      },
      body: JSON.stringify({
        Token: global.userData.Token,
        Data: {
          Name: "GetList_TympTargetData",
          Parameters: {
            HeaderId: id,
          },
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      console.log("null data: ", result)
      await relogin();
      result = await getHedefDetail(id)
      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}
