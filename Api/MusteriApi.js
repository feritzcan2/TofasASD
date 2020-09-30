import { relogin } from "./Login";
import { AsyncStorage } from "react-native";

let url = "https://b2b.opar.com/api/adminmobile/GetList_CustomerSearchASD";

export function searchCustomer(name, code) {


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


      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await searchCustomer(name, code)


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


      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await getCustomer(id)


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


      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await getCustomerNotes(id)


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


      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await setCustomerNotes(id, message)


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


      resolve(null);
      return;
    });
    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await sendCustomerNotes(mail, message)


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


      resolve(null);
      return;
    });

    if (result.Data === null || result.Data === undefined) {
      await relogin();
      result = await getWarehouse(id)


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
    console.log(params)
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
          "Parameters": params
        }
      }),
    });

    result = await result.json().catch((error) => {

      resolve(null);
      return;
    });


    if (!result || result.Data === null || result.Data === undefined) {
      await relogin();
      result = await getListInvoice(params)

      resolve(result);
      return;
    }
    console.log("invoice: ", result.Data)

    resolve(result.Data);
  });
}