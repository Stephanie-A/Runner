import React, {Fragment} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

import { Stats } from './../components';

import Geocode from 'react-geocode';

import RadioForm from 'react-native-simple-radio-button';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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
      <View style = {styles.box}>
        <MapView
          provider = {PROVIDER_GOOGLE}
          region={{
            latitude: 39.951665,
            longitude: -75.190424,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        />
        <View style={styles.container}>
          <TextInput
            placeholder="Enter starting point"
            onChangeText={ (text) => this.setState({location: text})}/>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            radioStyle={{paddingTop: 20, paddingRight: 30}}
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  map: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    zIndex: 10,
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'stretch',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  box: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

export default Home;
