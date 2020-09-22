import { relogin } from "./Login";
import { AsyncStorage } from "react-native";

let url = "https://b2b.opar.com/api/adminmobile/GetList_DealerASD";

export function getNotifications(hidden) {
    console.log("notif")
    return new Promise(async function (resolve, reject) {
        var relogging = await AsyncStorage.getItem("relogging");
        if (relogging === "true") {
            let result = await getNotifications(hidden)
            resolve(result)
            return
        }
        if (!global.userData || !global.userData.Token) resolve(null);

        let result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Token: global.userData.Token,
            },
            body: JSON.stringify({
                Token: global.userData.Token,
                Name: "GetList_UserNotification",
                Data: {
                    Parameters: {
                        IsHide: hidden
                    },
                    IsHide: hidden,
                    Name: "GetList_UserNotification",
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
            result = await getNotifications(hidden)
            console.log("null data validation  ", result)
            resolve(result);
            return;
        }
        global.duyurular = result.Data;

        resolve(result.Data);
    });
}
