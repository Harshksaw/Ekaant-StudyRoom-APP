import { DeskGreen } from "@/assets";
import ff from "@/constants/fonts";
import { height, w, width } from "@/constants/size";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get('window').width;

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
      { right: "45%" },
      { right: "20%" },
      { left: "0%" },
      { left: "20%" },
      { left: "45%" },
    ];

    const doorIndex = door.findIndex((value) => value === 1);
    console.log("🚀 ~ getDoorPosition ~ door:", door)
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
  const boxWidth = windowWidth > 480 ? 100 : 50;
  const boxHeight = windowWidth > 480 ? 100 : 50;
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
    // contentContainerStyle={{ alignItems: "center" }} // Center content horizontally
    >
      <View style={styles.container}>
        {createSeatGrid()}

        <View style={[
          doorPosition,
          {
            position: 'relative',
            top: 20,
            marginHorizontal: 30,
            paddingHorizontal:20,

            bottom: 0,



          },
        ]}>
          <View style={[styles.box, { width: boxWidth, height: boxHeight }]}>
            <View style={[styles.line, styles.lineLeft]} />
            <View style={[styles.line, styles.lineRight]} />
          </View>
        </View>

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


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBlockColor: 'black',
    borderWidth: 2,
    padding: 5,
    marginHorizontal: 5,
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
    width: 70,
    height: 70,

    backgroundColor: isBooked
      ? "#ffcc7f64"
      : isSelected
        ? "#8cf39c7d"
        : "transparent",
    borderWidth: 1.3,
    aspectRatio: 1.1 / 0.9,

    borderColor: "#0077B6",
    padding: w(2),
    paddingHorizontal: w(4),
  }),
  emptySeat: {
    width: 75,
    height: 75,
    margin: 5,
    backgroundColor: "transparent",
  },
  container1: {
    position: 'relative',
    top: 20,
    // flex: 1,
    // marginTop:40,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f0f0f0', // Optional background for visibility
  },
  box: {
    position: 'relative',
    backgroundColor: 'white',
    borderWidth: 5, // Optional border
    borderColor: '#fff', // Optional border

  },
  line: {
    position: 'absolute',
    height: '80%',
    width: 2, // Adjust line thickness
    backgroundColor: '#0078d7', // Adjust line color
  },
  lineLeft: {
    top: '10%',
    left: '10%',
    transform: [{ rotate: '30deg' }], // Adjust angle
  },
  lineRight: {
    top: '10%',
    right: '10%',
    transform: [{ rotate: '-30deg' }], // Adjust angle
  },
});









