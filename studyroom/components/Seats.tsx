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
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSelect = (seatData) => {
    // Check if the clicked seat is already selected
    if (selectedSeat && seatData.id === selectedSeat.id) {
      setSelectedSeat(null); // Deselect the seat
      onSeatSelect(null); // Pass null to indicate no seat is selected
    } else {
      setSelectedSeat(seatData); // Select the new seat
      onSeatSelect(seatData); // Pass the selected seat back to parent
    }
  };

  const createSeatGrid = () => {
    return layout.map((seat, index) => {
      const isSelected = selectedSeat && seat.id === selectedSeat.id;
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

export default function Seats({ onSeatSelect, SeatLayout }) {
  // Handle seat selection in this parent component
  const handleSeatSelect = (selectedSeats) => {
    onSeatSelect(selectedSeats);
    console.log("Selected Seats:", selectedSeats); // Log the selected seats to verify
    // Perform further actions with selectedSeats data here
  };

  return (
    <SeatsComponent
      layout={SeatLayout}
      bookedSeats={[]}
      onSeatSelect={handleSeatSelect}
    />
  );
}