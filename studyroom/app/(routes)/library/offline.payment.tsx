import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { useRoute } from '@react-navigation/native'

export default function Index() {
  const { width } = useWindowDimensions()
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes (180 seconds)
  const [status, setStatus] = useState("PENDING")
  const params: any = useRoute();
  console.log("🚀 ~ Index ~ params:", params)

  

  
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


  // useEffect(() => {
  //   const statusInterval = setInterval(() => {
  //     fetch(`/api/payment/status?transactionId=123`) // Replace with actual API endpoint and transactionId
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.status === "APPROVED") {
  //           setStatus("APPROVED");
  //           clearInterval(statusInterval);
  //         }
  //       })
  //       .catch(console.error);
  //   }, 5000); // Check every 5 seconds

  //   return () => clearInterval(statusInterval);
  // }, []);
  
  return (
  <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { fontSize: width * 0.07 }]}>Offline Payment</Text>
  
      <View style={[styles.infoBox, { width: width * 0.85 }]}>
        <Text style={[styles.info, { fontSize: width * 0.045 }]}>🏛 Library: XYZ Library</Text>

        <Text style={[styles.info, { fontSize: width * 0.045 }]}>🆔 Payment ID: 123456</Text>
        <Text style={[styles.info, { fontSize: width * 0.045 }]}>💰 Amount: ₹500</Text>
        <Text style={[styles.info, styles.bigInfo, { fontSize: width * 0.06 }]}>
          ⏳ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </Text>
      </View>
  
      <Text style={[styles.status, status === "PENDING" ? styles.pending : styles.canceled]}>
        {status === "PENDING" ? "Waiting for Approval..." : "❌ Payment Canceled"}
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