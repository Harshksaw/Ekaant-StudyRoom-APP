import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutScreen: React.FC = () => {


    return (
        <SafeAreaView>
            {/* Header */}
            <Text>Checkout</Text>

            {/* Image and Side Details */}
            <View>
                {/* <Image source={require('path/to/your/image')} /> */}
                <Text>Side Details</Text>
            </View>

            {/* Summary */}
            <View>
                <Text>Summary</Text>
            </View>
        </SafeAreaView>
    );
};

export default CheckoutScreen;