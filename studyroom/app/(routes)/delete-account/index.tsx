import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND } from '@/utils/config';


const { height } = Dimensions.get('window');

export default function DeleteAccount() {
  const [visible, setVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(height)).current;
  const router = useRouter();


  const showModal = () => {
    setVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 5
    }).start();
  };

  const hideModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setVisible(false);
    });
  };

  const handleDeleteAccount = async () => {
    try {

    //   await signOut();

    const userData = await AsyncStorage.getItem("userData")
    // console.log("🚀 ~ handleDeleteAccount ~ userData.data.user.id:", JSON.parse(userData).data.user_id)

    const res = await axios.post(`${BACKEND}/api/v1/auth/delete-account`, {
        id : JSON.parse(userData).data.user_id || JSON.parse(userData).data.user_id ,
        


    });
          router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete account. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Delete Account
        </Text>
        
        <Text style={styles.warning}>
          Warning: This action cannot be undone
        </Text>
        
        <Text style={styles.description}>
          Deleting your account will:
        </Text>
        
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>• Remove all your personal information</Text>
          <Text style={styles.bulletPoint}>• Delete your booking history</Text>
          <Text style={styles.bulletPoint}>• Cancel any active subscriptions</Text>
          <Text style={styles.bulletPoint}>• Log you out permanently</Text>
        </View>

        <TouchableOpacity
          onPress={showModal}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <Modal
          visible={visible}
          transparent={true}
          onRequestClose={hideModal}
          animationType="none"
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={hideModal}
          >
            <Animated.View 
              style={[
                styles.modalContent,
                {
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <View style={styles.modalHandle} />
              
              <Text style={styles.modalTitle}>
                Confirm Account Deletion
              </Text>
              
              <Text style={styles.modalText}>
                Are you sure you want to delete your account? This action cannot be undone.
              </Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={hideModal}
                  style={[styles.button, styles.modalCancelButton]}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={handleDeleteAccount}
                  style={[styles.button, styles.modalDeleteButton]}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  warning: {
    fontSize: 16,
    color: '#dc2626',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  bulletPoints: {
    marginBottom: 30,
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4b5563',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6b7280',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4b5563',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  modalCancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6b7280',
    minWidth: 100,
  },
  modalDeleteButton: {
    backgroundColor: '#dc2626',
    minWidth: 100,
  },
});
