import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView from 'react-native-maps';
export default function NearBy() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>NearBy</Text>
      <View>
      <MapView style={styles.map} />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});