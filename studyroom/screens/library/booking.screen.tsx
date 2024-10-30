import Button from "@/components/Button";

import Seats from "@/components/Seats";

import Calendar from "@/components/calendar/calendar";
import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";
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

import ToggleBookingButton from "@/components/ToggleBooking";
import { Toast } from "react-native-toast-notifications";
// import Toast from 'react-native-toast-message'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND } from "@/utils/config";

const BookingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const params = useRoute();

  const dataK = JSON.parse(params?.params?.item);

  const city = JSON.parse(params?.params?.location);

  const [data, setData] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingloader, setBookingLoader] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const [currentRoomNo, setCurrentRoomNo] = useState(1);
  const [forFriend, setForFriend] = useState(false);
  const [Loading, setLoading] = useState(true);
  const userDetails = useSelector((state: any) => state.user);
  const bookingData = useSelector((state: any) => state.booking);
const [libraryDetails , setLibraryDetails] = useState(null)
  const price = bookingData.details.price || 6000;
  const registrationFees = 1000;
  const subtotal = Number((price + registrationFees).toFixed(2));
  const totalAmount = subtotal;

  const BookedData = {
    seat: selectedSeat,
    date: selectedDate,
    months: selectedMonth,
    room: currentRoomNo,
    slot: selectedSlots,
  };

  console.log("SELECT", selectedSlots);
  useEffect(() => {

    const totalPrice = selectedSlots.reduce((acc, slot) => acc + Number(slot.price), 0);

    setFinalPrice(totalPrice * selectedMonth);
  }, [selectedSlots, selectedMonth]);

  const handleSeatSelect = (seatDataFromChild) => {
    setSelectedSeat(seatDataFromChild);
  };

  const handleSelectSlot = (selectedSlot) => {
    if (selectedSlots.find((slot) => slot._id === selectedSlot._id)) {
      setSelectedSlots(
        selectedSlots.filter((slot) => slot._id !== selectedSlot._id)
      );
    } else {
      setSelectedSlots([...selectedSlots, selectedSlot]);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const updateRoomDetails = async () => {
    const details = {
      id: libraryDetails?._id,
      amenities: libraryDetails.amenities,
      images: libraryDetails.images,
      location: city,
      name: libraryDetails.name,
      price: finalPrice,
    };
    console.log("🚀 ~ updateRoomDetails ~ details:", details);
    dispatch(setBookingDetails(details));
  };
  const handleData = (data: DataItem[]) => {
    return data?.map((item) => {
      if (item.from === "0" && item.to === "24") {
        // Modify the item to indicate 24/7 availability
        // This is just an example, adjust according to your needs
        return { ...item, availability: "24/7" };
      }
      return item;
    });
  };

  const available = handleData(selectedSeat?.timeSlots);

  const PreBook = async () => {
    const userData = await AsyncStorage.getItem("userData");

    const userid = JSON.parse(userData);
    console.log("🚀 ~ PreBook ~ userid:", userid)

    const userId = userid.data.user_id._id;
    console.log("🚀 ~ PreBook ~ userId:", userId)

    if (!userId) {
      Toast.show("Error is App , Relogin", {
        type: "error",
      });

    }
console.log("🚀 ~ PreBook ~ BookedData:",   userId ,
  "-----",
  bookingData.details.id ,
  "-----",
  finalPrice ,
  "-----",
  totalAmount ,
  "-----",
  BookedData.slot ,
  "-----",

  BookedData.room ,
  "-----",
  BookedData.seat ,
  "-----",
  BookedData.date ,
  "-----",
  BookedData.months)

    if (
      userId &&
      bookingData.details.id &&
      finalPrice &&
      totalAmount &&
      BookedData.slot.length &&
      BookedData.room &&
      BookedData.seat &&
      BookedData.date &&
      BookedData.months
    ) {
      try {
        const response = await axios.post(
          `${BACKEND}/api/v1/booking/createBooking`,
          {
            userId,
            libraryId: bookingData.details.id,
            initialPrice: price,
            finalPrice,
            timeSlot: BookedData.slot,
            roomNo: BookedData.room,
            bookedSeat: BookedData.seat,
            bookingDate: BookedData.date,
            bookingPeriod: BookedData.months,
            forFriend: userDetails.friendDetails,
          }
        );

        const bookingId = response.data.Booking._id;
        setBookingId(bookingId);

        console.log(response, "111");
        if (response.status === 200 || response.status === 201) {
          Toast.show("Booking Successful", {
            type: "success",
          });
        }

        resetBookingState();
        return bookingId;
      } catch (error) {
        handleBookingError(error);
        return null;
      }
    }
  };

  const confirmBooking = async () => {
    setBookingLoader(true);
    await updateRoomDetails();

    const res = await PreBook();
    if (res) {
      setBookingLoader(false);
      setIsModalVisible(false);

      const newBookingData = {
        bookedSeat: selectedSeat,
        bookingDate: selectedDate,
        bookingPeriod: selectedMonth,
        roomNo: currentRoomNo,
        timeSlot: selectedSlots,
        price: finalPrice,
      };

      const Bookdata = { ...newBookingData, libraryId: libraryDetails };
      router.push({
        pathname: "/library/checkout.screen",
        params: {
          item: JSON.stringify(Bookdata),
        },
      });
    } else {
      setBookingLoader(false);
      setIsModalVisible(false);
    }
  };

  const resetBookingState = () => {
    setSelectedSeat(null);
    setSelectedDate(null);
    setSelectedMonth(1);
    setCurrentRoomNo(1);
    setSelectedSlots([]);
  };

  const handleBookingError = (error) => {
    setBookingLoader(false);
    setIsModalVisible(false);
    console.error("Error:", error);
    Toast.show("Error booking");
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.post(
        `${BACKEND}/api/v1/library/getLibraryRooms`,
        {
          id: dataK._id,
        }
      );
      console.log("🚀 ~ response--->:", response.data.data.rooms);
      setLibraryDetails(response.data.data)
      return response.data.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchRooms().then((data) => {
      console.log("🚀 ~ data:", data);
      setData(data.rooms);
      setLoading(false);
    });
  }, []);


  if (Loading || data === null) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        marginTop: 10,
        paddingTop: 50,
        paddingBottom: 20,
        marginBottom: 20,
        gap: 30,
      }}
    >
      {/* <View>
        <Header color="black" />
      </View> */}

      <View
        style={{
          // flex: 1,

          flexDirection: "column",
          alignItems: "center",
          gap: 10,

          // justifyContent: "center",
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
          {data?.map((item, index) => (
            <Picker.Item
              key={index}
              style={{
                fontSize: 20,
                borderRadius: 50,
              }}
              key={item.roomNo}
              label={` Room ${item.roomNo}`}
              value={`${item.roomNo}`}
            />
          ))}
        </Picker>
        <ToggleBookingButton />
      </View>

      <ScrollView
        // horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row", // Ensures the seats are laid out in rows
          flexWrap: "wrap", // Allows wrapping into multiple lines if needed
          justifyContent: "center",
        }}
        // style={{
        //   flex: 1,

        //   marginBottom: 10,
        //   // justifyContent: "center",
        // }}
      >
        {/* //seating arrangement */}
        {data && data[currentRoomNo - 1].seats.length !== 0 && (
          <Seats
            onSeatSelect={handleSeatSelect}
            SeatLayout={data[currentRoomNo - 1].seats}
            currentRoom={currentRoomNo}
          />
        )}
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
                          setSelectedMonth(itemValue);
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
                    {/* //Time Slots */}
                    {available?.map((slot, index) => {
                      if (slot?.availability && slot?.from !== null) {
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
                      } else if (slot?.from !== null) {
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
                                {slot.from ? slot.from + " -" : ""}
                              </Text>
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 15,
                                  fontWeight: "600",
                                }}
                              >
                                {slot.to}
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
                    gap: 10,
                    padding: 10,

                    marginTop: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#000",
                        margin: 10,
                        textAlign: "center",
                      }}
                    >
                      Price :
                      <Text
                        style={{
                          fontSize: 24, // Larger font size
                          fontWeight: "bold", // Bold text
                          color: "#E91E63", // A distinct color
                          margin: 10, // Add some margin around the text
                          textAlign: "center",
                        }}
                      >
                        {finalPrice}
                      </Text>
                    </Text>
                  </View>
                  {selectedDate &&
                    selectedSeat &&
                    selectedMonth &&
                    selectedSlots && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "rgb(93, 223, 38)",
                          marginTop: 10,
                          borderRadius: 15,
                          paddingHorizontal: 10,
                        }}
                        onPress={confirmBooking}
                      >
                        {bookingloader ? (
                          <ActivityIndicator size="large" color="#000" />
                        ) : (
                          <Text
                            style={{
                              alignItems: "center",
                              padding: 15,
                              borderRadius: 20,
                              fontSize: 15,

                              fontWeight: "bold",
                            }}
                          >
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
    gap: 5,
    width: 300,
    height: 600,
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
