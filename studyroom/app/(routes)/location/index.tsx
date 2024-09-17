import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from 'expo-router';



const LocationsScreen = () => {

  const navigation = useNavigation();


  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  const citiesData = useSelector((state) => state.app);

  useEffect(() => {
    setLocations(citiesData.locations || []);
  }, [citiesData.locations]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        // const citiesData = useSelector((state) => state.app);

        setLocations(citiesData.locations);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
        console.log("🚀 ~ fetchData ~ citiesData.locations:", citiesData.locations)
    };

    fetchData();
  }, []);

  const handleLocationSelect = async (location) => {
    console.log('Selected location:', location);
    setSelectedLocation(location);

    try {
        console.log("🚀 ~ handleLocationSelect ~ location.name:", location.location)
      await AsyncStorage.setItem('selectedLocation', location.location);
    } catch (error) {
      console.error('Failed to save location to AsyncStorage', error);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select a location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.3449,
          longitude: 85.3117,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {locations.map((location, index) => (
          <Marker
            key={index} // Ensure each Marker has a unique key
            coordinate={{ latitude: location.coords[0], longitude: location.coords[1] }}
            title={location.location}
            onPress={() => handleLocationSelect(location)}
          />
        ))}
      </MapView>
      <FlatList
        data={locations}
        keyExtractor={(item) => item._id} // Ensure each item has a unique key
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLocationSelect(item)}>
            <Text style={styles.locationItem}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  locationItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LocationsScreen;