import React, {Fragment} from 'react';
import {
  View,
  Text
} from 'react-native';

import { Stats } from './../components';

class Home extends React.Component {
  render() {
    return(
      <View>
        <Text>Home Screen</Text>
        <Stats />
      </View>
    );
  }
};

export default Home;
