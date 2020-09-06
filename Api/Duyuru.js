let url = "https://b2b.opar.com/api/adminmobile/GetList_DealerASD";

export function getAnnouncements() {
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
        Name: "GetList_AnnouncementASD",

        Data: {
          Name: "GetList_AnnouncementASD",
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


    resolve(result.Data.reverse());
  });
}
