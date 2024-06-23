import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import generateStyles from '../Styles';
import { generateMarkerImage, handleRatingChange, saveMarker, getAllLocations } from '../utilities/MarkerStorage';
import ThemeContext from "../utilities/ThemeContext";
import StarRating from "../components/StarRating";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddLocationScreen = ({ navigation }) => {
    const { themeMode } = useContext(ThemeContext);
    const styles = generateStyles(themeMode);
    const [markers, setMarkers] = useState([]);
    const [savedMarkers, setSavedMarkers] = useState([]);
    const [onlineMarkers, setOnlineMarkers] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [color, setColor] = useState('blue'); // Default color
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 51.904637,
        longitude: 4.478686,
        latitudeDelta: 0.11,
        longitudeDelta: 0.11,
    });

    useEffect(() => {
        getAllLocations(setMarkers, setSavedMarkers, setOnlineMarkers);
    }, []);

    // Load the saved and the online markers every time the screen is loaded, to have up-to-date information
    useFocusEffect(
        React.useCallback(() => {
            getAllLocations(setMarkers, setSavedMarkers, setOnlineMarkers);
        }, [])
    );

    // The colors for the selection with names and codes.
    const displayColors = ['#4f4cfb', '#0ab38b', '#75fb4c', '#d14cfb', '#fb744c', '#fb4ca1'];
    const colors = ['blue', 'cyan', 'green', 'magenta', 'orange', 'pink'];

    // Check location permissions
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need permission to access your photos and camera.');
            }
        })();

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setInitialRegion({
                ...initialRegion,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    // Handle the library image selection mode
    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            setModalVisible(false);
        }
    };

    // Handle the camera
    const handleTakePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need permission to access your camera.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            setModalVisible(false);
        }
    };

    // Save the marker and add it to the list
    const handleSaveMarker = async () => {
        if (!title || !description || !image || !latitude || !longitude) {
            setErrorMsg('Vul de velden in en selecteer een locatie!');
            return;
        }

        const newMarker = {
            name: title,
            description,
            image,
            color,
            latitude,
            longitude,
            notes: '',
            rating: 0,
        };

        try {
            const savedMarkersString = await AsyncStorage.getItem('savedMarkers');
            const savedMarkers = savedMarkersString ? JSON.parse(savedMarkersString) : [];
            const updatedMarkers = [...savedMarkers, newMarker];

            await AsyncStorage.setItem('savedMarkers', JSON.stringify(updatedMarkers));
            navigation.goBack(); // Go back to the previous screen
        } catch (error) {
            console.error('Error saving marker', error);
            setErrorMsg('Er is iets misgegaan bij het opslaan van de marker.');
        }
    };


    // Save the coords and add a visual marker to the map
    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setLatitude(latitude);
        setLongitude(longitude);
    };

    return (
        <View style={styles.screen}>
            <TouchableOpacity onPress={() => navigation.navigate('List')} style={[styles.menuButton, styles.buttonSecondary]}>
                <Text style={[styles.secondaryButtonText]}>
                    Terug
                </Text>
            </TouchableOpacity>
            <Text style={[styles.title, styles.text]}>
                Voeg een locatie toe
            </Text>
            <View style={styles.formElement}>
                <Text style={[styles.text, styles.bannerText]}>
                    De titel van je locatie
                </Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
            </View>

            <View style={styles.formElement}>
                <Text style={[styles.text, styles.bannerText]}>
                    Voeg een beschrijving toe
                </Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                />
            </View>

            {!image ? (
                <TouchableOpacity
                    style={[styles.menuButton, styles.buttonSecondary]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.secondaryButtonText}>
                        Voeg een afbeelding toe
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.addImageContainer} onPress={() => setImage(null)}>
                    <Image source={{ uri: image }} style={styles.addImage} />
                </TouchableOpacity>
            )}

            <View style={[styles.colorSelector]}>
                {colors.map((colorOption, index) => (
                    <TouchableOpacity
                        key={colorOption}
                        style={{
                            backgroundColor: displayColors[index],
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            margin: 5,
                            borderWidth: color === colorOption ? 2 : 0,
                            borderColor: color === colorOption ? '#000' : 'transparent',
                        }}
                        onPress={() => setColor(colorOption)}
                    />
                ))}
            </View>

            <MapView
                style={{ height: 200, width: '100%', borderRadius: 5 }}
                onPress={handleMapPress}
                initialRegion={initialRegion}
            >
                {latitude && longitude && (
                    <Marker
                        coordinate={{ latitude, longitude }}
                    >
                        <Image
                            source={generateMarkerImage(color)} // Use the generateMarkerImage function to get the marker with the selected color
                            style={{ width: 40, height: 70 }}
                        />
                    </Marker>
                )}
            </MapView>

            {errorMsg ? <Text style={ styles.errorMessage }>{errorMsg}</Text> : null}

            <TouchableOpacity
                style={[styles.menuButton, styles.buttonPrimary]}
                onPress={handleSaveMarker}
            >
                <Text style={styles.buttonText}>
                    Opslaan!
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, styles.text]}>Kies een afbeelding</Text>
                        <TouchableOpacity onPress={handlePickImage}>
                            <Text style={[styles.modalButton]}>
                                Kies een afbeelding uit je gallerij
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleTakePhoto}>
                            <Text style={[styles.modalButton]}>
                                Maak een foto
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={[styles.modalCancel]}>
                                Annuleren
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AddLocationScreen;
