import Button from "@/components/Button";
import Header from "@/components/Header";
import Seats from "@/components/Seats";
import TimeSlot from "@/components/TimeSlot";
import Calendar from "@/components/calendar/calendar";
import { Ionicons } from "@expo/vector-icons";
import { router, useGlobalSearchParams, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
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

const timeSlots = [
  { from: "09:00", to: "10:00" },
  { from: "10:00", to: "11:00" },
  // Add more time slots as needed
];
const BookingScreen: React.FC = () => {
  const dispatch = useDispatch(); 
  const params = useRoute()

  const data = JSON.parse(params.params.item);
  console.log("params",data);




  // QueryData.map((data) => {
  //   console.log("QueryData", data); 
  // })



  // State for managing seats selection

  // State for managing date selection
  const [selectedSeat, setSelectedSeat] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  // State for managing modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State for managing slot selection

  // State for managing number selection
  const [selectedNumber, setSelectedNumber] = useState(null);

  // State for managing time slot selection
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  
  // Handler for seat selection from child component

  const handleSeatSelect = (seatDataFromChild) => {
    setSelectedSeat(seatDataFromChild); // Update selected seats in parent state
    // Optionally, perform further actions on the selected seats here
  };
  

  // Handler for toggling modal visibility
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
  console.log("=======", selectedSeat,selectedDate, selectedNumber, selectedTimeSlot);
  const updateBookingDetails = () => {
    const details = {
      seat : selectedSeat ,
      date: selectedDate,
      months : selectedNumber,
      slot : selectedTimeSlot
    };
    dispatch(setBookingDetails(details));
  };

  const confirmBooking = () => {

    updateBookingDetails();
    setIsModalVisible(false);


    router.push("/library/checkout.screen",

    );
    console.log("Booking Confirmed");
    // Perform further actions like API calls, etc.



  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 20,
        // marginBottom: 20,
      }}
    >
      <View>
        <Header />
      </View>

      <View
        style={{
          // flex: 1,
          justifyContent: "center",
        }}
      >
           <Calendar onSelectDate={setSelectedDate} 
        selected={selectedDate}
        />
      </View>

      <View
        style={{
          flex: 1,

          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        <Seats onSeatSelect={handleSeatSelect} />
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
                    {timeSlots.map((slot) => (
                      <TimeSlot
                        key={slot.from}
                        from={slot.from}
                        to={slot.to}
                        isSelected={selectedTimeSlot === slot.from}
                        onSelect={() => handleSelectTimeSlot(slot.from)}
                      />
                    ))}
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

                  {selectedSeat?.length >0  && selectedDate && selectedNumber && selectedTimeSlot && (
                    <TouchableOpacity style={{ backgroundColor: "green" }}
                    onPress={confirmBooking}
                    >
                      <Text style={{ alignItems: "center", padding: 10 }}>Confirm</Text>
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
    backgroundColor: "rgba(0,0,0,0.5)", // This will give a semi-transparent background
  },
  modalView: {
    backgroundColor: "white",
    flexDirection: "column",
    // justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
    padding: 10,
    gap: 20,
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
