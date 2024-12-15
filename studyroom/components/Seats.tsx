import { DeskGreen } from "@/assets";
import ff from "@/constants/fonts";
import { w } from "@/constants/size";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { RotateInDownLeft } from "react-native-reanimated";
import { Image, ImageBackground } from 'expo-image';
import { width } from '../constants/size';


const Seat = ({ seatData, isSelected, isBooked, onSeatSelect,rotation}) => {
  console.log("🚀 ~ Seat ~ roation:",rotation)
  const isFullyBooked = seatData.timeSlots.every((slot) => slot.booked);
  const isPartiallyBooked = seatData.timeSlots.some((slot) => slot.booked);

  const getIcon = () => {
    if (isFullyBooked) {
      return <DeskGreen fill={"#ffcc7f64"}  rotation={rotation} />;
    } else if (isPartiallyBooked) {
      return <DeskGreen rotation={rotation} />;
    } else {
      return <DeskGreen fill={"#07f07b"}  rotation={rotation}/>;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onSeatSelect(seatData)}
      style={styles.seat(isFullyBooked, isSelected,rotation)}
    >
      {getIcon()}
      <Text style={{ fontFamily: ff.deckRegular, fontSize: w(12) }}>
        {seatData.seatLabel}
      </Text>
    </TouchableOpacity>
  );
};

const SeatsComponent = ({ layout, bookedSeats, onSeatSelect, currentRoom,door }) => {
  console.log("🚀 ~ SeatsComponent ~ layout:", layout)
  const [selectedSeat, setSelectedSeat] = useState(null);

  console.log(door)

  const getDoorPosition = () => {
    const doorPositions = [
      { right: '50%' },
      {  right: '25%' },
      { left:'0%' },
      {  left: '25%' },
      { left:'50%'},
    ];

    return door.map((doorIndex) => doorPositions[doorIndex + 1 ] || { left:'0%' });
  };

  const doorPosition = getDoorPosition();

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
    const maxRow = Math.max(
      ...layout.map((seat) => parseInt(seat.seatId.split("-")[0]))
    );
    const maxCol = Math.max(
      ...layout.map((seat) => parseInt(seat.seatId.split("-")[1]))
    );

    // Create a matrix filled with null to start
    const matrix = Array.from({ length: maxRow + 1 }, () =>
      Array(maxCol + 1).fill(null)
    );

    // Populate matrix with seat objects
    layout.forEach((seat) => {
      const [row, col] = seat.seatId.split("-").map(Number);
      matrix[row][col] = seat;
    });

    // Generate the seat grid view
    return matrix.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.seatRow}>
        {row.map((seat, colIndex) => {
          if (seat) {
            const isSelected =
              selectedSeat && seat.seatId === selectedSeat.seatId;
            const isBooked = bookedSeats.some(
              (bookedSeat) => bookedSeat.seatId === seat.seatId
            );
            // console.log("🚀 ~ SeatsComponent ~ Seat:", seat)
            return (
              <Seat
                key={`${rowIndex}-${colIndex}`}
                seatData={seat}
                isSelected={isSelected}
                isBooked={isBooked}
                onSeatSelect={handleSelect}
                rotation={seat?.rotation}
              />
            );
          }
          // Render an invisible placeholder for empty seats
          return (
            <View key={`${rowIndex}-${colIndex}`} style={styles.emptySeat} />
          );
        })}
      
      </View>
    ));
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} 


    >
      <View style={styles.container}>{createSeatGrid()}

      <View
  style={[{
    width: 60, 
    height:40,
    backgroundColor:'red',
    position:'relative',
    bottom:0,



  }, ...doorPosition]}
  >

  </View>

      </View>
    
    </ScrollView>
  );
};

export default function Seats({ onSeatSelect, SeatLayout, currentRoom, door }) {
  console.log("🚀 ~ Seats ~ SeatLayout:", SeatLayout)
  const handleSeatSelect = (selectedSeat) => {
    onSeatSelect(selectedSeat);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}
    style={{
      // borderColor:'black',
      // position:'relative',

      // borderWidth:2,
    }}
    >
      <SeatsComponent
        layout={SeatLayout}
        bookedSeats={[]}
        door={door}
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

    // transform: [{ rotate: `${rotation}deg` }], // Apply rotation

    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 7,
    backgroundColor: isBooked
      ? "#ffcc7f64"
      : isSelected
      ? "#8cf39c7d"
      : "transparent",
    borderWidth: 1.3,
    aspectRatio: 1.1/1,

    borderColor: "#0077B6",
    padding: w(2),
    paddingHorizontal: w(6),
  }),
  emptySeat: {
    width: 70,
    height: 75,
    margin: 5,
    backgroundColor: "transparent",
  },
});
