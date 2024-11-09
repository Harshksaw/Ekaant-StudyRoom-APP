import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from "react-native";

const Seat = ({ seatData, isSelected, isBooked, onSeatSelect }) => {
  return (
    <TouchableOpacity
      onPress={() => onSeatSelect(seatData)}
      style={styles.seat(isBooked, isSelected)}
    >
      <Image source={require('../assets/icons/desk2.png')} style={{ width: 50, height: 50 }} />
      <Text>{seatData.seatLabel}</Text>
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
    // Find matrix dimensions based on the max row and column in layout
    const maxRow = Math.max(...layout.map(seat => parseInt(seat.seatId.split('-')[0])));
    const maxCol = Math.max(...layout.map(seat => parseInt(seat.seatId.split('-')[1])));
    
    // Create a matrix filled with null to start
    const matrix = Array.from({ length: maxRow + 1 }, () => Array(maxCol + 1).fill(null));

    // Populate matrix with seat objects
    layout.forEach((seat) => {
      const [row, col] = seat.seatId.split('-').map(Number);
      matrix[row][col] = seat;
    });

    // Generate the seat grid view
    return matrix.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.seatRow}>
        {row.map((seat, colIndex) => {
          if (seat) {
            const isSelected = selectedSeat && seat.seatId === selectedSeat.seatId;
            const isBooked = bookedSeats.some(bookedSeat => bookedSeat.seatId === seat.seatId);

            return (
              <Seat
                key={`${rowIndex}-${colIndex}`}
                seatData={seat}
                isSelected={isSelected}
                isBooked={isBooked}
                onSeatSelect={handleSelect}
              />
            );
          }
          // Render an invisible placeholder for empty seats
          return <View key={`${rowIndex}-${colIndex}`} style={styles.emptySeat} />;
        })}
      </View>
    ));
  };

  return(
    <ScrollView horizontal={true}
    showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>{createSeatGrid()}</View>
    </ScrollView>
  );

};



export default function Seats({ onSeatSelect, SeatLayout, currentRoom }) {
  console.log("🚀 ~ Seats ~ SeatLayout:", SeatLayout);

  const handleSeatSelect = (selectedSeat) => {
    onSeatSelect(selectedSeat);
    console.log("Selected Seat:", selectedSeat);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <SeatsComponent
      layout={SeatLayout}
      bookedSeats={[]}
      onSeatSelect={handleSeatSelect}
      currentRoom={currentRoom}
    />
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  seatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  seat: (isBooked, isSelected) => ({
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    backgroundColor: isBooked ? "red" : isSelected ? "#6f82f2" : "transparent",
  }),
  emptySeat: {
    width: 70,
    height: 70,
    margin: 5,
    backgroundColor: "transparent",
  },
});
