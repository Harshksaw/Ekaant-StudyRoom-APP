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
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import { setBookingDetails } from "@/redux/bookingSlice";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Month } from "@/assets";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import ToggleBookingButton from "@/components/ToggleBooking";
import { Toast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND } from "@/utils/config";
// const timeSlots = [
//   { from: "09:00", to: "10:00" },
//   { from: "10:00", to: "11:00" },
//   // Add more time slots as needed
// ];

const BookingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const params = useRoute();

  const data = JSON.parse(params.params.item);
  const city = JSON.parse(params.params.location);
  // console.log("Seat ----->>>>", data);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setselectedMonth] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingloader, setBookingLoader] = useState(false);
  const [bookingId, setBookingId] = useState(null);


  const [currentRoomNo, setCurrentRoomNo] = useState(1);

  const handleSeatSelect = (seatDataFromChild) => {
    // console.log("Selected Seat-------------------:", seatDataFromChild);

    setSelectedSeat(seatDataFromChild); // Update selected seats in parent state
    // console.log("Selected Seat-------------------:>>>>>>", selectedSeat);
    // Optionally, perform further actions on the selected seats here
  };

  const handleSelectSlot = (selectedSlot) => {
    // console.log(selectedSlots, "Selected Slot");
    if (selectedSlots.find((slot) => slot._id === selectedSlot._id)) {
      // If the slot is already selected, remove it from the array
      setSelectedSlots(
        selectedSlots.filter((slot) => slot._id !== selectedSlot._id)
      );
    } else {
      // Otherwise, add the slot to the array
      setSelectedSlots([...selectedSlots, selectedSlot]);
    }
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  interface DataItem {
    _id: string;
    from: string;
    to: string;
  }

  const updateRoomDetails = async() => {

    console.log(data, "Data944");
    const details = {
      id: data._id,
      amenities: data.amenities,
      images: data.images,
      location: city,
      name: data.name,
      price: data.price,
    };
    dispatch(setBookingDetails(details));
  };
  const [forFriend, setForFriend] = useState(false);



  const BookedData = {
    seat: selectedSeat,
    date: selectedDate,
    months: selectedMonth,
    room: currentRoomNo,


    slot: selectedSlots, ///stll null ,need to be fixed
  };

  const handleData = (data: DataItem[]) => {
    return data.map((item) => {
      if (item.from === "0" && item.to === "24") {
        // Modify the item to indicate 24/7 availability
        // This is just an example, adjust according to your needs
        return { ...item, availability: "24/7" };
      }
      return item;
    });
  };
  const available = handleData(data.timeSlot);

  const userDetails = useSelector((state: any) => state.user);


  const bookingdata = useSelector((state: any) => state.booking);

  const location = bookingdata?.details?.location;

  const price = bookingdata.details.price || 6000;
  const RegistrationFees = 1000;

  const subtotal = Number((price + RegistrationFees).toFixed(2));


  const totalAmount = subtotal;

  // console.log("Booked Data:", data );
  const BookingDate = BookedData.date;
  const BookingMonths = BookedData.months;
  const BookingSeat = BookedData.seat;
  const BookingSlot = BookedData.slot;
  const RoomNo = BookedData.room || 1;

  const PreBook = async () => {
    const userData = await AsyncStorage.getItem("userData");
    const userid = JSON.parse(userData || "{}");
    const userId = userid.user._id;
    console.log(
      userId,
      bookingdata.details.id,
      price,
      totalAmount,
      BookingSlot,
      RoomNo,
      BookingSeat,
      BookingDate,
      BookingMonths,
      "/////------------------->"
    );
    if (
      userId &&
      bookingdata.details.id &&
      price &&
      totalAmount &&
      BookingSlot &&
      RoomNo &&
      BookingSeat &&
      BookingDate &&
      BookingMonths
    ) {
  
      try {
        // console.log(userDetails.friendDetails, "-----977");


        const response = await axios.post(
          `${BACKEND}/api/v1/booking/createBooking`,
          {
            userId: userId,
            libraryId: bookingdata.details.id,
            initialPrice: price,
            finalPrice: totalAmount,
            timeSlot: BookingSlot,
            roomNo: RoomNo,
            bookedSeat: BookingSeat,
            bookingDate: BookingDate,
            bookingPeriod: BookingMonths,
            forFriend: userDetails.friendDetails,
          }
        );

        console.log(response.data, "+++++------------------->");
        const bookingId = response.data.Booking._id;
        setBookingId(bookingId);
  
        // console.log("Booking ID", bookingId);
  
        Toast.show("Booking Successful !", {
          type: "success",
          placement: "top",
          animationDuration: 1000,
          icon: <Ionicons name="checkmark-circle" size={24} color="green" />,
  
          duration: 3000,
        });
  
        console.log(response.data, "------------------->");
        return response.data.Booking._id;
      } catch (error) {
        setBookingLoader(false);
        setIsModalVisible(false);
  
        console.log("Error:", error);
        Toast.show("Error in Booking !", {
          type: "error",
          placement: "top",
          animationDuration: 1000,
          icon: <Ionicons name="alert-circle" size={24} color="red" />,
  
          duration: 3000,
        });
        return null;
      }


  

    }

  
  };


  const confirmBooking = async () => {
    setBookingLoader(true);
    await updateRoomDetails();
    console.log(
      bookingdata.details.id,
      price,
      totalAmount,
      BookingSlot,
      RoomNo,
      BookingSeat,
      BookingDate,
      BookingMonths,
      RoomNo,
      "------------------->"
    );
    const res = await PreBook();


    if (res) {
      // console.log("Booking Confirmed", BookedData);
      setBookingLoader(false);
      setIsModalVisible(false);
      console.log("Booking ID254 boking", bookingId);

      router.push({
        pathname: "/library/checkout.screen",
        params: { item: JSON.stringify(BookedData), id: JSON.stringify(bookingId) },
      });



    } else {
      setBookingLoader(false);

      setIsModalVisible(false);
    }



  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
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
          width: "100%",
          paddingHorizontal: 10,
          marginHorizontal: 10,
        }}
      >
        <Picker
          selectedValue={currentRoomNo}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue, itemIndex);
            setCurrentRoomNo(itemValue);
          }}
          style={{
            borderRadius: 20,
            width: "50%",
            // backgroundColor: "red",
          }}
          mode="dropdown"
        >
          {data?.rooms.map(  (item, index  )=> (
            <Picker.Item
            key={index}
              style={{
                fontSize: 20,
                borderRadius: 50,
              }}
              key={item.roomNo}
              label={` Room ${item.roomNo }`}
              value={`${item.roomNo }`}
            />
          ))
          }

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
        {/* //seating arrangement */}

        <Seats onSeatSelect={handleSeatSelect} SeatLayout={data?.rooms} currentRoom={currentRoomNo} />
        
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
                      marginTop: 20,
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
                          // console.log(itemValue, itemIndex);
                          setselectedMonth(itemValue);
                        }}
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
                      flexDirection: "row-reverse",

                      rowGap: 10,

                      flexWrap: "wrap",
                      justifyContent: "center",
                      padding: 10,
                      gap: 10,

                      height: 125,
                      maxWidth: 300,
                    }}
                  >
                    {available.map((slot, index) => {
                      if (slot?.availability) {

                        return (
                          <View
                            key={slot._id}
                            style={{
                              maxWidth: 70,
                              marginHorizontal: 50,
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                padding: 10,
                                gap: 5,
                                backgroundColor: selectedSlots.some(
                                  (selectedSlot) =>
                                    selectedSlot._id === slot._id
                                )
                                  ? "rgb(204, 243, 177)"
                                  : "rgb(236, 233, 233)",
                                borderRadius: 10,
                                alignItems: "center",
                              }}
                              onPress={() => handleSelectSlot(slot)}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 15,
                                  fontWeight: 600,
                                }}
                              >
                                {slot.availability}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      } else {
                        // Render regular time slots

                        return (
                          <View key={slot._id}>
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 10,
                                gap: 5,
                                backgroundColor: selectedSlots.some(
                                  (selectedSlot) =>
                                    selectedSlot._id === slot._id
                                )
                                  ? "rgb(204, 243, 177)"
                                  : "rgb(236, 233, 233)",
                                borderRadius: 10,
                                alignItems: "center",
                              }}
                              onPress={() => handleSelectSlot(slot)} // Step 3: Attach event handler
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 15,
                                  fontWeight: "600",
                                }}
                              >
                                {slot.from}
                                {slot.from < 12 ? "AM" : "PM"}
                                {" -"}
                              </Text>
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 15,
                                  fontWeight: "600",
                                }}
                              >
                                {slot.to}
                                {slot.to < 12 ? "AM" : "PM"}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }
                    })}
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

                    marginTop: 10,
                  }}
                >
                  {selectedDate &&
                    selectedSeat &&
                    selectedMonth &&
                    selectedSlots && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "rgb(93, 223, 38)",
                          marginTop: 10,
                          borderRadius: -10,
                        }}
                        onPress={confirmBooking}
                      >
                        {bookingloader ? (
                          <ActivityIndicator size="small" color="#000" />
                        ) : (
                          <Text style={{ alignItems: "center", padding: 10 }}>
                            Confirm
                          </Text>
                        )}
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
                      marginBottom: -20,
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
