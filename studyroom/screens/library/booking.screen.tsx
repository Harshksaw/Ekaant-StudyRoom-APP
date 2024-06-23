import BookingModal from "@/components/BookingModal";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Seats from "@/components/Seats";
import TimeSlot from "@/components/TimeSlot";
import Calendar from "@/components/calendar/calendar";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
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
//   useEffect(() => {
//     console.log(selectedDate);
//   }, [selectedDate]);

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
           <Seats
      onSeatSelect={handleSeatSelect}
      />
     
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
                    }}
                  >
                    Select Period
                  </Text>

                  <Text
                    style={{ color: "blue", fontSize: 20, fontWeight: 300, marginTop: 10, textAlign: "center"}}
                  >
                    {selectedDate}
                  </Text>
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
                        {from:11, to:12},
                        {from:11, to:22},
                        {from:11, to:1}


                    ].map((slot, index) => (
                      <TimeSlot 
                      key={index} 
                      from={slot.from}
                        to={slot.to}
                      />
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
});

export default BookingScreen;
