import React from 'react';
import { View, Text } from 'react-native';

interface CardDetailScreenProps {
    // Define your params here
}

const CardDetailScreen: React.FC<CardDetailScreenProps> = ({ /* Destructure your params here */ }) => {
    return (
        <View>
            <Text>Course Details</Text>
            {/* Add your carousel component here */}
            {/* Add your course details component here */}
        </View>
    );
};

export default CardDetailScreen;