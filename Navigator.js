import React from "react";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Image, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ThemeContext from "./utilities/ThemeContext";
import LightHomeActive from "./assets/icons/light/home_active.png";
import DarkHomeActive from "./assets/icons/dark/home_active.png";
import HomeInactiveIcon from "./assets/icons/home_inactive.png";
import LightMapActiveIcon from "./assets/icons/light/map_active.png";
import DarkMapActiveIcon from "./assets/icons/dark/map_active.png";
import MapInactiveIcon from "./assets/icons/map_inactive.png";
import LightListActiveIcon from "./assets/icons/light/list_active.png";
import DarkListActiveIcon from "./assets/icons/dark/list_active.png";
import ListInactiveIcon from "./assets/icons/list_inactive.png";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import ListScreen from "./screens/ListScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Navbar from "./components/Navbar";
import AddLocationScreen from "./screens/AddLocationScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
    const { themeMode } = React.useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: themeMode === 'light' ? 'black' : 'white',
                tabBarInactiveTintColor: themeMode === 'light' ? 'gray' : 'lightgray',
                tabBarStyle: [
                    {
                        display: 'flex',
                    },
                    null,
                ],
                tabBarIcon: ({ focused }) => {
                    let iconComponent;

                    if (route.name === 'Home') {
                        iconComponent = focused ? (
                            <Image source={themeMode === 'light' ? LightHomeActive : DarkHomeActive}
                                   style={{ width: 24, height: 24 }} />
                        ) : (
                            <Image source={HomeInactiveIcon} style={{ width: 24, height: 24 }} />
                        );
                    } else if (route.name === 'Map') {
                        iconComponent = focused ? (
                            <Image source={themeMode === 'light' ? LightMapActiveIcon : DarkMapActiveIcon}
                                   style={{ width: 24, height: 24 }} />
                        ) : (
                            <Image source={MapInactiveIcon} style={{ width: 24, height: 24 }} />
                        );
                    } else if (route.name === 'List') {
                        iconComponent = focused ? (
                            <Image source={themeMode === 'light' ? LightListActiveIcon : DarkListActiveIcon}
                                   style={{ width: 24, height: 24 }} />
                        ) : (
                            <Image source={ListInactiveIcon} style={{ width: 24, height: 24 }} />
                        );
                    }

                    return iconComponent;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: 'Kaart' }} />
            <Tab.Screen name="List" component={ListScreen} options={{ tabBarLabel: 'Lijst' }} />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    const { themeMode } = React.useContext(ThemeContext);

    return (
        <NavigationContainer theme={themeMode === 'dark' ? DarkTheme : DefaultTheme}>
            <View style={styles.container}>
                <Navbar />
                <Stack.Navigator>
                    <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="AddLocation" component={AddLocationScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppNavigator;
