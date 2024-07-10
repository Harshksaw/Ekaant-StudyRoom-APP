import Header from "@/components/Header";
import StarRating from "@/components/Ratinstar";
import { fetchRoomData } from "@/hooks/api/library";
import { BACKEND } from "@/utils/config";
import { calculatePeriod } from "@/utils/date";
import { getUserId } from "@/utils/keys";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";

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



export default function Courses() {
  const [data, setData] = useState(null);


 




  const getBookings = async () => {
    const userId = await getUserId(); // Wait for getUserId to complete

    if (userId) { // Check if userId is not null
      const res = await axios.get(`${BACKEND}/api/v1/booking/getUserBookings/${userId}`)
      console.log("userID---->", res.data.bookings);
      setData(res?.data?.bookings);
    } else {
      console.log("UserId is null");
    }
  }


  useEffect(() => {
    const getBookingData = async () => {
      await getBookings();
      // const fetchedData = await axios.post();

      // console.log("-------------", fetchedData.data);
      // setData(fetchedData.data || []);
    };
    getBookingData();
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
          marginTop: 40,
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
        >

          {data === null && (
            <TouchableOpacity
            onPress={() => getBookings()}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 200,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "blue",
                  textAlign: "center",
                }}
              >
                No Bookings Found
              </Text>
              <ActivityIndicator size="large" color="black" />
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
                  router.push({
                    pathname: "/(routes)/card-details",
                    params: { item: JSON.stringify(item) },
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
                          {item?.libraryId.name.split(" ").slice(0, 2).join(" ")}
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
                          Period {calculatePeriod(item?.bookingDate, item?.bookingPeriod) || "2 Months"}
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
