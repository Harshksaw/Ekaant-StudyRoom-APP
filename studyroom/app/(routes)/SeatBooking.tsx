import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, Image } from "react-native";

const Seat = ({ seatData, isSelected, onSelect, isBooked }) => {
  const handlePress = () => {
    onSelect(seatData);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.seat(isBooked, isSelected)}
    >

        <Image source={require('../../assets/icons/desk2.png')} style={{width: 50, height: 50}} />
      {/* <Text>{seatData.label}</Text> */}
    </TouchableOpacity>
  );
};

const SeatsComponent = ({ layout, bookedSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelect = (seatData) => {
    const newSelectedSeats = [...selectedSeats];
    const seatIndex = newSelectedSeats.findIndex(
      (seat) => seat.id === seatData.id
    );

    if (seatIndex !== -1) {
      newSelectedSeats.splice(seatIndex, 1);
    } else {
      newSelectedSeats.push(seatData);
    }

    setSelectedSeats(newSelectedSeats);
  };

  const createSeatGrid = () => {
    const rows = [];
    for (let i = 1; i <= 5; i++) {
      const columns = [];
      for (let j = 1; j <= 5; j++) {
        const seatId = `${i}-${j}`;
        const seatData = { id: seatId, label: seatId };
        const isSelected = selectedSeats.some((seat) => seat.id === seatId);
        const isBooked = bookedSeats.some((seat) => seat.id === seatId);
        const isVisible = layout.some((seat) => seat.id === seatId);

        if (isVisible) {
          columns.push(
            <Seat
              key={seatId}
              seatData={seatData}
              isSelected={isSelected}
              onSelect={handleSelect}
              isBooked={isBooked}
            />
          );
        }
      }
      rows.push(
        <View key={`row-${i}`} style={styles.seatRow}>
          {columns}
        </View>
      );
    }
    return rows;
  };

  return <View style={{
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    gap:20,

    marginHorizontal: 20,
  }}>{createSeatGrid()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  seatRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Optional for even spacing
  },

  seat: (isBooked, isSelected) => ({
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: isBooked ? "red" : isSelected ? "blue" : "transparent",
    // borderColor: "black",
    // borderWidth: 1,
  }),
});

export default function Seats() {
  return (
        <SeatsComponent
        layout={[{id: '1-1'}, {id: '2-2'}, {id: '3-3'}, {id: '4-4'}, {id: '5-5'}]}
        bookedSeats={[{id: '1-1'}, {id: '2-2'}]}
      />

    //     <SeatsComponent
    //   layout={[
    //     {id: '1-1'}, {id: '1-3'}, {id: '1-5'},
    //     {id: '2-2'}, {id: '2-4'},
    //     {id: '3-1'}, {id: '3-3'}, {id: '3-5'},
    //     {id: '4-2'}, {id: '4-4'},
    //     {id: '5-1'}, {id: '5-3'}, {id: '5-5'}
    //   ]}
    //   bookedSeats={[{id: '1-1'}, {id: '2-2'}, {id: '3-3'}, {id: '4-4'}, {id: '5-5'}]}
    // />
    // <SeatsComponent
    //   layout={[{ id: "1-1" }, { id: "1-2" }, { id: "2-1" }, { id: "2-2" }]}
    //   bookedSeats={[{ id: "1-1" }, { id: "2-2" }]}
    // />

//     <SeatsComponent 
//   layout={[
//     {id: '1-1'}, {id: '1-2'}, {id: '1-3'}, {id: '1-4'}, {id: '1-5'},
//     {id: '5-1'}, {id: '5-2'}, {id: '5-3'}, {id: '5-4'}, {id: '5-5'}
//   ]} 
//   bookedSeats={[{id: '1-1'}, {id: '1-5'}, {id: '5-1'}, {id: '5-5'}]} 
// />
    // <SeatsComponent 
    // layout={[
    //     {id: '1-1'}, {id: '2-1'}, {id: '3-1'}, {id: '4-1'}, {id: '5-1'},
    //     {id: '1-5'}, {id: '2-5'}, {id: '3-5'}, {id: '4-5'}, {id: '5-5'}
    // ]} 
    // bookedSeats={[{id: '1-1'}, {id: '5-1'}, {id: '1-5'}, {id: '5-5'}]} 
    // />
//     <SeatsComponent 
//   layout={[
//     {id: '2-2'}, {id: '2-3'}, {id: '2-4'},
//     {id: '3-2'}, {id: '3-3'}, {id: '3-4'},
//     {id: '4-2'}, {id: '4-3'}, {id: '4-4'}
//   ]} 
//   bookedSeats={[{id: '2-2'}, {id: '2-4'}, {id: '4-2'}, {id: '4-4'}]} 
// />
  );
}
