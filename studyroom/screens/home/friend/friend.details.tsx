import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const FriendDetails = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleBooking = () => {
        // Perform seat booking logic here using the friend's details
        console.log('Booking seat for:', name, email, phoneNumber);
    };

    return (
        <View style={{ alignItems: 'center', borderWidth: 1, padding: 10 }}>
            <TextInput
                style={{ marginBottom: 10 }}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={{ marginBottom: 10 }}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={{ marginBottom: 10 }}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Button title="Book Seat" onPress={handleBooking} />
        </View>
    );
};

export default FriendDetails;