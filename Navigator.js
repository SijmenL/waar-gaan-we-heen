import React from "react";
import ThemeContext from "./ThemeContext";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {Image} from "react-native";
import LightHomeActive from "./assets/icons/light/home_active.png";
import DarkHomeActive from "./assets/icons/dark/home_active.png";
import HomeInactiveIcon from "./assets/icons/home_inactive.png";
import LightMapActiveIcon from "./assets/icons/light/map_active.png";
import DarkMapActiveIcon from "./assets/icons/dark/map_active.png";
import MapInactiveIcon from "./assets/icons/map_inactive.png";
import LightGroupActiveIcon from "./assets/icons/light/groups_active.png";
import DarkGroupActiveIcon from "./assets/icons/dark/groups_active.png";
import GroupInactiveIcon from "./assets/icons/groups_inactive.png";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import GroupScreen from "./screens/GroupScreen";
import SettingsScreen from "./screens/SettingsScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const {themeMode} = React.useContext(ThemeContext);

    return (
        <NavigationContainer theme={themeMode === 'dark' ? DarkTheme : DefaultTheme}>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    headerShown: false,
                    tabBarActiveTintColor: themeMode === 'light' ? 'black' : 'white',
                    tabBarInactiveTintColor: themeMode === 'light' ? 'gray' : 'lightgray',
                    tabBarStyle: [
                        {
                            display: 'flex',
                        },
                        null,
                    ],
                    tabBarIcon: ({focused}) => {
                        let iconComponent;

                        if (route.name === 'Home') {
                            iconComponent = focused ? (
                                <Image source={themeMode === 'light' ? LightHomeActive : DarkHomeActive}
                                       style={{width: 24, height: 24}}/>
                            ) : (
                                <Image source={HomeInactiveIcon} style={{width: 24, height: 24}}/>
                            );
                        } else if (route.name === 'Map') {
                            iconComponent = focused ? (
                                <Image source={themeMode === 'light' ? LightMapActiveIcon : DarkMapActiveIcon}
                                       style={{width: 24, height: 24}}/>
                            ) : (
                                <Image source={MapInactiveIcon} style={{width: 24, height: 24}}/>
                            );
                        } else if (route.name === 'Group') {
                            iconComponent = focused ? (
                                <Image source={themeMode === 'light' ? LightGroupActiveIcon : DarkGroupActiveIcon}
                                       style={{width: 24, height: 24}}/>
                            ) : (
                                <Image source={GroupInactiveIcon} style={{width: 24, height: 24}}/>
                            );
                        }

                        return iconComponent;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: 'Home'}}/>
                <Tab.Screen name="Map" component={MapScreen} options={{tabBarLabel: 'Kaart'}}/>
                <Tab.Screen name="Group" component={GroupScreen} options={{tabBarLabel: 'Groepen'}}/>
                <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarLabel: 'Instellingen'}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
