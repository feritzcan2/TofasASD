let url = "https://b2b.opar.com/api/adminmobile/GetList_DealerASD";

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
    console.log(result);
    if (result.Data === null || result.Data === undefined) {
      resolve(null);
      return;
    }

    resolve(result.Data);
  });
}

export function getGenelPerformance() {
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
            Region: 0,
            DealerCode: "",
            Year: "2020",
            PreviewType: "",
            Quarter: "",
            MonthNo: "",
          },
          Name: "GetList_SalePerformanceSalesmanASD",
        },
      }),
    });

    result = await result.json().catch((error) => {
      resolve(null);
      return;
    });
    console.log(result);
    if (result.Data === null || result.Data === undefined) {
      resolve(null);
      return;
    }

    resolve(result.Data);
  });
}
