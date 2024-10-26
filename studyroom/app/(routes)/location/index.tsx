import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from 'expo-router';

import axios from 'axios';
import { BACKEND } from '@/utils/config';




const LocationsScreen = () => {

  const navigation = useNavigation();


  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const citiesData = useSelector((state) => state.app);

  useEffect(() => {
    setLocations(citiesData.locations || []);
  }, [citiesData.locations]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        // const citiesData = useSelector((state) => state.app);

        const res = await axios.get(`${BACKEND}/api/v1/app/getApp`);
        const citiesData = res.data.data;
        console.log("🚀 ~ fetchData ~ res:", res.data.data.locations)

        setLocations(citiesData.locations);
        setFilteredLocations(citiesData.locations);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
        console.log("🚀 ~ fetchData ~ citiesData.locations:", citiesData.locations)
    };

    fetchData();
  }, []);

  const handleLocationSelect = async (location) => {
  console.log("🚀 ~ handleLocationSelect ~ location:", location)

    setSelectedLocation(location);

    try {

      await AsyncStorage.setItem('selectedLocation', location.location);
    } catch (error) {
      console.error('Failed to save location to AsyncStorage', error);
    }

    navigation.goBack();
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredLocations(
        locations.filter((location) =>
          location.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, 400); // Delay of 300ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery, locations]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select a location</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search locations..."
        value={searchQuery}

        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
         data={filteredLocations}
        keyExtractor={(item) => item._id} // Ensure each item has a unique key
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem} onPress={() => handleLocationSelect(item)}>
            <Image source={{ uri: item?.locationImage || "https://th.bing.com/th/id/OIP.m78y_Nupeq-RtHFEeNk5PwHaH5?rs=1&pid=ImgDetMain" }} style={styles.image} />
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
  searchBar: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 20,
    paddingHorizontal:20,
    marginBottom: 16,
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