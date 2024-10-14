import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
  
      <FlatList
        data={locations}
        keyExtractor={(item) => item._id} // Ensure each item has a unique key
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem} onPress={() => handleLocationSelect(item)}>
            <Image source={{ uri: item?.image || "https://th.bing.com/th/id/OIP.m78y_Nupeq-RtHFEeNk5PwHaH5?rs=1&pid=ImgDetMain" }} style={styles.image} />
            <Text style={styles.locationItem}>{item?.location}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  gridItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  locationItem: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LocationsScreen;