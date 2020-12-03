import { Button, Platform, Text, View } from "react-native";

import BackgroundTimer from "react-native-background-timer";
import React from "react";
import styles from "./Timer.styles";

class TimerComponent extends React.PureComponent {
  static defaultProps;
  constructor(props) {
    super(props);
    this.state = {
      second: 0,
    };
  }
  _interval;
  onStart = () => {
    if (Platform.OS == "ios") {
      BackgroundTimer.start();
    }

    this._interval = BackgroundTimer.setInterval(() => {
      this.setState({
        second: this.state.second + 1,
      });
    }, 1000);
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
  renderStartButton = () => {
    return <Button title="Start" onPress={this.onStart} />;
  };
  renderPauseButton = () => {
    return <Button title="Pause" onPress={this.onPause} />;
  };
  renderResetButton = () => {
    return <Button title="Reset" onPress={this.onReset} />;
  };
  renderContent = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.secondText}>{this.state.second}</Text>
        <View style={styles.buttonWrapper}>
          {this.renderStartButton()}
          {this.renderPauseButton()}
          {this.renderResetButton()}
        </View>
      </View>
    );
  };
  render() {
    const content = this.renderContent();
    return content;
  }
}
TimerComponent.propTypes = {};
TimerComponent.defaultProps = {};
export default TimerComponent;
