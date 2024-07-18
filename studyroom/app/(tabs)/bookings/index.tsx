import { NoBookingsSVG } from "@/assets";
import Header from "@/components/Header";
import StarRating from "@/components/Ratinstar";
import { fetchRoomData } from "@/hooks/api/library";
import { BACKEND } from "@/utils/config";
import { calculatePeriod } from "@/utils/date";
import { getUserId } from "@/utils/keys";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ApprovalStatusProps {
  isApproved: boolean;
}
const ApprovalStatus: React.FC<ApprovalStatusProps> = ({ isApproved }) => {
  return (
    <View style={styles.container}>
      <Text style={isApproved ? styles.approved : styles.notApproved}>
        {isApproved ? "Paid" : "Not Paid"}
      </Text>
    </View>
  );
};

export default function Bookings() {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false)

  const getBookings = async () => {

    const userId = await getUserId(); // Wait for getUserId to complete

    if (userId) {
      // Check if userId is not null
      const res = await axios.get(
        `${BACKEND}/api/v1/booking/getUserBookings/${userId}`
      );
      console.log("userID---->", res.data.bookings);
      setData(res?.data?.bookings);
    } else {
      console.log("UserId is null");
    }
  };

  useEffect(() => {
    const getBookingData = async () => {
      await getBookings();
      // const fetchedData = await axios.post();

      // console.log("-------------", fetchedData.data);
      // setData(fetchedData.data || []);
    };
    getBookingData();
    console.log("Data+++", data);
  }, []);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <SafeAreaView
      style={{
        flex: 1,

        padding: 0,
        // marginBottom: 50,

        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 0,
        }}
      >
        <Header color="black" />
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            margin: 20,
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 20,
            color: "black",
          }}
        >
          My Bookings
        </Text>
      </View>

      <View
        style={{
          flex: 1,

          // width: "80%",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <ScrollView
          style={{
            flex: 1,

            marginHorizontal: 10,
            paddingHorizontal: 10,

            // backgroundColor: "yellow",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {data && data.length  == 0 && (
            <TouchableOpacity
              onPress={() => getBookings()}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100,
              }}
            >
                 <Image
              style={{width:200, height:200}}
             source={{uri:"https://img.icons8.com/?size=100&id=iUVwyb80vyVW&format=png&color=000000"}}

             />
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "rgb(183, 34, 225)",
                  textAlign: "center",
                }}
              >
                No Bookings Found
              </Text>
          

            </TouchableOpacity>
          )}
          {data &&
            data.map((item, index) => (
              <TouchableOpacity
                style={{
                  borderRadius: 24,
                  borderWidth: 1,
                  borderColor: "lightgray",
                  marginBottom: 4,
                  padding: 2,
                }}
                key={item._id}
                onPress={() =>
                  // console.log("Item", item)
                  router.push({
                    pathname: "/library/checkout.screen",
                    params: { bookitem: JSON.stringify(item) },
                  })
                }
                // onPress={()=> {
                //   setNotListed(true)

                // }}
              >
                <View style={styles.card}>
                  <Image
                    source={{
                      uri:
                        item.libraryId?.images[0] ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&s=10",
                    }}
                    style={{ width: 100, height: 100, borderRadius: 20 }}
                  />
                  <View
                    style={{
                      flex: 1,

                      flexDirection: "column",
                      // width: 200,
                      marginLeft: 0,
                      // justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        // width: 250,

                        // marginHorizontal: 10,
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "flex-start",

                        // justifyContent:'flex-start',
                      }}
                    >
                      <View
                        style={{
                          width: "100%",

                          flexDirection: "row",

                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13.34,
                            fontWeight: "300",
                            lineHeight: 26.01,
                            textAlign: "left",
                          }}
                        >
                          {item?.libraryId.name
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </Text>

                        <ApprovalStatus isApproved={item.approved} />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 3,
                        }}
                      >
                        <Ionicons
                          name="accessibility-outline"
                          size={16}
                          color="black"
                        />
                        <Text
                          style={{
                            fontSize: 12.14,
                            fontWeight: "300",
                            lineHeight: 18.21,
                            textAlign: "left",
                          }}
                        >
                          A-4
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 3,
                        }}
                      >
                        <Ionicons name="time-outline" size={16} color="black" />
                        <Text
                          style={{
                            fontSize: 12.14,
                            fontWeight: "300",
                            lineHeight: 18.21,
                            textAlign: "left",
                          }}
                        >
                          Period{" "}
                          {calculatePeriod(
                            item?.bookingDate,
                            item?.bookingPeriod
                          ) || "2 Months"}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 1,

                        height: 10,
                        width: 200,
                        flexDirection: "row",
                        paddingRight: 20,

                        justifyContent: "space-between",
                        // alignItems: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Ionicons
                          name="flower-outline"
                          size={16}
                          color="black"
                        />
                        <Text>AC </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          gap: 3,
                        }}
                      >
                        <Ionicons name="location" size={16} color="black" />

                        <Text>{item.distance || "2 KMs"}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              // <View
              //   key={index}
              //   style={{
              //     // width: "100%",
              //     borderRadius: 40,

              //     backgroundColor: "lightblue",
              //     padding: 15,
              //     marginBottom: 15,
              //     flexDirection: "row",
              //     justifyContent: "space-between",
              //     alignItems: "center",
              //   }}
              // >
              //   <View
              //     style={{
              //       flexDirection: "column",
              //       justifyContent: "space-between",
              //     }}
              //   >
              //     <Text>Booking {index + 1}</Text>
              //     <Text>Room: {item.name}</Text>
              //   </View>
              //   <ApprovalStatus isApproved={item.approved} />
              // </View>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffff",
    borderRadius: 10,
    padding: 5,
  },
  approved: {
    color: "green",

    fontSize: 17.34,
    fontWeight: "700",
    lineHeight: 26.01,
    textAlign: "left",
    // Additional styles for approved status
  },
  notApproved: {
    color: "red",

    fontSize: 17.34,
    fontWeight: "700",
    lineHeight: 26.01,
    textAlign: "left",
    // Additional styles for not approved status
  },
  card: {
    margin: 5,
    // backgroundColor: "red",
    // padding:10,
    gap: 10,
    borderRadius: 5,
    flexDirection: "row",
    // alignItems: "space-between",
    justifyContent: "space-between",

    ...(Platform.OS === "ios" && {
      marginBottom: 10,
      marginHorizontal: 5,
      borderRadius: 20,
      padding: 5,
    }),
  },
});
