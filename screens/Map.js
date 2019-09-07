import React, {Fragment} from 'react';
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';

import { Stats } from './../components';


class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      roundBG: "#90EE90",
      onewayBG: "#F5F5F5",
      forceRefresh: Math.floor(Math.random() * 100),
      location: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [-122.4324, 37.78825],
                [-75.190429, 39.951804],
              ],
            }
          }
        ]
      }
    }
  }

  onPressRoundTrip = () => {
    this.setState({
      roundBG: "#90EE90",
      onewayBG: "#F5F5F5",
      location: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [-122.4324, 37.78825],
                [-75.190429, 39.951804],
              ],
            }
          }
        ]
      }
    });
  }

  onPressOneWay = () => {
    this.setState({
      roundBG: "#F5F5F5",
      onewayBG: "#90EE90",
      location: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [-75.190429, 39.951804],
                [-122.4324, 37.78825],
              ],
            }
          }
        ]
      }
    });
    this.setState({
      forceRefresh: Math.floor(Math.random() * 100)
    });
  }

  static navigationOptions = {
    header: null,
  };


  render() {
    const { navigate } = this.props.navigation;

    mapRendered = () => {
      return (
        <MapView style={styles.map}
          key={this.state.forceRefresh}
          region={{
            latitude: this.state.location.features[0].geometry.coordinates[0][1],
            longitude: this.state.location.features[0].geometry.coordinates[0][0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Geojson
            geojson= {this.state.location} />
        </MapView>
      );
    }

    return(
      <View style={styles.box}>
        { mapRendered() }
        <View style={styles.layout}>
          <View style={styles.container}>
            <Stats />
            <View>
              <TouchableHighlight
                onPress = {() => this.onPressRoundTrip()}
                style = {{backgroundColor: this.state.roundBG, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, alignItems: "center"}}
              >
                <Text>Round Trip</Text>
              </TouchableHighlight>
            </View>
            <View>
              <TouchableHighlight
                onPress = {() => this.onPressOneWay()}
                style = {{backgroundColor: this.state.onewayBG, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, alignItems: "center"}}
              >
                <Text>One-Way with Transport</Text>
              </TouchableHighlight>
            </View>
          </View>
          <Button
            title="Start"
            onPress = {() => navigate("Tracking")}
            style={{textAlign: "center", justifyContent: "center", alignItems: "center"}}
          />
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
    // alignSelf: 'stretch',
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
  },
  layout: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
})

export default Map;
