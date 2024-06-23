import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimeSlotProps {
    from: any;
    to: any;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ from, to }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{from} to{to} </Text>
        </View>
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
});

export default TimeSlot;