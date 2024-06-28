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

const SeatsComponent = ({ layout, bookedSeats, onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelect = (seatData) => {
    let newSelectedSeats = [...selectedSeats];
    const index = newSelectedSeats.findIndex(seat => seat.id === seatData.id);

    if (index !== -1) {
      newSelectedSeats.splice(index, 1);
    } else {
      newSelectedSeats.push(seatData);
    }

    setSelectedSeats(newSelectedSeats);
    onSeatSelect(newSelectedSeats); // Pass the updated selected seats back to parent
  };

  const createSeatGrid = () => {
    return layout.map((seat, index) => {
      const isSelected = selectedSeats.some(selectedSeat => selectedSeat.id === seat.id);
      const isBooked = bookedSeats.some(bookedSeat => bookedSeat.id === seat.id);

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

export default function Seats({ onSeatSelect,SeatLayout, BookedSeats }) {
  // Handle seat selection in this parent component
  const handleSeatSelect = (selectedSeats) => {
    onSeatSelect(selectedSeats);
    // console.log("Selected Seats:", selectedSeats);
    // Perform further actions with selectedSeats data
  };

  return (
    <SeatsComponent
      layout={SeatLayout}
      bookedSeats={[]}
      onSeatSelect={handleSeatSelect}
    />
  );
}