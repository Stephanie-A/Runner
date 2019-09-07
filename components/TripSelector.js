import React, {Fragment} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class TripSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roundBG: "#90EE90",
      onewayBG: "#F5F5F5"
    }
  }
  onPressRoundTrip = () => {
    this.setState({
      roundBG: "#90EE90",
      onewayBG: "#F5F5F5"
    });
  }

  onPressOneWay = () => {
    this.setState({
      roundBG: "#F5F5F5",
      onewayBG: "#90EE90"
    });
  }

  render() {
    return(
      <View>
        <View>
          <TouchableHighlight
            onPress = {() => this.onPressRoundTrip()}
            style = {{backgroundColor: this.state.roundBG}}
          >
            <Text>Round Trip</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            onPress = {() => this.onPressOneWay()}
            style = {{backgroundColor: this.state.onewayBG}}
          >
            <Text>One-Way with Transport</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

export default TripSelector;
