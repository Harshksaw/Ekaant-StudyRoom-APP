import Header from "@/components/Header";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
}
const GradientButton: React.FC<GradientButtonProps> = ({ text, onPress }) => {
  // Generate random colors for the gradient
  const colors = [
    `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: "center",
        marginHorizontal: 10,
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
    <View
      style={{
        flex: 1,
        flexDirection: "column",





        backgroundColor: "white",
        // backgroundColor: "lightgreen",
      }}
    >


        <View
        style={{
          marginTop: 40,
        }}
        >

      <Header />
        </View>
      <View  style={{
        marginTop:40,
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
      }}>

      
      <View>
        <ScrollView
          horizontal={true}
          style={styles.scrollViewStyle}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Place your horizontally scrollable content here */}

          <GradientButton
            text="Jobs"
            onPress={() => console.log("Search Jobs")}
          />
          <GradientButton
            text="Admit Cards"
            onPress={() => console.log("Search Jobs")}
          />
          <GradientButton
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
          fontWeight: "semibold",
          marginTop: 20,
          color: "black",

        }}
        >Latest Jobs</Text>

        <View
        style={{
          flexDirection:"column",
          gap:20,

        }}
        >
          {sampleData.Latest.map((item) => (
            <TouchableOpacity key={item.id}>
              <View
                style={{
                  // flex: 1,
                  // width: 250,
                  backgroundColor:'lightgray',
                  borderRadius:20,
                  padding:10,

                  marginHorizontal: 10,
                  // flexDirection: "column",
                  justifyContent: "space-between",
                  flexDirection: "row",

                  // justifyContent:'flex-start',
                  // alignItems: "flex-start",

                }}
              >
                <View>

                <Text style={{
                  color:'blue',
                }}>{item.title}</Text>
                <Text>{item.company}</Text>
                </View>

                <Text>{item.location}</Text>
                {/* <Text>{item.postedDate}</Text> */}
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </View>
      </View>

    </View>
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
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    // Removed fixed width to allow button width to adjust based on text length
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
