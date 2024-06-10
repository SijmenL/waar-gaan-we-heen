import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ThemeContext, {ThemeProvider} from './ThemeContext';
import AppNavigator from "./Navigator";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";


export default function App() {
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <ThemeProvider>
                    <AppNavigator/>
                </ThemeProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
