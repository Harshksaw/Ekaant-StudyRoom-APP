import { DeskGreen } from "@/assets";
import ff from "@/constants/fonts";
import { h, w } from "@/constants/size";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
const windowWidth = Dimensions.get("window").width;

const Seat = ({ seatData, isSelected, onSeatSelect, rotation }) => {
  // console.log("🚀 ~ Seat ~ roation:", rotation);

  const isFullyBooked = seatData.timeSlots.filter((slot) => {
    return slot.booked && slot.from === "12:00 AM" && slot.to === "11:59 PM";
  }).length;

  const isPartiallyBooked = seatData.timeSlots.some((slot) => slot.booked);

  const getIcon = () => {
    if (isFullyBooked) {
      return <DeskGreen fill={"#ed0d0d"} rotation={rotation} />;
    } else if (isPartiallyBooked) {
      return <DeskGreen rotation={rotation} />;
    } else {
      return <DeskGreen fill={"#07f07b"} rotation={rotation} />;
    }
  };

  return (
    <TouchableOpacity
      disabled={!!isFullyBooked}
      onPress={() => onSeatSelect(seatData)}
      style={styles.seat(isFullyBooked, isSelected, rotation)}
    >
      {getIcon()}
      <Text style={{ fontFamily: ff.deckRegular, fontSize: w(12) }}>
        {seatData.seatName}
      </Text>
    </TouchableOpacity>
  );
};

const SeatsComponent = ({
  layout,
  selectedSeat,
  bookedSeats,
  onSeatSelect,
  door,
}: any) => {
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

  useEffect(() => {}, [door]);
  const doorPosition = getDoorPosition();

  const handleSelect = (seatData) => {
    if (selectedSeat && seatData.seatId === selectedSeat.seatId) {
      onSeatSelect(null);
      onSeatSelect(null);
    } else {
      onSeatSelect(seatData);
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

            return (
              <Seat
                key={`${rowIndex}-${colIndex}`}
                seatData={seat}
                isSelected={isSelected}
                onSeatSelect={handleSelect}
                rotation={seat?.rotation}
              />
            );
          }

          return (
            <View key={`${rowIndex}-${colIndex}`} style={styles.emptySeat} />
          );
        })}
      </View>
    ));
  };
  const boxWidth = windowWidth > 480 ? 100 : 70;
  const boxHeight = windowWidth > 480 ? 100 : 50;

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {createSeatGrid()}

        <View
          style={[
            doorPosition,
            {
              position: "relative",
              top: h(15),
              marginHorizontal: 30,
              paddingHorizontal: 20,
              bottom: 0,
            },
          ]}
        >
          <Text
            style={{
              position: "absolute",
              top: 0,
              zIndex: 1,
              fontFamily: ff.deckBold,
              textAlign: "center",
              transform: [{ translateX: 30 }],
              marginTop: h(-4),
            }}
          >
            Entrance
          </Text>
          <View style={[styles.box, { width: boxWidth, height: boxHeight }]}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              colors={["#90E0EF", "#90E0EF", "#0077B6"]} // Gradient colors
              style={[
                styles.line,
                styles.lineLeft,
                {
                  position: "absolute",
                  borderRadius: 20,
                  height: "80%",
                  backgroundColor: "transparent",
                  width: 8,
                },
              ]}
            >
              {/* <View style={[styles.line, styles.lineLeft]} /> */}
            </LinearGradient>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              colors={["#192fae", "#0077B6", "#90E0EF"]} // Gradient colors
              style={[
                styles.line,
                styles.lineRight,
                {
                  position: "absolute",
                  borderRadius: 20,
                  height: "80%",
                  backgroundColor: "transparent",
                  width: 8,
                  elevation: 3,
                },
              ]}
            >
              {/* <View style={[styles.line, styles.lineRight]} /> */}
            </LinearGradient>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default function Seats({
  onSeatSelect,
  SeatLayout,
  selectedSeat,
  currentRoom,
  door,
}: any) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
      <SeatsComponent
        layout={SeatLayout}
        bookedSeats={[]}
        door={door}
        selectedSeat={selectedSeat}
        onSeatSelect={onSeatSelect}
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
    borderColor: "rgba(0, 118, 182, 0.2)",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    marginBottom: 50,
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
      ? "#e8e9de"
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
    position: "relative",
    top: 20,
    // flex: 1,
    // marginTop:40,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f0f0f0', // Optional background for visibility
  },
  box: {
    position: "relative",
    backgroundColor: "white",
    borderWidth: 5, // Optional border
    borderColor: "#fff", // Optional border
  },
  line: {
    position: "absolute",
    height: "80%",
    width: 2, // Adjust line thickness

    backgroundColor: "#0078d7", // Adjust line color
  },
  lineLeft: {
    top: "10%",
    left: "0%",
    transform: [{ rotate: "30deg" }], // Adjust angle
  },
  lineRight: {
    top: "10%",
    right: "0%",
    transform: [{ rotate: "-30deg" }], // Adjust angle
  },
});
