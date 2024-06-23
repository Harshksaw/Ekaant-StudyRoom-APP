import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TimeSlotProps {
    from: any;
    to: any;
    onSelect: (timeSlot: { from: any; to: any }) => void; // Add onSelect prop
}

const TimeSlot: React.FC<TimeSlotProps> = ({ from, to, onSelect }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handlePress = () => {
        setIsSelected(!isSelected); // Toggle selection state
        onSelect({ from, to }); // Pass the time slot data to the parent component
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.container, isSelected && styles.selected]}>
                <Text style={[styles.text,  isSelected && styles.selected]}>{from} to {to}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        marginBottom: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '200',
    },
    selected: {
        color: 'white',
        backgroundColor: 'blue', // Style for selected state
    },
});

export default TimeSlot;