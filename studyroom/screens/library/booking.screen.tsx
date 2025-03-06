import Seats from "@/components/Seats";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
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
  Animated,
  Image,
  Easing,
} from "react-native";

import { setBookingDetails } from "@/redux/bookingSlice";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Toast } from "react-native-toast-notifications";
import axios from "axios";
import { BACKEND } from "@/utils/config";
import Header from "@/components/Header";
import { h, vw, w } from "@/constants/size";
import ff from "@/constants/fonts";
import { checkPreviousBookings } from "@/utils/bookingapi";
import { resetTransaction, setTransaction } from "@/redux/transaction";

const BookingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const params: any = useRoute();

  const Library = JSON.parse(params.params?.item);

  const city = JSON.parse(params?.params?.location);

  const bookingData = useSelector((state: any) => state.booking);
  const userDetails = useSelector((state: any) => state.user);

  const [data, setData] = useState<any[] | null>(null);
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
  // // // console.log("🚀 ~ bookingData.details:", bookingData.details.price);
  const [totalAmount, setTotalAmount] = useState(0);
  const userSelect = useSelector((state: any) => state.user.user);
  // // // console.log("🚀 ~ userSelect:", JSON.parse(userSelect))

  const translateX = useRef(new Animated.Value(-vw + vw * 0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 300,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),

        Animated.delay(1000),
      ])
    ).start();
  }, []);

  const BookedData = {
    seat: selectedSeat,
    date: selectedDate,
    months: selectedMonth,
    room: currentRoomNo,
    slot: selectedSlots,
  };

  const getBoughtStatus = async () => {
    const userId = JSON.parse(userSelect)?.data.user.id;

    const hasBoughtEarlier = await checkPreviousBookings(
      userId,
      libraryDetails.id
    );
    return hasBoughtEarlier;
    // console.log("🚀 ~ confirmBooking ~ hasBoughtEarlier:", hasBoughtEarlier);
  };
  useEffect(() => {
    const totalPrice = selectedSlots.reduce(
      (acc, slot) => acc + Number(slot.price),
      0
    );

    setFinalPrice(totalPrice * selectedMonth);
    const registrationFees = libraryDetails?.registrationFees || 0;

    setTotalAmount(totalPrice * selectedMonth);
  }, [selectedSlots, selectedMonth]);

  const handleSeatSelect = (seatDataFromChild: any) => {
    setSelectedSeat(seatDataFromChild);
  };

  const handleSelectSlot = (selectedSlot) => {
    if (selectedSlot.from === "12:00 AM" && selectedSlot.to === "11:59 PM") {
      setSelectedSlots([selectedSlot]);
    } else {
      setSelectedSlots((prev) => {
        if (prev.find((slot) => slot.id === selectedSlot.id)) {
          return prev.filter((slot) => slot.id !== selectedSlot.id);
        } else {
          return prev.some(
            (slot) => slot.from === "12:00 AM" && slot.to === "11:59 PM"
          )
            ? [selectedSlot]
            : [...prev, selectedSlot];
        }
      });
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

  const isPartiallyBooked = selectedSeat?.timeSlots.some((slot) => slot.booked);

  const PreBook = async () => {
    const userId = JSON.parse(userSelect)?.data.user.id;
    console.log("🚀 ~ PreBook ~ userId:", userId);

    if (!userId) {
      Toast.show("user data not config properly, Relogin", {
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
        const response = await axios.post(
          `${BACKEND}/api/v1/booking/createBooking`,
          {
            userId,
            libraryId: libraryDetails?.id,
            initialPrice: price,
            finalPrice: totalAmount,

            timeSlot: BookedData.slot,
            roomNo: BookedData.room,
            bookedSeat: BookedData.seat,
            bookingDate: BookedData.date,
            bookingPeriod: BookedData.months,
            forFriend: userDetails.friendDetails,
          }
        );

        console.log("🚀 ~ PreBook ~ bookingId:", response.data);
        const bookingId = response.data.data.id;

        setBookingId(bookingId);

        dispatch(resetTransaction());

        console.log(
          "🚀 ~ PreBook ~ response.data.data.transactionId:1",
          response.data.data.transactionId
        );
        dispatch(
          setTransaction({ transactionId: response.data.data.transactionId })
        );

        // if (response.status === 200 || response.status === 201) {
        //   Toast.show("Booking Successful", {
        //     type: "success",

        //       placement:"top",
        //       duration: 3000,
        //   });
        // }

        return response.data;
      } catch (error) {
        // console.error("Error:", error.message);
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

  const displayTimeRange = (from, to) => {
    if (from === "12:00 AM" && to === "11:59 PM") {
      return `24/7`;
    }
    return `${from} - ${to}`;
  };
  const confirmBooking = async () => {
    try {
      setBookingLoader(true);

      console.log(selectedMonth, "----");

      // Check if userDetails.user is defined
      if (!userDetails || !userDetails.user) {
        throw new Error(
          "User details are not properly configured. Please relogin."
        );
      }

      const user = JSON.parse(userDetails.user);
      const userId = user?.data?.user?.id;
      console.log("🚀 ~ confirmBooking ~ userId:", userId);

      // Check if userId is defined
      if (!userId) {
        throw new Error("User ID is not available. Please relogin.");
      }

      // Check if libraryDetails is defined
      if (!libraryDetails || !libraryDetails?.id) {
        throw new Error("Library details are not properly configured.");
      }

      console.log(
        "🚀 ~ confirmBooking ~ userDetails.user.id, libraryDetails?.id:",
        userId,
        libraryDetails.id
      );

      const Bought = await getBoughtStatus();
      const totalAmount = Bought
        ? finalPrice
        : finalPrice + libraryDetails.registrationFees;

      await updateRoomDetails();
      const res = await PreBook();

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
          hasBoughtEarlier: Bought,
        };
        console.log("🚀 ~ confirmBooking ~ Bookdata:", Bookdata);
        router.push({
          pathname: "/library/checkout.screen",
          params: {
            item: JSON.stringify(Bookdata),
          },
        });

        resetBookingState();
      } else {
        Toast.show("Booking failed. Please try again.", {
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error in confirmBooking:", error);
      Toast.show(error.message, {
        type: "error",
      });
      setBookingLoader(false);
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
          zIndex: 999,
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
            gap: 7,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: w(12), fontFamily: ff.deckMedium }}>
            Hall {currentRoomNo}
          </Text>
          <Entypo name="chevron-thin-down" />
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
                  {` Hall ${item.roomNo}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* <ToggleBookingButton /> */}
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
            onSeatSelect={setSelectedSeat}
            selectedSeat={selectedSeat}
            door={data[currentRoomNo - 1].doorPosition}
            SeatLayout={data[currentRoomNo - 1].seats}
            currentRoom={currentRoomNo}
          />
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: h(10),
        }}
      >
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
        {/* <TouchableOpacity
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
              Toast.show("Please Select Another Seat");
              return;
            }
            setIsModalVisible(true);
          }}
        >
          <Button text="Book" width={200} />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={{
            bottom: 0,
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#0077B6",
            borderRadius: 3,
            marginBottom: h(12),
            width: "60%",
            overflow: "hidden",
          }}
          onPress={() => {
            if (!selectedDate) {
              Toast.show("Please Select Date");
              return;
            }
            if (!selectedSeat) {
              Toast.show("Please Select a Seat for booking");
              return;
            }
            setIsModalVisible(true);
          }}
        >
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
            Book
          </Text>

          <Animated.View
            style={{
              position: "absolute",
              transform: [{ translateX }, { translateY: -30 }],
              opacity: 0.7,
            }}
          >
            <Image
              source={require("@/assets/blurShadow.png")}
              resizeMode="contain"
              style={{
                flex: 1,
                transform: [{ rotate: "-60deg" }],
                width: 150,
                height: 100,
              }}
            />
          </Animated.View>
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
                  width: "70%",
                  alignSelf: "center",
                  ...(Platform.OS === "ios" ? { marginTop: 20 } : {}), // Adjust marginTop for iOS
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: w(-12),
                    top: w(12),
                    ...(Platform.OS === "ios" ? { top: w(90) } : {}), // Adjust top for iOS
                  }}
                >
                  <Feather name="calendar" size={w(25)} />
                </View>
                <Picker
                  style={{ width: "80%", marginLeft: w(15) }}
                  selectedValue={selectedMonth}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log("🚀 ~ itemValue:", itemValue);
                    setSelectedMonth(parseInt(itemValue));
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
                {selectedSeat?.timeSlots?.map((slot) => {
                  const selected = selectedSlots.some(
                    (selectedSlot) => selectedSlot?.id === slot.id
                  );

                  if (
                    slot.from === "12:00 AM" &&
                    slot.to === "11:59 PM" &&
                    isPartiallyBooked
                  ) {
                    return;
                  }

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
                      opacity: !selectedSlots.length || bookingloader ? 0.5 : 1,
                    }}
                    disabled={!selectedSlots.length || bookingloader}
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
                          size="small"
                          color="#fff"
                          style={{
                            paddingHorizontal: w(40),
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
