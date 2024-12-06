import React from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';
import { PDFDocument, Page, Text as PDFText } from 'react-native-pdf-lib';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export default function Invoice() {
  const invoiceDetails = {
    id: 'INV-123456',
    date: '2024-12-08',
    items: [
      { description: 'Item 1', quantity: 2, price: 50 },
      { description: 'Item 2', quantity: 1, price: 100 },
    ],
    total: 200,
  };

  const generatePDF = async () => {
    const page1 = Page.create()
      .drawText(`Invoice ID: ${invoiceDetails.id}`, {
        x: 50,
        y: 700,
        size: 20,
      })
      .drawText(`Date: ${invoiceDetails.date}`, {
        x: 50,
        y: 670,
        size: 15,
      })
      .drawText('Items:', {
        x: 50,
        y: 640,
        size: 15,
      });

    invoiceDetails.items.forEach((item, index) => {
      page1.drawText(
        `${item.description} - Quantity: ${item.quantity} - Price: $${item.price}`,
        {
          x: 50,
          y: 610 - index * 30,
          size: 12,
        }
      );
    });

    page1.drawText(`Total: $${invoiceDetails.total}`, {
      x: 50,
      y: 500,
      size: 15,
    });

    const pdfPath = `${RNFS.DocumentDirectoryPath}/invoice.pdf`;
    const pdfDoc = PDFDocument.create(pdfPath).addPages(page1);
    await pdfDoc.write();

    return pdfPath;
  };

  const downloadPDF = async () => {
    try {
      const pdfPath = await generatePDF();
      await Share.open({
        url: `file://${pdfPath}`,
        type: 'application/pdf',
        title: 'Invoice',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.invoiceContainer}>
        <Text style={styles.title}>Invoice</Text>
        <Text>Invoice ID: {invoiceDetails.id}</Text>
        <Text>Date: {invoiceDetails.date}</Text>
        <Text>Items:</Text>
        {invoiceDetails.items.map((item, index) => (
          <Text key={index}>
            {item.description} - Quantity: {item.quantity} - Price: ${item.price}
          </Text>
        ))}
        <Text>Total: ${invoiceDetails.total}</Text>
      </View>
      <Button title="Download PDF" onPress={downloadPDF} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  invoiceContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});