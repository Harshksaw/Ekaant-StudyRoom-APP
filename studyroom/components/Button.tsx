import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
    text: string;
    width: number;

}


    const Button: React.FC<ButtonProps> = ({ text, width, radius = 15, height = 50 }: ButtonProps) => {
        return (
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={["#0077B6", "#90E0EF"]}
                style={[styles.buttonWrapper, { width, borderRadius: radius, height: height }]}
            >
                <Text style={styles.buttonText}>
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
        fontSize: 18,
        letterSpacing: 2,
        fontWeight:'600'

    },
});

export default Button;