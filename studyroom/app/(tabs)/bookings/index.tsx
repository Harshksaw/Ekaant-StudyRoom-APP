import ff from "@/constants/fonts";
import { h, w } from "@/constants/size";

import { BACKEND } from "@/utils/config";

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
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
interface ApprovalStatusProps {
  isApproved: String;
}
const ApprovalStatus: React.FC<ApprovalStatusProps> = ({ isApproved }) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          isApproved ? styles.approved : styles.notApproved,
          { fontFamily: ff.deckSemiBold, fontSize: w(11) },
        ]}
      >
        {isApproved ? "Paid" : "Not Paid"}
      </Text>
    </View>
  );
};

export default function Bookings() {
  const [data, setData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const getBookings = async () => {
    const userId = await getUserId(); // Wait for getUserId to complete
    console.log("🚀 ~ getBookings ~ userId:", userId);

    if (userId) {
      try {
        const res = await axios.get(
          `${BACKEND}/api/v1/booking/getUserBookings/${
            userId.data.user.id || userId.data.user_id.id
          }`
        );

        setData(res.data);
      } catch (error) {
        console.error(error, "this is error");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const getBookingData = async () => {
      await getBookings();
      // const fetchedData = await axios.post();

      // setData(fetchedData.data || []);
    };
    getBookingData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 0,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          borderBottomWidth: 1.5,
          paddingBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: ff.displayBlack,
            color: "black",
            textDecorationStyle: "solid",
            marginTop: 20,
            marginLeft: 30,
          }}
        >
          My Bookings
        </Text>
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            marginTop: 15,
            marginHorizontal: 10,
            paddingHorizontal: 10,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {(!data || data?.length == 0) && (
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
                style={{ width: 200, height: 200 }}
                source={{
                  uri: "https://img.icons8.com/?size=100&id=iUVwyb80vyVW&format=png&color=000000",
                }}
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
                key={index}
                style={{
                  borderRadius: 15,
                  borderWidth: 1.5,
                  borderColor: "#dcd8da",
                  marginBottom: h(10),
                  padding: w(2.5),
                }}
                // key={item.id}
                onPress={() =>
                  router.push({
                    pathname: "/(routes)/invoice",
                    params: { item: JSON.stringify(item), id: item.id },
                  })
                }
              >
                <View style={styles.card}>
                  <Image
                    source={{
                      uri:
                        item.library?.cardImage ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&s=10",
                    }}
                    style={{
                      width: w(90),
                      borderRadius: 10,
                      aspectRatio: 16 / 15,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      marginLeft: 0,
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "flex-start",
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
                            fontSize: w(isTablet ? 12 : 14),
                            lineHeight: 26.01,
                            textAlign: "left",
                            fontFamily: ff.deckMedium,
                            letterSpacing: 1,
                          }}
                        >
                          {item?.library.name?.split(" ").slice(0, 2).join(" ")}
                        </Text>

                        <ApprovalStatus isApproved={item.bookingStatus} />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 4,
                        }}
                      >
                        <Ionicons
                          name="accessibility-outline"
                          size={isTablet ? 24 : 14}
                          color="black"
                        />
                        <Text
                          style={{
                            fontSize: w(isTablet ? 16 : 12.14),
                            fontFamily: ff.deckRegular,
                            lineHeight: w(isTablet ? 14 : 14.21),
                            textAlign: "left",
                          }}
                        >
                          {item.bookedSeat.seatLabel}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",

                          gap: 3,
                        }}
                      >
                        <Ionicons name="time-outline" size={16} color="black" />
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: w(isTablet ? 8 : 10),
                              fontFamily: ff.deckRegular,
                              lineHeight: 18.21,
                              textAlign: "left",
                            }}
                          >
                            Period: {item.bookingDate.slice(0, 10)} {" : "}
                          </Text>
                          <Text
                            style={{
                              fontSize:w(isTablet ? 8 : 10),
                              fontFamily: ff.deckRegular,
                              lineHeight: 18.21,
                              textAlign: "left",
                            }}
                          >
                            {item.bookingFinalDate?.slice(0, 10)}
                          </Text>
                        </View>
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
                          size={isTablet ? 24 : 12}
                          color="black"
                        />
                        <Text style={{ fontFamily: ff.deckMedium }}>AC</Text>
                      </View>

                      {/* <View
                        style={{
                          flexDirection: "row",
                          gap: 3,
                        }}
                      >
                        <Ionicons name="location" size={16} color="black" />

                        <Text style={{ fontFamily: ff.deckMedium }}>
                          {item.distance || "N/A KMs"}
                        </Text>
                      </View> */}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    gap: 18,
    borderRadius: 5,
    flexDirection: "row",
    // justifyContent: "space-between",

    ...(Platform.OS === "ios" && {
      marginBottom: 10,
      marginHorizontal: 5,
      borderRadius: 20,
      padding: 5,
    }),

    // justifyContent: "flex-start",
    alignItems: "center",
  },
});
