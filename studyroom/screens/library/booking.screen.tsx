import Header from "@/components/Header";
import Seats from "@/components/Seats";
import Calendar from "@/components/calendar/calendar";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingScreen: React.FC = () => {
    const [date, setDate] = useState("");
    const [seats, setSeats] = useState("");
  
    // Function to update date
    const handleDateChange = (selectedDate: string) => {
      setDate(selectedDate);
    };
  
    // Function to update seats
    const handleSeatsChange = (selectedSeats: string) => {
      setSeats(selectedSeats);
    };
    const [selectedDate, setSelectedDate] = useState(null);
    useEffect(() => {

        console.log(selectedDate);
    }, [selectedDate]);
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
          backgroundColor: "red",
        }}
      >
        <Calendar onDateChange={handleDateChange}  onSelectDate={setSelectedDate} selected={selectedDate} />
      </View>

      <View
        style={{
          flex: 1,

          marginBottom: 40,
          justifyContent: "center",

          backgroundColor: "yellow",
        }}
      >
        <Seats onSeatsChange={handleSeatsChange} />
      </View>
    </SafeAreaView>
  );
};

export default BookingScreen;
