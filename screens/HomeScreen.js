import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import generateStyles from '../Styles';
import ThemeContext from '../utilities/ThemeContext';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getAllLocations} from "../utilities/MarkerStorage";
import StarRating from "../components/StarRating";
import SavedIcon from "../assets/icons/like_filled.png";
import NotSavedIcon from "../assets/icons/like.png";

const HomeScreen = () => {
    const {themeMode, toggleTheme} = useContext(ThemeContext);
    const styles = generateStyles(themeMode);
    const [markers, setOnlineMarkers] = useState([]);
    const [allMarkers, setMarkers] = useState([]);
    const [savedMarkers, setSavedMarkers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getAllLocations(setMarkers, setSavedMarkers, setOnlineMarkers);
    }, []);

    const handleMarkerPress = (marker) => {
        // Navigate to MapScreen and pass marker information
        navigation.navigate('Map', {marker});
    };

    // Load the saved and the online markers every time the screen is loaded, to have up-to-date information
    useFocusEffect(
        React.useCallback(() => {
            getAllLocations(setMarkers, setSavedMarkers, setOnlineMarkers);
        }, [])
    );

    return (
        <View style={styles.screen}>
            <View>
                <Text style={[styles.homeTitle, styles.text]}>
                    Waar <Text style={{color: "#0078ff"}}>gaan</Text> we heen?
                </Text>
                <Text style={[styles.title, styles.text]}>
                    Mijn locaties
                </Text>
                <Text style={[styles.subtitle]}>
                    De locaties die je hebt opgeslagen of aangemaakt
                </Text>
                {savedMarkers && savedMarkers.length > 0 ? (
                    <ScrollView horizontal={true} contentContainerStyle={{marginTop: 15}}>
                        {savedMarkers.map((marker, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.location}
                                onPress={() => handleMarkerPress(marker)}
                            >
                                <Image
                                    source={{uri: marker.image}}
                                    style={styles.homeImage}
                                    onError={(error) => console.error('Error loading image', error)}
                                    onLoad={() => console.log('Image loaded successfully')}
                                />
                                <Text style={[styles.text, styles.locationTitle]}>
                                    {marker.name}
                                </Text>
                                <StarRating
                                    rating={marker.rating || 0}
                                    changeAble={false}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : (
                    <View style={[styles.buttonContainer, styles.buttonContainerMap]}>
                        <View style={styles.buttonContainerInformation}>
                            <Image
                                source={NotSavedIcon}
                                style={{width: 24, height: 24}}
                            />
                            <Text style={[styles.text, styles.saveText]}>
                                Je hebt nog geen locaties opgeslagen of aangemaakt, je kunt dit doen in de lijstweergave!
                            </Text>
                        </View>
                    </View>
                )}

            </View>
            <View>
                <Text style={[styles.title, styles.marginTop, styles.text]}>
                    Beschikbare locaties
                </Text>
                <Text style={[styles.subtitle]}>
                    De locaties die al op de kaart staan
                </Text>
                <ScrollView horizontal={true} contentContainerStyle={{marginTop: 15}}>
                    {markers.map((marker, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.location}
                            onPress={() => handleMarkerPress(marker)}
                        >
                            <Image
                                source={{uri: marker.image}}
                                style={styles.homeImage}
                                onError={(error) => console.error('Error loading image', error)}
                                onLoad={() => console.log('Image loaded successfully')}
                            />
                            <Text style={[styles.text, styles.locationTitle]}>
                                {marker.name}
                            </Text>
                            <Text style={[styles.text, styles.locationSubtitle]}>
                                {marker.description}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>
        </View>
    );
};

export default HomeScreen;
