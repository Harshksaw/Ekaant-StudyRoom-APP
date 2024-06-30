import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
    text: string;
    width: number;

}

const Button: React.FC<ButtonProps> = ({ text, width}: ButtonProps) => {

    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={["#0077B6", "#90E0EF"]}
            style={[styles.buttonWrapper, { width }]}
        >
              <Text style={styles.buttonText}>
                    {text}
                </Text>
          
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        borderRadius: 10,
        paddingVertical: 10,
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
        fontFamily: 'Bold',
    },
});

export default Button;