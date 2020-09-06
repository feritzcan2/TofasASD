let url = "https://b2b.opar.com/api/adminmobile/GetList_DealerASD";

export function getNotifications(hidden) {
    return new Promise(async function (resolve, reject) {
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
                    Name: "GetList_UserNotification",
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
        global.duyurular = result.Data;

        resolve(result.Data);
    });
}
