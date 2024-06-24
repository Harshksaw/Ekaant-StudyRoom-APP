import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TimeSlotProps {
  from: string; // Changed type to string for better type safety
  to: string; // Changed type to string for better type safety
  onSelect: (timeSlot: { from: string; to: string }) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ from, to, onSelect }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false); // Added explicit type

  const toggleSelection = () => {
    const newSelectionState = !isSelected;
    setIsSelected(newSelectionState); // Update selection state
    if (newSelectionState) { // Only call onSelect when the item is selected
      onSelect({ from, to }); // Invoke onSelect with the time slot
    }
  };

  return (
    <TouchableOpacity onPress={toggleSelection}>
      <View style={[styles.container, isSelected ? styles.selected : {}]}>
        <Text style={[styles.text, isSelected ? styles.selectedText : {}]}>
          {from} to {to}
        </Text>
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
    color: 'black', // Example text color
  },
  selected: {
    backgroundColor: 'rgba(0, 123, 255, 0.5)',
  },
  selectedText: {
    color: 'white', // Change text color when selected for better visibility
  },
});

export default TimeSlot;