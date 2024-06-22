import React, { Component } from 'react'
import { Modal, Text, View } from 'react-native'

export default class BookingModal extends Component {
  render() {
    return (
      <Modal>
    <View style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  }}>
      
            <View style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                gap: 20,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                width: "80%",
                height: "40%",
            }}>

              <Text  style={{
                textAlign: "center",
                
              }} >Select Period</Text>

              <Text>2 Months</Text>

              <View>
                <Text>Select Slot</Text>

                {/* //timing */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                    margin: 10,
                    // justifyContent: "space-between",
                  }}>
                    <Text>2 - 10pm</Text>
                  </View>

              </View>

              </View>
            </View>
      </Modal>
    )
  }
}
