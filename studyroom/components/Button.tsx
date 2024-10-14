import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
    text: string;
    width: number;
    height?: number;
    radius?: number;
    fontSizeR?: number;

}


    const Button: React.FC<ButtonProps> = ({ text, width, radius = 15, height = 50 , fontSizeR = 18}: ButtonProps) => {
        return (
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={["#0077B6", "#90E0EF"]}
                style={[styles.buttonWrapper, { width, borderRadius: radius, height: height }]}
            >
                <Text style={[styles.buttonText, {
                    fontSize: fontSizeR,
                }]}>
                    {text}
                </Text>
            </LinearGradient>
        );
    };



const styles = StyleSheet.create({
    buttonWrapper: {
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {

        color: 'white',

        letterSpacing: 3,
        fontWeight:'600'

    },
});

export default Button;