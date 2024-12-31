import Button from "@/components/Button";
import moment from "moment";
import Seats from "@/components/Seats";

import Calendar from "@/components/calendar/calendar";
import { Feather, Ionicons } from "@expo/vector-icons";

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

import ToggleBookingButton from "@/components/ToggleBooking";
import { Toast } from "react-native-toast-notifications";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND } from "@/utils/config";
import Header from "@/components/Header";
import { h, vw, w } from "@/constants/size";
import ff from "@/constants/fonts";

const BookingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const params: any = useRoute();

  const Library = JSON.parse(params.params?.item);

  const city = JSON.parse(params?.params?.location);

  const bookingData = useSelector((state: any) => state.booking);
  const userDetails = useSelector((state: any) => state.user);

  const [data, setData] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingloader, setBookingLoader] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const [currentRoomNo, setCurrentRoomNo] = useState(1);
  const [showRooms, setShowRooms] = useState(false);
  const [Loading, setLoading] = useState(true);

  const [libraryDetails, setLibraryDetails] = useState<any>(null);

  const price = bookingData.details.price;
  console.log("🚀 ~ bookingData.details:", bookingData.details.price)
  const [totalAmount, setTotalAmount] = useState(0);

  // const subtotal = Number((price + registrationFees).toFixed(2));
  // const totalAmount = subtotal;

  const BookedData = {
    seat: selectedSeat,
    date: selectedDate,
    months: selectedMonth,
    room: currentRoomNo,
    slot: selectedSlots,
  };
  console.log("🚀 ~ BookedData.selectedDate:", selectedDate);

  useEffect(() => {
    const totalPrice = selectedSlots.reduce(
      (acc, slot) => acc + Number(slot.price),
      0
    );

    setFinalPrice(totalPrice * selectedMonth);
    const registrationFees = libraryDetails?.registrationFees || 0;

    setTotalAmount(registrationFees + totalPrice * selectedMonth);
  }, [selectedSlots, selectedMonth]);

  const handleSeatSelect = (seatDataFromChild) => {
    setSelectedSeat(seatDataFromChild);
  };

  const handleSelectSlot = (selectedSlot) => {
    if (selectedSlots.find((slot) => slot.id === selectedSlot.id)) {
      setSelectedSlots(
        selectedSlots.filter((slot) => slot.id !== selectedSlot.id)
      );
    } else {
      setSelectedSlots([...selectedSlots, selectedSlot]);
    }

  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setBookingLoader(false);
  };

  const updateRoomDetails = async () => {
    const details = {
      id: libraryDetails?.id,
      amenities: libraryDetails.amenities,
      images: libraryDetails.images,
      location: city,
      name: libraryDetails.name,
      price: finalPrice,
    };
    dispatch(setBookingDetails(details));
  };
  const handleData = (data: DataItem[]) => {
    return data?.map((item) => {
      if (item.from === "12:00 AM" && item.to === "12:00 PM") {
        // Modify the item to indicate 24/7 availability
        // This is just an example, adjust according to your needs
        return { ...item, availability: "24/7" };
      }
      return item;
    });
  };

  const available = handleData(
    selectedSeat?.timeSlots.filter((slot) => slot.booked === false)
  );

  // console.log("🚀 ~ selectedSeat:", selectedSeat)

  const PreBook = async () => {
    const userData = await AsyncStorage.getItem("userData");

    const userid = JSON.parse(userData);

    const userId = userid.data?.user_id?.id;

    if (!userId) {
      Toast.show("user data not confirgured properly, Relogin", {
        type: "error",
      });
    }

    if (
      userId &&
      finalPrice &&
      totalAmount &&
      BookedData.slot.length > 0 &&
      BookedData.room &&
      BookedData.seat &&
      BookedData.date &&
      BookedData.months
    ) {
      try {
        console.log("🚀 ~ PreBook ~ BookedData:", price);
        const response = await axios.post(
          `${BACKEND}/api/v1/booking/createBooking`,
          {
            userId,
            libraryId: libraryDetails?.id,
            initialPrice: price ,
            finalPrice: totalAmount,

            timeSlot: BookedData.slot,
            roomNo: BookedData.room,
            bookedSeat: BookedData.seat,
            bookingDate: BookedData.date,
            bookingPeriod: BookedData.months,
            forFriend: userDetails.friendDetails,
          }
        );

        const bookingId = response.data.Booking.id;
        // console.log("🚀 ~ PreBook ~ bookingId11:", bookingId)
        setBookingId(bookingId);

        if (response.status === 200 || response.status === 201) {
          Toast.show("Booking Successful", {
            type: "success",
          });
        }

        return bookingId;
      } catch (error) {
        console.error("Error:", error);
        handleBookingError(error);
        return null;
      }
    }
  };

  const resetBookingState = () => {
    setSelectedSeat(null);
    // setSelectedDate(null);
    setSelectedMonth(1);
    setCurrentRoomNo(1);
    setSelectedSlots([]);
  };

  const handleBookingError = (error) => {
    setBookingLoader(false);
    setIsModalVisible(false);

    Toast.show("Error booking");
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.post(
        `${BACKEND}/api/v1/library/getLibraryRooms`,
        {
          id: Library.id,
        }
      );
      setLibraryDetails(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getLib = async () => {
    const bookingData = useSelector((state: any) => state.booking);
    return bookingData;
  };

  useEffect(() => {
    fetchRooms().then((data) => {
      setData(data.rooms);
      setLoading(false);
      console.log("🚀 ~ fetchRooms ~ data.rooms:", data.rooms);
    });
  }, []);

  if (Loading || data === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#000"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: w(10),
            borderRadius: 20,
          }}
        />
      </View>
    );
  }

  // const formatTime = (time) => {
  //   return moment(time, ["h:mm A"]).format("HH:mm");
  // };

  const displayTimeRange = (from, to) => {
    if (from === "12:00 AM" && to === "11:59 PM") {
      return `24/7`;
    }
    return `${from} - ${to}`;
  };
  const confirmBooking = async () => {
    setBookingLoader(true);
    await updateRoomDetails();
    const res = await PreBook();
    console.log("🚀 ~ confirmBooking ~ res:", res);
    setBookingLoader(false);

    if (res) {
      setIsModalVisible(false);

      const newBookingData = {
        bookedSeat: selectedSeat,
        registrationFees: libraryDetails?.registrationFees,
        bookingDate: selectedDate,
        bookingPeriod: selectedMonth,
        roomNo: currentRoomNo,
        timeSlot: selectedSlots,
        price: finalPrice,
        totalAmount,
      };

      const Bookdata = {
        ...newBookingData,
        libraryId: libraryDetails,
        bookingId: res,
      };
      // console.log("🚀 ~ confirmBooking ~ Bookdata:", Bookdata)
      router.push({
        pathname: "/library/checkout.screen",
        params: {
          item: JSON.stringify(Bookdata),
        },
      });

      resetBookingState();
    } else {
      // console.log("🚀 ~ confirmBooking ~ res", res)
      Toast.show("Booking failed. Please try again.", {
        type: "error",
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingBottom: 20,
        paddingTop: 40,
      }}
    >
      <Header color="black" />
      <Text
        style={{
          color: "#000",
          fontSize: w(30),
          fontFamily: ff.deckSemiBold,
          paddingLeft: 20,
        }}
      >
        Booking - {Library.name}
      </Text>

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          marginTop: h(10),
        }}
      >
        {/* <Calendar onSelectDate={setSelectedDate} selected={selectedDate} /> */}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          marginHorizontal: w(20),
          marginBottom: h(10),
        }}
      >
        <TouchableOpacity
          onPress={() => setShowRooms(!showRooms)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            paddingVertical: w(7),
            paddingHorizontal: w(10),
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: w(12), fontFamily: ff.deckMedium }}>
            Room {currentRoomNo}
          </Text>
        </TouchableOpacity>
        {showRooms && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "#fff",
              padding: w(10),
              zIndex: 999,
              top: "120%",
              elevation: 10,
              borderRadius: 10,
            }}
          >
            {data?.map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={{
                  borderRadius: 5,
                  paddingHorizontal: w(25),
                  paddingVertical: w(8),
                  borderWidth: 1,
                  marginBottom: 5,
                }}
                onPress={() => {
                  setCurrentRoomNo(item.roomNo);
                  setShowRooms(false);
                }}
              >
                <Text style={{ fontSize: w(12), fontFamily: ff.deckMedium }}>
                  {` Room ${item.roomNo}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

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
      >
        {data && data[currentRoomNo - 1].seats.length !== 0 && (
          <Seats
            onSeatSelect={handleSeatSelect}
            door={data[currentRoomNo - 1].doorPosition}
            SeatLayout={data[currentRoomNo - 1].seats}
            currentRoom={currentRoomNo}
          />
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: w(24),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("(routes)/friend");
          }}
          style={{
            backgroundColor: "transparent",
            padding: 10,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "#414141",
            width: 50,
            height: 50,
          }}
        >
          <Ionicons name="person-add-outline" size={24} color="#706f6f" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingRight: 20,
            opacity: !selectedSeat ? 0.6 : 1,
          }}
          onPress={() => {
            if (!selectedDate) {
              Toast.show("Please Select Date");
              return;
            }
            if (!selectedSeat) {
              Toast.show("Please Select Select");
              return;
            }
            setIsModalVisible(true);
          }}
        >
          <Button text="Book" width={200} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                position: "absolute",
                top: 0,
                padding: 10,
                borderRadius: 90,
                right: 0,
                zIndex: 999,
              }}
            >
              <Ionicons name="close" size={30} color="#000" />
            </TouchableOpacity>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#ECECEC",
                width: "100%",
                paddingBottom: h(5),
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: w(30),
                  fontFamily: ff.deckBold,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Select Period
              </Text>

              <View
                style={{
                  position: "relative",
                  left: w(28),
                  marginTop: 10,
                  width: "50%",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{ position: "absolute", left: w(-12), top: w(12) }}
                >
                  <Feather name="calendar" size={w(20)} />
                </View>
                <Picker
                  style={{ width: "80%", marginLeft: w(15) }}
                  selectedValue={selectedMonth}
                  onValueChange={(itemValue, itemIndex) => {
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

            <View
              style={{
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: w(30),
                  fontFamily: ff.deckBold,
                  textAlign: "center",
                }}
              >
                Select Slot
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  rowGap: 10,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  padding: 10,
                  gap: 10,
                }}
              >
                {available?.map((slot, index) => {
                  const selected = selectedSlots.some(
                    (selectedSlot) => selectedSlot.id === slot.id
                  );
                  if (slot?.availability && slot?.from !== null) {
                    return (
                      <View
                        key={slot.id}
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
                            backgroundColor: selected ? "#0077B6" : "#fff",
                            borderWidth: 1,
                            borderRadius: 3,
                            borderColor: "#a09f9f",
                            alignItems: "center",
                          }}
                          onPress={() => handleSelectSlot(slot)}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: w(13),
                              fontFamily: ff.deckMedium,
                              color: selected ? "#fff" : "#000",
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
                      <View key={slot.id}>
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            padding: 10,
                            gap: 5,
                            backgroundColor: selected ? "#0077B6" : "#fff",
                            borderWidth: 1,
                            borderRadius: 3,
                            borderColor: "#a09f9f",
                            alignItems: "center",
                          }}
                          onPress={() => handleSelectSlot(slot)} // Step 3: Attach event handler
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: w(13),
                              fontFamily: ff.deckMedium,
                              color: selected ? "#fff" : "#000",
                            }}
                          >
                            {displayTimeRange(slot.from, slot.to)}
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
                paddingHorizontal: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: w(15),
                    fontFamily: ff.deckMedium,
                    color: "#000",
                    marginBottom: 20,
                  }}
                >
                  Price :{" "}
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: w(18),
                      fontFamily: ff.deckMedium,
                      color: "#cb1919",
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
                      backgroundColor: "#0077B6",
                      borderRadius: 3,
                      marginBottom: h(10),
                      opacity: !selectedSlots.length ? 0.5 : 1,
                    }}
                    disabled={!selectedSlots.length}
                    onPress={confirmBooking}
                  >
                    {bookingloader ? (
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: w(10),
                          borderRadius: 20,
                        }}
                      >
                        <ActivityIndicator
                          size="large"
                          color="#fff"
                          style={{
                            padding: w(10),
                            borderRadius: 20,
                          }}
                        />
                      </View>
                    ) : (
                      <Text
                        style={{
                          alignItems: "center",
                          padding: w(10),
                          borderRadius: 20,
                          fontSize: w(16),
                          fontFamily: ff.deckSemiBold,
                          color: "#fff",
                          letterSpacing: 1,
                        }}
                      >
                        Confirm Booking
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
            </View>
          </View>
        </View>
      </Modal>
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
    gap: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: vw - 50,
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
