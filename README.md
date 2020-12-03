# BackgroundTask


This is an example of how to run a background task in react-native

In this example we are using Google Maps API and Google Directions API to show a route between a set destination and user's current location. The App will keep live update of the Users Location using react-native-geolocation-service and will do this even in background using react-native-background-timer.

To run:

Make Sure to add your Google API Key in MapViewDemo.js and AndroidManifest.xml

yarn install

npm start

react-native run-android
