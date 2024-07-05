import Button from "@/components/Button";
import Header from "@/components/Header";
import Seats from "@/components/Seats";
import TimeSlot from "@/components/TimeSlot";
import Calendar from "@/components/calendar/calendar";
import { Ionicons } from "@expo/vector-icons";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setBookingDetails } from "@/redux/bookingSlice";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
const timeSlots = [
  { from: "09:00", to: "10:00" },
  { from: "10:00", to: "11:00" },
  // Add more time slots as needed
];
const BookingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const params = useRoute();

  const data = JSON.parse(params.params.item);
  const city = JSON.parse(params.params.location);
  console.log("Seat ----->>>>", city);

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const handleSeatSelect = (seatDataFromChild) => {
    setSelectedSeat(seatDataFromChild); // Update selected seats in parent state
    // Optionally, perform further actions on the selected seats here
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handler for selecting a number
  const handleSelectNumber = (number) => {
    console.log("Selected Number:", number);
    setSelectedNumber(number);
    // if (onSelect) {
    //   onSelect(number);
    // }
  };

  // Handler for selecting a time slot
  const handleSelectTimeSlot = (from: string) => {
    setSelectedTimeSlot(from);
  };
  console.log(
    "=======line69bookingscreen",
    selectedSeat,
    selectedDate,
    selectedNumber,
    selectedTimeSlot
  );

  const updateRoomDetails = () => {
    const details = {
      amenities: data?.amenities,
      images: data?.images,
      location: city,
      name: data?.name,
      price: data?.price,
   
    };
    dispatch(setBookingDetails(details));
  };


  const BookedData ={
    seat: selectedSeat,
    date: selectedDate,
    months: selectedNumber,
    slot: selectedTimeSlot, ///stll null ,need to be fixed
  }

  const confirmBooking = () => {
    console.log("Booking Confirmed", BookedData);
    updateRoomDetails();
    setIsModalVisible(false);

    router.push({
      pathname: "/library/checkout.screen",
      params: { item: JSON.stringify(BookedData) },
    });



    console.log("Booking Confirmed");
    // Perform further actions like API calls, etc.
  };

  const [Enable, setEnable] = useState("AM-PM");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 20,
        // marginBottom: 20,
      }}
    >
      <View>
        <Header color="black" />
      </View>

      <View
        style={{
          // flex: 1,
          justifyContent: "center",
        }}
      >
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
      </View>

      <View
        style={{
          flex: 1,

          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        <Seats onSeatSelect={handleSeatSelect} SeatLayout={data?.seatLayout} />
      </View>

      <TouchableOpacity
        style={{
          // flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingRight: 20,
        }}
        onPress={() => setIsModalVisible(true)}
      >
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 25,
                      fontStyle: "normal",
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    Select Period
                  </Text>
                  <View
                    style={{
                      height: 100,
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        margin: 10,
                        color: "black",
                        fontSize: 25,
                        fontStyle: "normal",
                        fontWeight: 500,
                      }}
                    >
                      {selectedNumber}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={
                        {
                          // alignContent: 'center',
                        }
                      }
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (number) => (
                          <TouchableOpacity
                            key={number}
                            style={[
                              styles.numberButton,
                              selectedNumber === number &&
                                styles.selectedNumber,
                            ]}
                            onPress={() => handleSelectNumber(number)}
                          >
                            <Text style={styles.numberText}>{number}</Text>
                          </TouchableOpacity>
                        )
                      )}
                    </ScrollView>
                  </View>
                </View>


                <View
                  style={{
                    padding: 10,
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 25,
                      fontStyle: "normal",
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    Select Slot
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                      gap: 10,
                    }}
                  >
                    <Picker
                      selectedValue={Enable}
                      style={{ height: 40, width: 200 }}
                      mode={"dialog"}
                      // onValueChange={(itemValue) => setEnable(itemValue)}

                      onValueChange={(itemValue, itemIndex) => setEnable(data.timeSlot[itemIndex])}

                    >

                      {
                        data?.timeSlot.map((slot, index) => (

                          <Picker.Item key={index} label={`${slot.from}PM - ${slot.to}PM` } value={slot} 
                          style={{color: 'gray', fontSize: 20, fontStyle: 'normal', fontWeight: 400, textAlign: 'center', borderColor: 'blue',
                            borderWidth: 1, borderRadius: 10, padding: 10, margin: 10, backgroundColor: 'white'


                          }}
                          />

                        ))
                      }
                   
                    </Picker>

                    {/* {timeSlots.map((slot) => (
                      <TimeSlot
                        key={slot.from}
                        from={slot.from}
                        to={slot.to}
                        isSelected={selectedTimeSlot === slot.from}
                        onSelect={() => handleSelectTimeSlot(slot.from)}
                      />
                    ))} */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignContent: "space-evenly",
                    alignItems: "center",
                    gap: 20,
                    padding: 10,
                    // marginTop: 20,
                  }}
                >
                  {
                    selectedDate &&
                    selectedNumber &&
                   (
                      <TouchableOpacity
                        style={{ backgroundColor: "green" }}
                        onPress={confirmBooking}
                      >
                        <Text style={{ alignItems: "center", padding: 10 }}>
                          Confirm
                        </Text>
                      </TouchableOpacity>
                    )}

                  <TouchableOpacity
                    onPress={toggleModal}
                    style={{
                      // position: "absolute",
                      // bottom: 0,
                      padding: 10,
                      backgroundColor: "red",
                      borderRadius: 90,
                      marginBottom: 20,
                    }}
                  >
                    <Ionicons name="close" size={30} color="#000" />
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>
        </View>

        <Button text="Book" width={200} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,3,0.7)", // This will give a semi-transparent background
  },
  modalView: {
    backgroundColor: "white",
    flexDirection: "column",
    // justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
    padding: 10,
    gap: 10,
    width: 300,
    height: 450,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  numberButton: {
    marginHorizontal: 10,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    height: 40,
    padding: 10,
    borderRadius: 10,
  },
  selectedNumber: {
    backgroundColor: "#007bff",
  },
  numberText: {
    color: "#000",
  },
});

export default BookingScreen;
