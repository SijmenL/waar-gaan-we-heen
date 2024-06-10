import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import generateStyles from '../Styles';
import ThemeContext from '../ThemeContext';

const HomeScreen = () => {
    const { themeMode, toggleTheme } = useContext(ThemeContext);
    const styles = generateStyles(themeMode); // Generate styles based on the current theme

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home! </Text>
            <TouchableOpacity onPress={toggleTheme}>
                <Text style={styles.text}>Toggle Theme</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;
