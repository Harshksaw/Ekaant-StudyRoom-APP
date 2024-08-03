import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Image, Text, View } from "react-native"
import { Marker } from "react-native-maps"
// import { SelectMarkerContext } from "../../Context/SelectMarkerContext";
const Markers = ({place , index}) =>{

  console.log(place.location, "place location");
  // const {SelectedMarker,setSelectedMarker}=useContext(SelectMarkerContext);

    return place&&(
      <Marker
           coordinate={{
            latitude:place.location[0],
            longitude:place.location[1]
           }}
  
          //  onPress={()=>setSelectedMarker(index)}
          >

            <Image source={{uri:"https://img.icons8.com/?size=100&id=4025&format=png&color=2FE977"}} style={{width:40,height:40}}/>

           

          </Marker>
    )
  } 


export default Markers;