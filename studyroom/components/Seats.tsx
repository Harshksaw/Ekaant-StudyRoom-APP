import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

const Seat = ({ seatData, isSelected, isBooked, onSeatSelect }) => {
  return (
    <TouchableOpacity
      onPress={() => onSeatSelect(seatData)}
      style={styles.seat(isBooked, isSelected)}
    >
      <Image source={require('../assets/icons/desk2.png')} style={{width: 50, height: 50}} />
    </TouchableOpacity>
  );
};

const SeatsComponent = ({ layout, bookedSeats, onSeatSelect, currentRoom }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSelect = (seatData) => {
    if (selectedSeat && seatData.seatId === selectedSeat.seatId) {
      setSelectedSeat(null);
      onSeatSelect(null);
    } else {
      setSelectedSeat(seatData);
      onSeatSelect(seatData);
    }
  };


  const createSeatGrid = () => {
    return layout.map((seat, index) => {
      const isSelected = selectedSeat && seat.seatId === selectedSeat.seatId;
      const isBooked = bookedSeats.some(bookedSeat => bookedSeat.seatId === seat.seatId);


      return (
        <Seat
      key={index}
      seatData={seat}
      isSelected={isSelected}
      isBooked={isBooked}
      onSeatSelect={handleSelect}
    />
      );
    });
  };

  return <View style={styles.container}>{createSeatGrid()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    gap: 20,
    marginHorizontal: 20,
  },
  seatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seat: (isBooked, isSelected) => ({
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: isBooked ? "red" : isSelected ? "blue" : "transparent",
  }),
});

export default function Seats({ onSeatSelect, SeatLayout , currentRoom}) {
  console.log("🚀 ~ Seats ~ SeatLayout:", SeatLayout)
  

  const handleSeatSelect = (selectedSeat) => {
    onSeatSelect(selectedSeat); // Now expects a single seat object or null
    console.log("Selected Seat:", selectedSeat); // Log the selected seat to verify

  };

  return (
    <SeatsComponent
      layout={SeatLayout}
      bookedSeats={[]}
      onSeatSelect={handleSeatSelect}
      currentRoom={currentRoom}
    />
  );
}