import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { StyleSheet, Text, View } from "react-native";

import Constants from "expo-constants";
import MapViewDemo from "./Components/MapViewDemo";
import React from "react";
import  TimerComponent  from "./Components/TimerComponent";
import { sendPushNotification } from "./helpers/SendNotification";

export default function App() {
  const [expoPushToken, setToken] = React.useState("");
  const [notification, setNotification] = React.useState("");
  const [currentLocation, setCurrentLocation] = React.useState("");
  const [
    notificationSubscription,
    setNotificationSubscription,
  ] = React.useState();
  // _handleNotification = (notification) => {
  //   Vibration.vibrate();

  //   setNotification(notification);
  // };
  // registerForPushNotificationsAsync = async () => {
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(
  //       Permissions.NOTIFICATIONS
  //     );
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Permissions.askAsync(
  //         Permissions.NOTIFICATIONS
  //       );
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     let token = await Notifications.getExpoPushTokenAsync();
  //     setToken(token.data);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }
  // };

  React.useEffect(() => {
    // registerForPushNotificationsAsync();
    // let a = Notifications.addNotificationReceivedListener(_handleNotification);
    // setNotificationSubscription(a);
  }, []);

  return (
    <View style={{ height: "100%" }}>
      {/* <LocationWithStop /> */}
      {/* <TimerComponent setCurrentLocation={setCurrentLocation} /> */}
      <MapViewDemo
        // token={expoPushToken}
        // sendPushNotification={sendPushNotification}
        currentLocation={currentLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
