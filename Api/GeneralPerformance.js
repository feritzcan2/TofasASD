import { relogin } from "./Login";

let url = "https://b2b.opar.com/api/adminmobile/GetList_DealerASD";


export function getRegions() {
  console.log("getRegions")

  return new Promise(async function (resolve, reject) {
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
      await relogin(); debugger
      result = await getRegions()
      console.log("null data: genel perf ", result)

      resolve(result);
      return;
    }
    global.regions = result.Data;

    resolve(result.Data);
  });
}

export function getBayiList() {
  console.log("get bayi")

  return new Promise(async function (resolve, reject) {
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

        Data: {
          Name: "GetList_DealerASD",
        },
      }),
    });

    result = await result.json().catch((error) => {
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin(); debugger
      result = await getBayiList()
      console.log("null data: genel get bayi ", result)

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
    if (global.genelPerformance[JSON.stringify(filters)]) {

      resolve(global.genelPerformance[JSON.stringify(filters)])
      return
    }
    if (!global.userData || !global.userData.Token) {
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
      await relogin(); debugger
      result = await getGenelPerformance(filters)
      console.log("null data: genel perf genelperf ", result)

      resolve(result);
      return;
    }
    global.genelPerformance[JSON.stringify(filters)] = result.Data
    resolve(result.Data);
  });
}

export function getCampaigns() {
  console.log("getCampaigns")

  return new Promise(async function (resolve, reject) {

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
      await relogin(); debugger
      result = await getCampaigns()
      console.log("null data: genel get camp ", result)

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
      await relogin(); debugger
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
        await relogin(); debugger
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
