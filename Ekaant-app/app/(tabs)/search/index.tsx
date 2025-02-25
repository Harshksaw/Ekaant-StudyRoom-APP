import Header from "@/components/Header";
import ff from "@/constants/fonts";
import { h, w } from "@/constants/size";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import {
  BackHandler,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const sampleData = {
  Latest: [
    {
      id: "1",
      title: "Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      postedDate: "2023-04-01",
    },
    {
      id: "2",
      title: "Product Manager",
      company: "Creative Solutions Ltd.",
      location: "New York, NY",
      postedDate: "2023-04-03",
    },
  ],
  Jobs: [
    {
      id: "3",
      title: "Frontend Developer",
      company: "Web World Technologies",
      location: "Remote",
      postedDate: "2023-03-28",
    },
    {
      id: "4",
      title: "Data Scientist",
      company: "Data Analytics Corp.",
      location: "Chicago, IL",
      postedDate: "2023-03-30",
    },
  ],
  AdmitCard: [
    {
      id: "5",
      examName: "Engineering Entrance Exam",
      releaseDate: "2023-04-10",
      examDate: "2023-05-15",
    },
    {
      id: "6",
      examName: "Medical Entrance Test",
      releaseDate: "2023-04-12",
      examDate: "2023-05-20",
    },
  ],
};
interface GradientButtonProps {
  text: string;
  onPress: () => void; // Function to handle button press
  bg1: string;
  bg2: string;
}
const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  onPress,
  bg1,
  bg2,
}) => {
  // Generate random colors for the gradient
  // const colors = [
  //   `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  //   `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  // ];
  const colors = [bg1, bg2];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: "center",
        marginRight: 15,
      }}
    >
      <LinearGradient
        colors={colors}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function Search() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 999,
        }}
      >
        <View
          style={{
            width: w(300),
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: "#0077B6",
              fontSize: w(30),
              fontFamily: ff.deckSemiBold,
            }}
          >
            Coming Soon
          </Text>
          <Text
            style={{
              color: "#000",
              fontSize: w(15),
              fontFamily: ff.deckSemiBold,
              marginTop: h(5),
            }}
          >
            Stay tuned for exciting updates!
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flex: 1,
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollViewStyle}
            contentContainerStyle={styles.scrollViewContent}
          >
            {/* Place your horizontally scrollable content here */}

            <GradientButton
              bg1="#0077B6"
              bg2="#00BFFF"
              text="Jobs"
              onPress={() => console.log("Search Jobs")}
            />
            <GradientButton
              bg1="#0077B6"
              bg2="#32CD32"
              text="Admit Cards"
              onPress={() => console.log("Search Jobs")}
            />
            <GradientButton
              bg1="#0077B6"
              bg2="#FFD700"
              text="Latest"
              onPress={() => console.log("Search Jobs")}
            />
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginHorizontal: 20,
            flexDirection: "column",

            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: ff.displayBlack,
              marginVertical: 20,
              color: "black",
            }}
          >
            Latest Jobs
          </Text>

          <View
            style={{
              flexDirection: "column",
              gap: 20,
            }}
          >
            {sampleData.Latest.map((item) => (
              <TouchableOpacity key={item.id}>
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    padding: 15,
                    marginHorizontal: 10,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "#cdcccc",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "#0077B6",
                        fontSize: 30,
                        fontFamily: ff.deckSemiBold,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 12,
                        fontFamily: ff.deckBold,
                        letterSpacing: 1,
                      }}
                    >
                      {item.company}
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: "#000",
                      fontSize: 12,
                      fontFamily: ff.deckBold,
                      letterSpacing: 1,
                    }}
                  >
                    {item.location}
                  </Text>
                  {/* <Text>{item.postedDate}</Text> */}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
  },
  scrollViewStyle: {
    marginHorizontal: 20,
    // Styles for the ScrollView
  },
  scrollViewContent: {
    alignItems: "center", // Centers items vertically in the ScrollView
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30, // Adjust padding as needed
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: ff.deckSemiBold,
    letterSpacing: 1,
  },
});
