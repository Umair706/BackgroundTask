import { Alert, Dimensions, Image, PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { Component } from "react";

import BackgroundTimer from "react-native-background-timer";
import Geolocation from 'react-native-geolocation-service';
import Polyline from "@mapbox/polyline";

export default class MapViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: [],
      start: [31.5204, 74.3587],
      end: [31.5898, 74.3885],
      TimeRemaining: "",
      distanceRemaining: 0,
      Images: [
        {
          uri:
            "https://e7.pngegg.com/pngimages/35/140/png-clipart-car-mercedes-benz-computer-icons-white-modern-car-top-view-white-car-illustration-miscellaneous-glass.png",
        },
        {
          uri:
            "https://www.clipartmax.com/png/middle/103-1038438_computer-icons-symbol-home-home-icon.png",
        },
        { uri: "https://i.imgur.com/UDrH0wm.jpg" },
        { uri: "https://i.imgur.com/Ka8kNST.jpg" },
      ],
    };
  }
  _interval;
 async requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
       authorizationLevel: 'whenInUse',
     });
    }
  
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }
  getCurrentLocation = ()=>{

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        this.setState({ start: [latitude,longitude] }, () => {
          this.getDirections(
            `${this.state.start[0]},${this.state.start[1]}`,
            `${this.state.end[0]},${this.state.end[1]}`
          );
        });
        console.log("BT Running");
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

  }
  onStart = () => {
    if (Platform.OS == "ios") {
      BackgroundTimer.start();
    }

    this._interval = BackgroundTimer.setInterval(() => {

      this.getCurrentLocation()
    }, 10000);
  };
  onPause = () => {
    BackgroundTimer.clearInterval(this._interval);
  };
  onReset = () => {
    this.setState({
      second: 0,
    });
    BackgroundTimer.clearInterval(this._interval);
  };
  componentDidMount() {
 this.requestPermissions();
    this.getDirections(
      `${this.state.start[0]},${this.state.start[1]}`,
      `${this.state.end[0]},${this.state.end[1]}`
    );
    this.onStart();
  }

  checkRemainingDistance = (threshold, remainingDistance) => {
    console.log("Remainng Distance", remainingDistance);
    if (remainingDistance <= 10000) {
      // Alert.alert("AC Has Been Turned On");
      console.log("AC Has been turned on");
    }
  };

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=Add your API KEY HERE`
      );
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let timeRem = respJson.routes[0].legs[0].duration.text;
      let distanceRem = respJson.routes[0].legs[0].distance.value;

      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      this.setState(
        {
          coords: coords,
          distanceRemaining: distanceRem,
          TimeRemaining: timeRem,
        },
        () => {
          this.checkRemainingDistance(100000, this.state.distanceRemaining);
          console.log(this.state.TimeRemaining, this.state.distanceRemaining);
        }
      );

      return coords;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  onDestChange = (e) => {
    let newDestination = [
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
    ];

    this.setState({ end: newDestination }, () => {
      this.getDirections(
        `${this.state.start[0]},${this.state.start[1]}`,
        `${this.state.end[0]},${this.state.end[1]}`
      );
    });
  };

  onLocationChange = (e) => {
    let newDestination = [
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
    ];

    this.setState({ start: newDestination }, () => {
      this.getDirections(
        `${this.state.start[0]},${this.state.start[1]}`,
        `${this.state.end[0]},${this.state.end[1]}`
      );
    });
  };

  render() {
    return (
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.start[0],
            longitude: this.state.start[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            draggable
            title="Start"
            pinColor="green"
            coordinate={{
              latitude: this.state.start[0],
              longitude: this.state.start[1],
            }}
            onDragEnd={this.onLocationChange}
          >
            <Image
              source={require("../assets/car.png")}
              style={{ width: 20, height: 50, borderRadius: 40 }}
            />
          </Marker>

          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={5}
            strokeColor="black"
          />
          <Marker
            draggable
            title="End"
            pinColor="red"
            coordinate={{
              latitude: this.state.end[0],
              longitude: this.state.end[1],
            }}
            onDragEnd={this.onDestChange}
          >
            <Image
              source={this.state.Images[1]}
              style={{ width: 30, height: 30, borderRadius: 40 }}
            />
          </Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
