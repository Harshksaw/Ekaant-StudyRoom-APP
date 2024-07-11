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
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";

import { setBookingDetails } from "@/redux/bookingSlice";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Month } from "@/assets";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import ToggleBookingButton from "@/components/ToggleBooking";
import { Toast } from "react-native-toast-notifications";
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
  // console.log("Seat ----->>>>", city);

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setselectedMonth] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(data?.timeSlot[0]);
  const handleSeatSelect = (seatDataFromChild) => {
    console.log("Selected Seat-------------------:", seatDataFromChild);

    setSelectedSeat(seatDataFromChild); // Update selected seats in parent state
    console.log("Selected Seat-------------------:>>>>>>", selectedSeat);
    // Optionally, perform further actions on the selected seats here
  };


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


  // useEffect(() => {
  //   console.log("Selected Month:", selectedMonth);
  //   console.log(
  //     "--------------------------------------------",
  //     "Booking Details - Seat:", selectedSeat,
  //     "\n , Date:", selectedDate,
  //     ", Time Slot:", selectedTimeSlot,
  //     "--------------------------------------------",
  //   );

  // }, [selectedMonth, selectedDate, selectedSeat, selectedTimeSlot])



  // console.log(
  //   "=======line69bookingscreen",
  //   selectedSeat,
  //   selectedDate,

  //   selectedTimeSlot
  // );


  const updateRoomDetails = () => {
    const details = {
      id: data?._id,
      amenities: data?.amenities,
      images: data?.images,
      location: city,
      name: data?.name,
      price: data?.price,
    };
    dispatch(setBookingDetails(details));
  };
const [forFriend, setForFriend] = useState(false);

// useEffect(()=>{
  // const userDetails = useSelector((state: any) => state.user);
  // console.log(userDetails, "-----------------")

// },[])



  const BookedData = {
    seat: selectedSeat,
    date: selectedDate,
    months: selectedMonth,
    slot: selectedTimeSlot, ///stll null ,need to be fixed

  };

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
          marginTop: -40,
          // backgroundColor:'red',
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 55,
          width: '100%',
          paddingHorizontal: 10,
          marginHorizontal: 10

        }}
      >
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue, itemIndex) => {

            console.log(itemValue, itemIndex)
            setselectedMonth(itemValue)
          }
          }
          style={{
            borderRadius: 20,
            width: '50%',
            // backgroundColor: "red",

          }}
          mode="dropdown"
        >
          {Array.from({ length: 3 }, (_, i) => (
            <Picker.Item
              style={{
                fontSize: 20,
                borderRadius: 50,
              }}


              key={i}
              label={` Room ${i + 1}`}
              value={`${i + 1}`}
            />
          ))}
        </Picker>
        <ToggleBookingButton />



      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // horizontal={true}
        style={{
          flex: 1,

          marginBottom: 10,
          // justifyContent: "center",
        }}
      >

        <Seats onSeatSelect={handleSeatSelect} SeatLayout={data?.seatLayout} />
      </ScrollView>

      <TouchableOpacity
        style={{
          // flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

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
                    style={
                      {
                        // flexDirection:'row'
                        // height: 100,
                        // alignItems: "space-between",
                        // backgroundColor: "red",
                      }
                    }
                  >
                    <View
                      style={{
                        position: "relative",
                        right: 10,
                        top: 45,

                        // backgroundColor: "blue",
                      }}
                    >
                      <Month />
                    </View>

                    <View
                      style={{
                        position: "relative",
                        left: 20,
                      }}
                    >
                      <Picker
                        selectedValue={selectedMonth}
                        onValueChange={(itemValue, itemIndex) => {

                          console.log(itemValue, itemIndex)
                          setselectedMonth(itemValue)
                        }
                        }
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <Picker.Item


                            key={i}
                            label={`${i + 1} month${i === 0 ? "" : "s"}`}
                            value={`${i + 1}`}
                          />
                        ))}
                      </Picker>
                    </View>
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
                      selectedValue={selectedTimeSlot}
                      style={{ height: 40, width: 200 }}
                      mode={"dialog"}


                      onValueChange={(itemValue, itemIndex) =>

                        setSelectedTimeSlot(itemValue)

                      }
                    >
                      {data?.timeSlot.map((slot, index) => (
                        <Picker.Item
                          key={index}
                          label={`${slot.from}PM - ${slot.to}PM`}
                          value={slot}
                          style={{
                            color: "gray",
                            fontSize: 20,
                            fontStyle: "normal",
                            fontWeight: 400,
                            textAlign: "center",
                            borderColor: "blue",
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 10,
                            margin: 10,
                            backgroundColor: "white",
                          }}
                        />
                      ))}
                    </Picker>
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

                  {selectedDate && selectedSeat && selectedMonth && selectedTimeSlot && (
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
        <TouchableOpacity

          onPress={() => {
            router.push("(routes)/friend");

          }}
          style={{
            backgroundColor: "yellow",
            padding: 10,
            borderRadius: 50,
          }}
        >

          <Ionicons name="person-add-outline" size={24} color="black" />
        </TouchableOpacity>


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
    justifyContent: "center",

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
