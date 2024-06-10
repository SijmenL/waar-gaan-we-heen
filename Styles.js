// Styles.js
import { StyleSheet } from 'react-native';

const lightModeColors = {
    backgroundColor: '#fff',
    textColor: '#000',
};

const darkModeColors = {
    backgroundColor: '#1a1a1a',
    textColor: '#fff',
};

const generateStyles = (themeMode) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeMode === 'light' ? lightModeColors.backgroundColor : darkModeColors.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: themeMode === 'light' ? lightModeColors.textColor : darkModeColors.textColor,
        },
        map: {
            width: '100%',
            height: '100%',
        },
    });

export default generateStyles;
