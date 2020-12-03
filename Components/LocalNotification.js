import { Button, Platform, Text, Vibration, View } from "react-native";

import React from "react";

export default class LocalNotification extends React.Component {
  componentDidMount() {
   
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Title: {this.props.title}</Text>
          <Text>Body: {JSON.stringify(this.props.body)}</Text>
        </View>
        <Button
          title={this.props.buttonText}
          onPress={() =>
            this.props.sendPushNotification(
              this.props.token,
              this.props.title,
              this.props.body,
              this.props.sound,
              this.props.data
            )
          }
        />
      </View>
    );
  }
}


 {/* <LocalNotification
          notification={notification}
          token={expoPushToken}
          body="This is the message to show"
          title="Title"
          sound="default"
          data="Data is here"
          sendPushNotification={sendPushNotification}
          buttonText="Press"
        /> */}

