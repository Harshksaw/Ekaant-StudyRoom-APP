import BookingModal from "@/components/BookingModal";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Seats from "@/components/Seats";
import TimeSlot from "@/components/TimeSlot";
import Calendar from "@/components/calendar/calendar";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingScreen: React.FC = () => {
  const [seats, setSeats] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);

  const handleSeatSelect = (seatDataFromChild) => {
    setSelectedDate(seatDataFromChild); // Update selected seats in parent state
    // Optionally, perform further actions on the selected seats here
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  // Function to update seats
  const handleSeatsChange = (selectedDate: string) => {
    console.log("Selected seat:", selectedDate);
    setSeats(selectedDate);
  };


  const [selectedSlot, setSelectedSlot] = useState(null);

  // Handler to update the selected slot
  const handleTimeSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };
  
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleSelectNumber = (number) => {
    console.log("Selected Number:", number);
    setSelectedNumber(number);
    // if (onSelect) {
    //   onSelect(number);
    // }
  };

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
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
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
                    >{selectedNumber}</Text>
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
                    {[
                      { from: 11, to: 12 },
                      { from: 11, to: 22 },
                      { from: 11, to: 1 },
                    ].map((slot, index) => (
                      <TouchableOpacity key={index} onPress={() => handleTimeSlotSelect(slot)}>
                      <TimeSlot
                        from={slot.from}
                        to={slot.to}
                        selected={selectedSlot && selectedSlot.from === slot.from && selectedSlot.to === slot.to}
                        onSelect={() => handleTimeSlotSelect(slot)}
                      />
                    </TouchableOpacity>
                    ))}
                  </View>

                  <Text
                    style={{ color: "blue", fontSize: 20, fontWeight: 300 }}
                  >
                    {seats}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={toggleModal}
                  style={{
                    position: "absolute",
                    bottom: 0,
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
    height: 400,
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
