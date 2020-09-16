import { relogin } from "./Login";
import { AsyncStorage } from "react-native";

let url = "https://b2b.opar.com/api/adminmobile/GetList_CustomerSearchASD";

export function searchCustomer(name, code) {
  console.log("searchCustomer")

  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await searchCustomer(name, code)
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
        Name: "GetList_CustomerSearchASD",

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
      console.log(error)

      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await searchCustomer(name, code)
      console.log("null data:  search cust", result)

      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}

export function getCustomer(id) {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getCustomer(id)
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
            CustomerId: id,
          },
          Name: "GetDetail_CustomerASD",
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
      result = await getCustomer(id)
      console.log("null data: get cust", result)

      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}

export function getCustomerNotes(id) {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getCustomerNotes(id)
      resolve(result)
      return
    }
    if (!global.userData || !global.userData.Token) resolve(null);
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Token: global.userData.Token,
        Data: {
          Parameters: {
            CustomerId: id,
          },
          Name: "GetInfo_CustomerNotesASD",
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
      result = await getCustomerNotes(id)
      console.log("get cust note: ", result)

      resolve(result);
      return;
    }
    resolve(result.Data);
  });
}

export function setCustomerNotes(id, message) {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await setCustomerNotes(id, message)
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
            "CustomerId": id,
            "Note": message
          },
          Name: "InsertOrUpdate_CustomerNoteASD",
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
      result = await setCustomerNotes(id, message)
      console.log("null set cust notes: ", result)

      resolve(result.Data);
      return;
    }

    resolve(result.Data);
  });
}
export function sendCustomerNotes(mail, message) {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await sendCustomerNotes(mail, message)
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
          "Name": "SendAsdEmail",
          "Parameters": {
            "Header": "Müşteri Notu gönderimi",
            "EmailAddress": mail,
            "Body": message
          }
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
      result = await sendCustomerNotes(mail, message)
      console.log("null send note: ", result)

      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}
export function getWarehouse(id) {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getWarehouse(id)
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
            CustomerId: id,
          },
          Name: "GetInfo_WarehouseListASD",
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
      result = await getWarehouse(id)
      console.log("null get ware: ", result)

      resolve(result.Data);
      return;
    }

    resolve(result.Data);
  });
}

export function getAnalizeCode() {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getAnalizeCode()
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

          Name: "GetList_AnalizeCode",
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
      result = await getAnalizeCode()

      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}

export function getDefinition() {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getDefinition()
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

          Name: "GetList_Definition",
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
      result = await getDefinition()
      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}
export function getTypeCode() {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getTypeCode()
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
          Name: "GetList_TypeCode",
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
      result = await getTypeCode()

      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}

export function getListInvoice(params) {
  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getListInvoice(params)
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
          "Name": "GetList_InvoiceASD",
          "Parameters": {
            "DateStart": "01/01/2020",
            "CustomerCode": "0050521062",
            "DateEnd": "07/07/2020",
            "DealerName": "",
            "SelectedDefinition": "",
            "SelectedAnalize": "",
            "SelectedType": "",
            "DealerCode": "",
            "FactorNOSearch": "",
            "AmountSearch": "",
            "ASDSearch": "",
            "ProductCodeSearch": "",
            "RowFrom": "0",
            "RowTo": "10"
          }
        }
      }),
    });

    result = await result.json().catch((error) => {
      console.log("error:", error)
      resolve(null);
      return;
    });


    if (!result || result.Data === null || result.Data === undefined) {
      await relogin();
      result = await getListInvoice(params)

      console.log("null get list: ", result)

      resolve(result);
      return;
    }

    resolve(result.Data);
  });
}