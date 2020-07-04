let url = "https://b2b.opar.com/api/adminmobile/GetList_DealerASD";


export function getRegions() {
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
      resolve(null);
      return;
    });
    console.log("reg resp ", result)
    if (result.Data === null || result.Data === undefined) {
      resolve(null);
      return;
    }
    console.log("regions", result.Data)
    global.regions = result.Data;

    resolve(result.Data);
  });
}

export function getBayiList() {
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
      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      resolve(null);
      return;
    }
    global.bayiler = result.Data;

    resolve(result.Data);
  });
}

export function getGenelPerformance(filters) {
  return new Promise(async function (resolve, reject) {
    console.log("genel perf")
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
            Region: filters.region,
            DealerCode: filters.dealerCode,
            Year: filters.year,
            PreviewType: 1,
            Quarter: 3,
            MonthNo: filters.month,
          },
          Name: "GetList_SalePerformanceSalesmanASD",
        },
      }),
    });

    console.log("paramsi ,", JSON.stringify({
      Token: global.userData.Token,
      Data: {
        Parameters: {
          Region: filters.region,
          DealerCode: filters.dealerCode,
          Year: filters.year,
          PreviewType: filters.donemTuru,
          Quarter: filters.quarter,
          MonthNo: filters.month,
        },
        Name: "GetList_SalePerformanceSalesmanASD",
      },
    }))

    result = await result.json().catch((error) => {
      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      resolve(null);
      return;
    }

    console.log("data length: " + result.Data.length, result.Data[0])
    resolve(result.Data);
  });
}

export function getCampaigns() {
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
      resolve(null);
      return;
    });
    // console.log("kampanya:", result);
    if (result.Data === null || result.Data === undefined) {
      resolve(null);
      return;
    }
    global.campaigns = result.Data;

    resolve(result.Data);
  });
}
export function getCampaignPerformance(id) {
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
            ASDCampaignId: id,
          },
          Name: "GetList_SalesmanPerformanceCampaign",
        },
      }),
    });

    result = await result.json().catch((error) => {
      resolve(null);
      return;
    });
    if (
      result.Data === null ||
      result.Data === undefined ||
      result.Data.saleListSalesman === undefined
    ) {
      resolve(null);
      return;
    }
    resolve(result.Data.saleListSalesman);
  });
}
