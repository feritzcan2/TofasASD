import { relogin } from "./Login";
import { AsyncStorage } from "react-native";

let url = "https://b2b.opar.com/api/adminmobile/GetList_DealerASD";

export function getAnnouncements() {
  console.log("announcement")

  return new Promise(async function (resolve, reject) {
    var relogging = await AsyncStorage.getItem("relogging");
    if (relogging === "true") {
      let result = await getAnnouncements()
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
        Name: "GetList_AnnouncementASD",

        Data: {
          Name: "GetList_AnnouncementASD",
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
      result = await getAnnouncements()
      resolve(result);
      return;
    }
    global.duyurular = result.Data;


    resolve(result.Data.reverse());
  });
}
