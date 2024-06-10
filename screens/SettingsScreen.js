import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../Styles';
import ThemeContext from '../ThemeContext';

const SettingsScreen = () => {
    const { themeMode, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <Text>Settings! Current theme: {themeMode}</Text>
            <TouchableOpacity onPress={toggleTheme}>
                <Text>Toggle Theme</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;
