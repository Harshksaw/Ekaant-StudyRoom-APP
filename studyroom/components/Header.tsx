import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform, 
  PermissionsAndroid,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

const citiesData = [
  { id: 1, name: "Mumbai" },
  { id: 2, name: "Delhi" },
  { id: 3, name: "Bangalore" },
  { id: 4, name: "Hyderabad" },
  { id: 5, name: "Chennai" },
  { id: 6, name: "Kolkata" },
  { id: 7, name: "Ahmedabad" },
  { id: 8, name: "Pune" },
  { id: 9, name: "Surat" },
  { id: 10, name: "Jaipur" },
];
const Header: React.FC = () => {
  
  const [selectedLocation, setSelectedLocation] = useState();

  const [Enable, setEnable] = useState(true);
  // const [cities, setCities] = useState([]);
  // const [selectedCity, setSelectedCity] = useState("");

  return (
    <View style={styles.header}>
      <View style={styles.citySelector}>
        <Text style={styles.label}>Select City:</Text>
        <View style={styles.picker}>
          {/* <Picker
            selectedValue={selectedLocation}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLocation(itemValue)
            }
          >
            <Picker.Item label="Delhi" value="Delhi" />
            <Picker.Item label="Mumbai" value="Mumbai" />
          </Picker> */}

         
        <Picker
                      selectedValue={Enable}
                      style={{ height: 40, width: 200 }}
                      mode={"dialog"}
                      // onValueChange={(itemValue) => setEnable(itemValue)}

                      onValueChange={(itemValue, itemIndex) => setEnable(false)}

                    >

                      {
                        citiesData?.map((slot, index) => (

                          <Picker.Item key={index} label={slot.name } value={slot.name} 
                          style={{color: 'gray', fontSize: 14, fontStyle: 'normal', fontWeight: 400, textAlign: 'center', borderColor: 'blue',
                            borderBottomWidth: 2,borderRadius: 10, padding: 2, margin: 6, backgroundColor: 'white'

                          }}
                          />

                        ))
                      }
                   
                    </Picker>
        </View>
      </View>

      <View style={styles.logoContainer}>
        <Image
          height={20}
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
    // paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#f2f2f2",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
  citySelector: {
    flex: 2,
    marginLeft: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  picker: {
    zIndex: 3,
    height: 40,

    borderRadius: 4,
  },
  selectedCity: {
    flex: 1,
    alignItems: "center",
  },
  selectedCityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1, // Make content take full screen height
  },
  locationContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0", // Light background
    padding: 10,
    margin: 10,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationData: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
  },
});

export default Header;
