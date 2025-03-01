import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { useRoute } from '@react-navigation/native'
import { BACKEND } from '@/utils/config'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Toast } from 'react-native-toast-notifications'



export default function OfflineScreen() {
  const { width } = useWindowDimensions()
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes (180 seconds)
  const [status, setStatus] = useState("PENDING")
  const route  = useRoute();
  const bookingData = route?.params?.item ? JSON.parse(route.params.item) : null;
  console.log("🚀 ~ OfflineScreen ~ bookingData:", bookingData)



  

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setStatus("CANCELED") // Auto-cancel
        }
        return prev - 1
      })
    }, 1000)
  
    return () => clearInterval(interval)
  }, [])

  const transactionId = useSelector((state: any) => state.transaction.transactionId);
  console.log("🚀 ~ OfflineScreen ~ transactionId:", transactionId)

// Poll payment status using axios every 5 seconds
useEffect(() => {
    if (!transactionId) return

    const statusInterval = setInterval(() => {
      axios
        .get(`${BACKEND}/api/v1/booking/offlineStatus`, {
          params: { transactionId }
        })
        .then(response => {
          const data = response.data
          console.log("🚀 ~ statusInterval ~ data:", data)
          if (data.status === "APPROVED") {
            setStatus("APPROVED")
            clearInterval(statusInterval)
            Toast.show("Payment Approved", { type: 'success'  , duration: 3000})

            // router.push('/(tabs)/bookings')
            router.replace('/(tabs)/bookings')

          }

          if (data.status === "CANCELED") {
            setStatus("CANCELED")
            clearInterval(statusInterval)
            Toast.show("Payment Canceled", { type: 'error'  , duration: 3000})
            router.replace('/(tabs)/bookings')
          }
        })
        .catch(error => console.error("Axios error:", error))
    }, 5000)

    return () => clearInterval(statusInterval)
  }, [transactionId])

  
  return (
  <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { fontSize: width * 0.07 }]}>Offline Payment</Text>
  

      <View style={[styles.infoBox, { width: width * 0.85 }]}>
        <Text style={[styles.info, { fontSize: width * 0.045 }]}>
          🏛 Library: {bookingData?.libraryId?.name || "Not Available"}
        </Text>
        <Text style={[styles.info, { fontSize: width * 0.045 }]}>
          🆔 Payment ID: {bookingData?.bookingId?.data?.bookingId || "Not Available"}
        </Text>
        <Text style={[styles.info, { fontSize: width * 0.045 }]}>
          💰 Amount: ₹{bookingData?.totalAmount || "0"}
        </Text>
        <Text style={[styles.info, styles.bigInfo, { fontSize: width * 0.06 }]}>
          ⏳ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </Text>
      </View>
  
      <Text style={[styles.status, 
        status === "PENDING" ? styles.pending : status === "CANCELED" ? styles.canceled : {}]}>
        {status === "PENDING" ? "Waiting for Approval..." : status === "CANCELED" ? "❌ Payment Canceled" : "Approved"}
      </Text>
  
      {status === "CANCELED" && (
        <TouchableOpacity style={[styles.button, { width: width * 0.6 }]} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Retry Payment</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#00796b'
    },
    infoBox: {
      backgroundColor: '#f8f8f8',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      alignItems: 'center'
    },
    info: {
      marginBottom: 5,
      textAlign: 'center'
    },
    bigInfo: {
      fontWeight: 'bold'
    },
    status: {
      marginTop: 10,
      fontWeight: 'bold'
    },
    pending: { color: 'orange' },
    canceled: { color: 'red' },
    button: {
      backgroundColor: '#6200EE',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center'
    },
    buttonText: {
      color: '#fff',
      fontSize: 18
    }
  });