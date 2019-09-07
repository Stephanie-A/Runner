import React, {Fragment} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import { Stats } from './../components';

import Geocode from 'react-geocode';

import RadioForm from 'react-native-simple-radio-button';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

const radio_props = [
  {label: 'Distance', value: 0 },
  {label: 'Time', value: 1 }
];

class Home extends React.Component {

  constructor(props) {
    super(props);
    Geocode.setApiKey("AIzaSyCqCRikq6mmRUpNGjyonE0R_KOZklr9WDg");
    Geocode.enableDebug();
    this.state = {
      location: '',
      radio: 'Distance',
      pref: 'Distance',
    }
  }

  getAddr = (navigate) => {
    Geocode.fromAddress(this.state.location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );
    navigate('Map');
  }

  onPress() {
    return(
      <TextInput
        placeholder={ "Enter " + this.state.radio }
        onChangeText={ (text) => this.setState({pref: text})}/>
    );
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <TextInput
          placeholder="Enter starting point"
          onChangeText={ (text) => this.setState({location: text})}/>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          formHorizontal={true}
          onPress = {(value) => {
            if (value) {
              this.setState({radio: "Time"})
            } else {
              this.setState({radio: "Distance"})
            }
          }}
        />
        { this.onPress() }
        <Button
          onPress = {() => this.getAddr(navigate)}
          title="Calculate">
          Calculate
        </Button>
      </View>
    );
  }
};

export default Home;
