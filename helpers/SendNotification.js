export const  sendPushNotification = async (token, title, body, sound, data) => {
  const message = {
    to: token,
    sound: sound,
    title: title,
    body: body,
    data: { data: data },
    _displayInForeground: true,
  };

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  }).then((res) => res.json());
};