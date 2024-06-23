import React, { useContext } from 'react';
import {View, Text, Switch, TouchableOpacity} from 'react-native';
import generateStyles from '../Styles';
import ThemeContext from '../utilities/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const { themeMode, toggleTheme } = useContext(ThemeContext);
    const styles = generateStyles(themeMode);
    const navigation = useNavigation();

    // Different colors for light and dark mode. Not used rn, but available for future sliders
    const trackColor = {
        false: themeMode === 'dark' ? '#39393d' : '#e8e8e8',
        true: themeMode === 'dark' ? '#67ce67' : '#33c75b',
    };

    return (
        <View style={styles.screen}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.menuButton, styles.buttonSecondary]}
            >
                <Text style={styles.secondaryButtonText}>Terug</Text>
            </TouchableOpacity>
            <Text style={[styles.title, styles.text]}>Instellingen</Text>
            <View style={styles.settingContainer}>
                <Text style={styles.text}>Dark Mode</Text>
                <Switch
                    trackColor={trackColor}
                    thumbColor={themeMode === 'dark' ? "#ffffff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleTheme}
                    value={themeMode === 'dark'}
                />
            </View>
        </View>
    );
};

export default SettingsScreen;
