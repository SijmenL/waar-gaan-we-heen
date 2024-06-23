import React, { useContext, useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, TextInput, SafeAreaView, Alert} from 'react-native';
import generateStyles from '../Styles';
import ThemeContext from '../utilities/ThemeContext';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import NotSavedIcon from '../assets/icons/like.png';
import SavedIcon from '../assets/icons/like_filled.png';
import StarRating from '../components/StarRating';
import { getAllLocations, toggleSaveMarker, handleNotesChange, handleRatingChange } from '../utilities/MarkerStorage';
import * as LocalAuthentication from "expo-local-authentication";

const ListScreen = () => {
    const { themeMode } = useContext(ThemeContext);
    const styles = generateStyles(themeMode);
    const [markers, setMarkers] = useState([]);
    const [savedMarkers, setSavedMarkers] = useState([]);
    const [onlineMarkers, setOnlineMarkers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getAllLocations(setMarkers, setSavedMarkers, setOnlineMarkers);
    }, []);

    // Load the saved and the online markers every time the screen is loaded, to have up-to-date information
    useFocusEffect(
        React.useCallback(() => {
            getAllLocations(setMarkers, setSavedMarkers, setOnlineMarkers);
        }, [])
    );

    const handleMarkerPress = (marker) => {
        navigation.navigate('Map', { marker });
    };


    // Have biometric security on the add location button
    const handleAddLocation = async () => {
        try {
            const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();

            if (!isBiometricAvailable) {
                Alert.alert('Authenticatie is niet beschikbaar.', 'Mogelijk heb je het niet goed ingesteld.');
                return;
            }

            const biometricAuthResult = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Verifiëren om een locatie toe te voegen',
                fallbackLabel: 'Enter passcode to continue',
            });

            if (biometricAuthResult.success) {
                navigation.navigate('AddLocation');
            } else {
                Alert.alert('Authenticatie mislukt', 'Probeer het nog een keer!');
            }
        } catch (error) {
            console.error('Biometric authentication error:', error);
            Alert.alert('Biometric authentication error', 'An error occurred during biometric authentication. Please try again later.');
        }
    };

    // The layout for a list item
    const renderMarker = (marker, isSaved, index = null) => (
        <View key={marker.name} style={styles.fullBanner}>
            <View style={styles.banner}>
                <TouchableOpacity
                    style={styles.innerBanner}
                    onPress={() => handleMarkerPress(marker)}
                >
                    <Image
                        source={{ uri: marker.image }}
                        style={styles.bannerImage}
                        onError={(error) => console.error('Error loading image', error)}
                        onLoad={() => console.log('Image loaded successfully')}
                    />
                    <View>
                        <Text style={[styles.text, styles.locationTitle, styles.bannerText]}>
                            {marker.name}
                        </Text>
                        <Text style={[styles.text, styles.bannerText]}>
                            {marker.description}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bannerButton}
                    onPress={() => toggleSaveMarker(marker, savedMarkers, setSavedMarkers, () => getAllLocations(setMarkers, setSavedMarkers, setOnlineMarkers))}
                >
                    <Image source={isSaved ? SavedIcon : NotSavedIcon} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>
            {isSaved && (
                <SafeAreaView>
                    <View style={styles.formElement}>
                        <Text style={[styles.text, styles.bannerText]}>
                            Voeg notities toe
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={marker.notes}
                            returnKeyType='done'
                            onChangeText={(text) => handleNotesChange(index, text, savedMarkers, setSavedMarkers)}
                        />
                        </View>
                        <View style={styles.formElement}>
                            <Text style={[styles.text, styles.bannerText]}>
                                Voeg een waardering toe
                            </Text>
                            <StarRating
                                rating={marker.rating || 0}
                                changeAble={true}
                                onChange={(rating) => handleRatingChange(index, rating, savedMarkers, setSavedMarkers)}
                            />
                    </View>
                </SafeAreaView>
            )}
        </View>
    );

    // Render the entire screen
    return (
        <View style={styles.screen}>
            <TouchableOpacity onPress={handleAddLocation} style={[styles.menuButton, styles.buttonPrimary]}>
                <Text style={styles.buttonText}>Voeg een locatie toe</Text>
            </TouchableOpacity>
            <ScrollView>
                {savedMarkers.map((marker, index) => renderMarker(marker, true, index))}
                {markers.filter(marker => !savedMarkers.some(savedMarker => savedMarker.name === marker.name))
                    .map(marker => renderMarker(marker, false))}
            </ScrollView>
        </View>
    );
};

export default ListScreen;
