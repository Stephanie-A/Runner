import React, {Fragment} from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

import { TripSelector, Stats } from './../components';

class Map extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text>Map Screen</Text>
        <Stats />
        <TripSelector />
        <Button
          title="Start"
          onPress = {() => navigate("Tracking")}
        />
      </View>
    );
  }
};

export default Map;
