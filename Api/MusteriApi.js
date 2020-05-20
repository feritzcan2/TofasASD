let url = "https://b2b.opar.com/api/adminmobile/GetList_CustomerSearchASD";

export function searchCustomer(name, code) {
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
            DealerCode: "",
            CustomerCode: code,
            CustomerName: name,
            UserCode: "",
            RuleCode: "",
            MasterCep: "",
          },
          Name: "GetList_CustomerSearchASD",
        },
      }),
    });

    result = await result.json().catch((error) => {
      resolve(null);
      return;
    });
    // console.log(result);
    if (result.Data === null || result.Data === undefined) {
      resolve(null);
      return;
    }

    resolve(result.Data);
  });
}

export function getCustomer(id) {
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
            CustomerId: id,
          },
          Name: "GetDetail_CustomerASD",
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

    resolve(result.Data);
  });
}

export function getCustomerNotes(id) {
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
            CustomerId: id,
          },
          Name: "GetInfo_CustomerNotes",
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

    resolve(result.Data);
  });
}
export function getWarehouse(id) {
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
            CustomerId: id,
          },
          Name: "GetInfo_WarehouseListASD",
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

    resolve(result.Data);
  });
}
