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
    if (result.Data === null || result.Data === undefined) {
      resolve(null);
      return;
    }
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
            PreviewType: 1,
            Quarter: 1,
            MonthNo: filters.month + 1,
          },
          Name: "GetList_SalePerformanceSalesmanASD",
        },
      }),
    });

    console.log("Perf params: ", JSON.stringify({
      Token: global.userData.Token,
      Data: {
        Parameters: {
          Region: filters.region,
          DealerCode: filters.dealerCode,
          Year: filters.year,
          PreviewType: 1,
          Quarter: 1,
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
    global.genelPerformance[JSON.stringify(filters)] = result.Data
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

export function getCampaignDetail(data, id) {
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

    console.log(JSON.stringify({
      Token: global.userData.Token,
      Data: {
        Name: "GetList_CampaignTargetActualASDDetail",
        Parameters: {
          CampaignId: 6,
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
    }))
    result = await result.json().catch((error) => {
      resolve(null);
      return;
    });
    console.log("kampanya:", result);
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
    global.campaignPerformance[id] = result.Data.saleListSalesman
    resolve(result.Data.saleListSalesman);
  });
}
