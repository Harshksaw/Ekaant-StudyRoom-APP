import { fetchRoomData } from "hooks/api/library";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";

interface ApprovalStatusProps {
  isApproved: boolean;
}
const ApprovalStatus: React.FC<ApprovalStatusProps> = ({ isApproved }) => {
  return (
    <View style={styles.container}>
      <Text style={isApproved ? styles.approved : styles.notApproved}>
        {isApproved ? 'Paid' : 'Not Paid'}
      </Text>
    </View>
  );
};
export default function Courses() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getBookingData = async () => {
      const fetchedData = await fetchRoomData();

      console.log("-------------", fetchedData.data);
      setData(fetchedData.data);
    };
    getBookingData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <View style={{
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",

      }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            marginTop: 20,
            color: "blue",
          }}
        >
          Bookings
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 2,
          width: "100%",
          marginVertical: 10,
        }}
      />

      <View
        style={{
          flex: 1,
          // width: "80%",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <ScrollView style={{
          flex: 1,
          // backgroundColor: "yellow",
        }}>
          {data &&
            data.map((item, index) => (
              <View
                key={index}
                style={{
                  // width: "100%",
                  borderRadius: 40,

                  backgroundColor: "lightblue",
                  padding: 15,
                  marginBottom: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}

              > 
              <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              >

             
                <Text>Booking {index + 1}</Text>
                <Text>Room: {item.name}</Text>

              </View>
              <ApprovalStatus isApproved={item.approved} />

              
          
              </View>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#fffff",
    borderRadius: 10,
    padding: 5,

  },
  approved: {
    color: 'green',
    // Additional styles for approved status
  },
  notApproved: {
    color: 'red',
    // Additional styles for not approved status
  },
});
