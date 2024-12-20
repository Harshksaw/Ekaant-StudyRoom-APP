import { DeskGreen } from "@/assets";
import ff from "@/constants/fonts";
import { w } from "@/constants/size";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const Seat = ({ seatData, isSelected, isBooked, onSeatSelect, rotation }) => {
  console.log("🚀 ~ Seat ~ roation:", rotation);
  const isFullyBooked = seatData.timeSlots.every((slot) => slot.booked);
  const isPartiallyBooked = seatData.timeSlots.some((slot) => slot.booked);

  const getIcon = () => {
    if (isFullyBooked) {
      return <DeskGreen fill={"#ffcc7f64"} rotation={rotation} />;
    } else if (isPartiallyBooked) {
      return <DeskGreen rotation={rotation} />;
    } else {
      return <DeskGreen fill={"#07f07b"} rotation={rotation} />;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onSeatSelect(seatData)}
      style={styles.seat(isFullyBooked, isSelected, rotation)}
    >
      {getIcon()}
      <Text style={{ fontFamily: ff.deckRegular, fontSize: w(12) }}>
        {seatData.seatLabel}
      </Text>
    </TouchableOpacity>
  );
};

const SeatsComponent = ({
  layout,
  bookedSeats,
  onSeatSelect,
  currentRoom,
  door,
}) => {

  const [selectedSeat, setSelectedSeat] = useState(null);

  // console.log(door);

  const getDoorPosition = () => {
    const doorPositions = [
      { right: "50%" },
      { right: "25%" },
      { left: "0%" },
      { left: "25%" },
      { left: "50%" },
    ];

    const doorIndex = door.findIndex((value) => value === 1);
    console.log("🚀 ~ getDoorPosition ~ doorIndex:", doorIndex);

    switch (doorIndex) {
      case 0:
        return doorPositions[0];
      case 1:
        return doorPositions[1];
      case 2:
        return doorPositions[2];
      case 3:
        return doorPositions[3];
      case 4:
        return doorPositions[4];
      default:
        return {};
    }
  };


useEffect(() => {

}, [door]);
const doorPosition = getDoorPosition();
  // console.log("🚀 ~ doorPosition:", doorPosition)



  // const scrollViewRef =useRef<ScrollView>(null)

  // useEffect(() => {
  //   const doorInde= door.filter((x) => x == 1)
  //   let scrollToX  = 0;

  //   switch (doorInde) {
  //     case -1: // Leftmost
  //       scrollToX = 0;
  //       break;
  //     case 0: // Left
  //       scrollToX = 100; // Adjust as needed
  //       break;
  //     case 1: // Center
  //       scrollToX = 300; // Adjust as needed
  //       break;
  //     case 2: // Right
  //       scrollToX = 500; // Adjust as needed
  //       break;
  //     case 3: // Rightmost
  //       scrollToX = 700; // Adjust as needed
  //       break;
  //     default:
  //       scrollToX = 300; // Default to center
  //   }

  //   scrollViewRef.current?.scrollTo({ x: scrollToX, animated: true });
  // }, [door]);

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
    <ScrollView horizontal={true}       showsHorizontalScrollIndicator={false}
    // contentContainerStyle={{ alignItems: "center" }} // Center content horizontally
    >
      <View style={styles.container}>
        {createSeatGrid()}
    <Trapezoid/>
        {/* <MaterialCommunityIcons
   style={[
    doorPosition,
    {
      width: 60,
      height: 40,
      marginHorizontal:10,

      position: "relative",
      bottom: 0,
    },
  ]}
          name="door-sliding"
          size={45}
          color="black"
        /> */}
      </View>
    </ScrollView>
  );
};

export default function Seats({ onSeatSelect, SeatLayout, currentRoom, door }) {
  console.log("🚀 ~ Seats ~ SeatLayout:", SeatLayout);
  const handleSeatSelect = (selectedSeat) => {
    onSeatSelect(selectedSeat);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={
        {
          // borderColor:'black',
          // position:'relative',
          // borderWidth:2,
        }
      }
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

const Trapezoid = () => {
  return (
    <View style={styles.container1}>
      <View style={styles.shape} /> 
      <View style={styles.topBorder} />
      {/* <View style={styles.bottomBorder} /> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBlockColor:'black',
    borderWidth:2,
    padding:5,
    marginHorizontal:5,
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
    aspectRatio: 1.1 / 1,

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
  container1: {
    width: 100,
    height: 80,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  shape: {
    width: 80, 
    height: 60, 
    backgroundColor: 'white', // Fill color
    borderLeftWidth: 2, 
    borderLeftColor: 'black',
    borderRightWidth: 2,
    borderRightColor: 'black',
    

  },
  topBorder: {
    position: 'absolute',

    top: 0,
    left: 10, 
    width: 20, 
    height: 2, 
    backgroundColor: 'blue',
  },
  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    left: 10, 
    width: 80,
    height: 2,
    backgroundColor: 'white',
  },
});









