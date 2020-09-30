import { relogin } from "./Login";
import { AsyncStorage } from "react-native";

let url = "https://b2b.opar.com/api/adminmobile/GetList_DealerASD";


export function getRegions() {
  if (global.regions && global.regions.length > 0)
    return global.regions
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getRegions()
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
        Name: "GetList_RegionBySalesmanRole",
        Data: {
          Name: "GetList_RegionBySalesmanRole",
        },
      }),
    });


    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await getRegions()

      resolve(result);
      return;
    }
    global.regions = result.Data;

    console.log("bolge geldiiiii", result.Data)


    resolve(result.Data);
  });
}

export function getBayiList() {
  console.log("get bayi")

  if (global.bayiler && global.bayiler.length > 0)
    return global.bayiler

  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getBayiList()
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
        Name: "GetList_DealerASD",
        OparDealers: true,

        Data: {
          Name: "GetList_DealerASD",
          OparDealers: true
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await getBayiList()

      resolve(result);
      return;
    }
    global.bayiler = result.Data;
    resolve(result.Data);
  });
}

export function getGenelPerformance(filters) {
  console.log("getGenelPerformance")

  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getGenelPerformance(filters)
      resolve(result)
      return
    }
    if (global.genelPerformance[JSON.stringify(filters)]) {

      resolve(global.genelPerformance[JSON.stringify(filters)])
      return
    }
    if (!global.userData || !global.userData.Token) {
      console.log("perf no token")
      resolve(null)
    }

    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
      body: JSON.stringify({
        Token: global.userData.Token,
        Data: {
          Parameters: {
            Region: filters.region,
            DealerCode: filters.dealerCode,
            Year: filters.year,
            PreviewType: filters.donemTuru,
            Quarter: filters.quarter,
            MonthNo: filters.month + 1,
          },
          Name: "GetList_SalePerformanceSalesmanASD",
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await getGenelPerformance(filters)
      resolve(result);
      return;
    }
    global.genelPerformance[JSON.stringify(filters)] = result.Data
    //console.log("perf data item3", result.Data.Item3)

    resolve(result.Data);
  });
}

export function getCampaigns() {
  console.log("getCampaigns")

  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getCampaigns()
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
          Parameters: {
            RegionId: 0,
            DealerCode: "",
          },
          Name: "GetList_CampaignASD",
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await getCampaigns()

      resolve(result);
      return;
    }
    global.campaigns = result.Data;

    resolve(result.Data);
  });
}

export function getCampaignDetail(data, id) {

  console.log("getCampaignDetail")

  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getCampaignDetail(data, id)
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
          Name: "GetList_CampaignTargetActualASDDetail",
          Parameters: {
            Name: "GetList_InvoiceASD",

            CampaignId: id,
            PriceLinkedTargetStr: data.PriceLinkedTargetStr,
            TargetPercentStr: data.TargetPercentStr,
            PriceTarget: data.PriceTarget,
            TargetPercent: data.TargetPercent,
            CampaignType: data.CampaignType,
            PriceLinkedTarget: data.PriceLinkedTarget,
            MinSalePercent: data.MinSalePercent,
            MinSaleType: data.MinSaleType
          },
        }
      })
    })

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await getCampaignDetail(data, id)
      console.log("null data: ", result)

      resolve(result);
      return;
    }
    global.campaigns = result.Data;

    resolve(result.Data);
  });
}

export function getCampaignPerformance(id) {
  console.log("getCampaignPerformance")

  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getCampaignPerformance(id)
      resolve(result)
      return
    }
    if (global.campaignPerformance[id]) {
      console.log("return from cache")
      resolve(global.campaignPerformance[id])
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
          Parameters: {
            ASDCampaignId: id,
          },
          Name: "GetList_SalesmanPerformanceCampaign",
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (
      result.Data === null ||
      result.Data === undefined ||
      result.Data.saleListSalesman === undefined
    ) {
      if (result.Data && result.Data.saleListSalesman === undefined) {
        console.log("null data: ", result)
        await relogin();
        result = await getCampaignPerformance(id)
        console.log("null data: genel camp perf ", result)

        resolve(result);
      }
      return;
    }
    global.campaignPerformance[id] = result.Data.saleListSalesman
    resolve(result.Data.saleListSalesman);
  });
}
