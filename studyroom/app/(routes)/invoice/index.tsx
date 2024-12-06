import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BACKEND } from '@/utils/config';

export default function Invoice() {
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const route = useRoute();
  const { id } = route.params;

  const getInvoice = async () => {
    try {
      const res = await axios.post(`${BACKEND}/api/v1/booking/invoices/${id}`);
      setInvoiceDetails(res.data.data);
      console.log("🚀 ~ getInvoice ~ res:", res.data);
    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  };

  useEffect(() => {
    getInvoice();
  }, []);

  if (!invoiceDetails) {
    return (
      <SafeAreaView style={styles.container}>
       <ActivityIndicator 
       color="blue"
       size="large"
       />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.invoiceContainer}>
        <Text style={styles.title}>Invoice</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice Number:</Text>
          <Text style={styles.value}>{invoiceDetails.invoiceNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice Date:</Text>
          <Text style={styles.value}>{new Date(invoiceDetails.invoiceDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Customer Name:</Text>
          <Text style={styles.value}>{invoiceDetails.customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Customer Email:</Text>
          <Text style={styles.value}>{invoiceDetails.customerEmail}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Customer Phone:</Text>
          <Text style={styles.value}>{invoiceDetails.customerPhoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Date:</Text>
          <Text style={styles.value}>{new Date(invoiceDetails.bookingDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Date:</Text>
          <Text style={styles.value}>{invoiceDetails.libraryaddress}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Period:</Text>
          <Text style={styles.value}>{invoiceDetails.bookingPeriod} month(s)</Text>
        </View>
       
        <View style={styles.row}>
          <Text style={styles.label}>Final Price:</Text>
          <Text style={styles.value}>${invoiceDetails.finalPrice}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Status:</Text>
          <Text style={styles.value}>{invoiceDetails.bookingStatus}</Text>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white',
  justifyContent: 'center',
  // alignItems: 'center',
  paddingTop:40
},
scrollContainer: {
  padding: 20,
},
invoiceContainer: {
  padding: 20,
  borderRadius: 10,
  backgroundColor: '#f9f9f9',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 5,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
},
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},
label: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
},
value: {
  fontSize: 16,
  color: '#666',
},
});