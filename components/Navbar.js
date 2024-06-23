import React, {useContext} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LightSettingsIcon from "../assets/icons/light/settings.png";
import DarkSettingsIcon from "../assets/icons/dark/settings.png";
import ThemeContext from "../utilities/ThemeContext";
import generateStyles from "../Styles";

const CustomHeader = () => {
    const navigation = useNavigation();

    const {themeMode} = useContext(ThemeContext);
    const styles = generateStyles(themeMode);


    return (
        <View style={styles.headerContainer}>
            <Image source={require('../assets/adaptive-icon.png')} style={styles.logo} />
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Image source={themeMode === 'light' ? LightSettingsIcon : DarkSettingsIcon}
                       style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
        </View>
    );
};


export default CustomHeader;
