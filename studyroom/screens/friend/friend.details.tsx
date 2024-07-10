import React, { useEffect, useState } from 'react';
import { View, TextInput, SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import Header from '@/components/Header'; // Assuming Header is imported correctly
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../../utils/theme';
import axios from 'axios';
import { BACKEND } from '@/utils/config';
import { Toast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/Button';
import { getUserId } from '@/utils/keys';


const FriendDetails = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [friends, setFriends] = useState([]); // [ {name: 'John', email: 'john@gmail', phoneNumber: '1234567890'}

    const AddFriend = async () => {
        // Implement seat booking logic using friend's details
        const userId = await getUserId();
        console.log(userId, "userId")
        console.log(name, email, phoneNumber, "name, email, phoneNumber")


            const res = await axios.post(`${BACKEND}/api/v1/auth/addFriend/${userId}`, {
                name: name,
                email: email,
                phoneNumber: phoneNumber
    
            })
            console.log(res.status)
    
            
      
   
        if (res.status === 201 || res.status === 200) {
            console.log(res.data, "----????")
            setFriends(res.data);

            console.log('Friend added successfully');
            Toast.show('Friend added successfully');

        }
        switch (res.status) {
            case 200: // Assuming 200 is also a success status for fetching friends
            case 201:
                // console.log('Friend fetched successfully', res.data);
                // setFriends(res.data); // Assuming you have a state setter for friends
                // Toast.show('Friend fetched successfully');
                break;
            case 404:
                console.log('No friends found');
                Toast.show('No. Try adding some!');
                break;
            default:
                console.log('Unexpected error occurred');
                Toast.show('An error occurred. Please try again.');
                // Optionally, prompt for a retry here
                break;
        }
        console.log('Booking seat for:', name, email, phoneNumber);
    };
    const GetFriend = async () => {
        try {
            const id = await AsyncStorage.getItem('userId');
            const userId = JSON.parse(id || '{}');
            const res = await axios.post(`${BACKEND}/api/v1/auth/getFriends`, {
                userId: userId
            });
    
            switch (res.status) {
                case 200: // Assuming 200 is also a success status for fetching friends
                case 201:
                    console.log('Friend fetched successfully', res.data);
                    setFriends(res.data); // Assuming you have a state setter for friends
                    Toast.show('Friend fetched successfully');
                    break;
                case 404:
                    console.log('No friends found');
                    Toast.show('No friends found. Try adding some!');
                    break;
                default:
                    console.log('Unexpected error occurred');
                    Toast.show('An error occurred. Please try again.');
                    // Optionally, prompt for a retry here
                    break;
            }
        } catch (error) {
            // console.error('Error fetching friends:', error);
            Toast.show('Failed to fetch friends. Would you like to retry?', {
                duration: 2000,
                dangerIcon: <Ionicons name="alert-circle" size={24} color={'red'} />,






              
            });
        }
    };

    useEffect(() => {
        GetFriend();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Header color='black' />
            </View>
            <KeyboardAvoidingView
            style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.white,
                padding: spacing.large,
                gap:10,
                marginBottom: 20,
            }}
            >


                <View style={styles.friendDetailsContainer}>
                    <Text style={styles.heading}>Add Your Friend</Text>
                    <Ionicons name="person-add" size={24} color={colors.black} style={styles.icon} />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => AddFriend()}
                >

                    <Button text="Add Friend"
                        width={150}

                    />
                </TouchableOpacity>

            </KeyboardAvoidingView>

            <ScrollView>
        {friends.length === 0 && (
                    <Text style={{
                        fontSize: 16,
                        color: '#666',
                        textAlign: 'center',
                        marginTop: 20,
                    }}>No friends found. Add some friends to see them here.</Text>
                
        )}

                {friends.map((friend, index) => (
                    <View key={index} style={{
                        backgroundColor: '#fff',
                        padding: 20,
                        marginVertical: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        elevation: 4,
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>Name: {friend.name}</Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#666',
                        }}>Email: {friend.email}</Text>
                        <Text style={styles.label}>Phone Number: {friend.phoneNumber}</Text>
                    </View>
                ))}

            </ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.large,
    },
    headerContainer: {
        marginBottom: spacing.large,
    },
    friendDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.medium,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        letterSpacing: 2,
    },
    icon: {
        marginLeft: spacing.medium,
    },
    formContainer: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        padding: spacing.medium,
        backgroundColor: colors.white,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: spacing.small,
    },
    textInput: {
        marginBottom: spacing.small,
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        padding: spacing.small,
        borderColor: colors.gray,
    },
    button: {
        marginTop: spacing.large,
        backgroundColor: colors.primary,
        color: colors.white,
        borderRadius: 5,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.small,
    },
});

export default FriendDetails;
