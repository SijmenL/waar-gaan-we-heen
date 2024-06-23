import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import generateStyles from '../Styles';
import ThemeContext from '../utilities/ThemeContext';
import {Magnetometer} from 'expo-sensors';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import SavedIcon from "../assets/icons/like_filled.png";
import NotSavedIcon from "../assets/icons/like.png";
import {getAllLocations, generateMarkerImage} from '../utilities/MarkerStorage';
import StarRating from "../components/StarRating";


const MapScreen = ({route}) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [heading, setHeading] = useState(0);
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);
    const [savedMarkers, setSavedMarkers] = useState([]);
    const [onlineMarkers, setOnlineMarkers] = useState([]);

    const {themeMode} = useContext(ThemeContext);
    const styles = generateStyles(themeMode);
    const bottomSheetRef = useRef(null);


    // Check if the user has location access
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Waar gaan we heen? heeft geen toegang tot je locatie!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();

        getAllLocations(setMarkers, setSavedMarkers, setOnlineMarkers);
    }, []);

    // Use the phone's compass to rotate the users marker on the map.
    useEffect(() => {
        const subscription = Magnetometer.addListener((result) => {
            const {x, y} = result;
            const newHeading = Math.atan2(y, x) * (180 / Math.PI);
            setHeading(newHeading >= 0 ? newHeading : newHeading + 360);
        });

        Magnetometer.setUpdateInterval(16);

        return () => {
            subscription.remove();
        };
    }, []);

    // Zoom the map in on a marker if the user has pressed the marker from the list view.
    useEffect(() => {
        if (route.params && route.params.marker) {
            setSelectedMarker(route.params.marker);
            if (bottomSheetRef.current) {
                bottomSheetRef.current.snapToIndex(1);
            }
            setMapRegion({
                latitude: route.params.marker.latitude,
                longitude: route.params.marker.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            });
        }
    }, [route.params]);

    // Load the saved and the online markers every time the screen is loaded, to have up-to-date information
    useFocusEffect(
        React.useCallback(() => {
            getAllLocations(setMarkers, setSavedMarkers, setOnlineMarkers);
        }, [])
    );

    // Open the bottomsheet if a marker is pressed.
    const handleMarkerPress = (marker) => {
        setSelectedMarker(marker);
        bottomSheetRef.current?.snapToIndex(0);
    };

    // Display an error message if the map didn't load correctly
    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{errorMsg}</Text>
            </View>
        );
    } else {

        return (
            <View style={styles.container}>
                {location ? (
                    <>
                        <MapView
                            style={styles.map}
                            region={mapRegion}
                            showsUserLocation={false} // Disable the build in marker
                            showsMyLocationButton={true}
                        >
                            {markers.map((marker, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: marker.latitude,
                                        longitude: marker.longitude // Add markers on the right coords
                                    }}
                                    onPress={() => handleMarkerPress(marker)}
                                >
                                    <Image
                                        source={generateMarkerImage(marker.color)} // Give the marker the right color
                                        style={{width: 40, height: 70}}
                                    />
                                </Marker>
                            ))}

                            <Marker // The marker for the users location
                                zIndex={1000}
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }}
                            >
                                <Image
                                    source={require('../assets/icons/map/preson_marker.png')}
                                    style={{
                                        width: 50,
                                        height: 40,
                                        transform: [{rotate: `${heading}deg`}]
                                    }}
                                />
                            </Marker>
                        </MapView>

                        {selectedMarker ? (
                            <BottomSheet
                                // Open a bottomSheet when a marker is pressed
                                snapPoints={['10%', '31%', '90%']}
                                enablePanDownToClose={true}
                                ref={bottomSheetRef}
                                backgroundStyle={{
                                    backgroundColor: themeMode === 'light' ? '#fff' : '#1a1a1a',
                                }}
                                handleIndicatorStyle={{
                                    backgroundColor: themeMode === 'light' ? '#c4c4c4' : '#4b4b4b',
                                }}
                            >
                                <BottomSheetView style={styles.bottomSheet}>
                                    <Text style={[styles.bottomTitle, styles.title, styles.text]}>
                                        {selectedMarker ? selectedMarker.name : 'Titel'}
                                    </Text>
                                    <Text style={[styles.bottomDescription, styles.text]}>
                                        {selectedMarker ? selectedMarker.description : 'Beschrijving'}
                                    </Text>
                                    <View style={[styles.buttonContainer, styles.buttonContainerMap]}>
                                        <View style={styles.buttonContainerInformation}>
                                            <Image
                                                source={savedMarkers.some(m => m.name === selectedMarker.name) ? SavedIcon : NotSavedIcon}
                                                style={{width: 24, height: 24}}/>

                                            {savedMarkers.some(m => m.name === selectedMarker.name) ? (
                                                <StarRating
                                                    rating={selectedMarker.rating || 0}
                                                    changeAble={false}
                                                />
                                            ) : (
                                                <Text style={[styles.text, styles.saveText]}>
                                                    Je hebt deze locatie niet opgeslagen, je kunt deze opslaan in de
                                                    lijst!
                                                </Text>
                                            )}
                                        </View>
                                        {savedMarkers.some(m => m.name === selectedMarker.name) ? (
                                            <Text style={[styles.bottomDescription, styles.text]}>
                                                {selectedMarker ? selectedMarker.notes : 'Notities'}
                                            </Text>
                                        ) : null}
                                    </View>
                                    {selectedMarker ? (
                                        <Image
                                            source={{uri: selectedMarker.image}}
                                            style={styles.sheetImage}
                                            onError={(error) => console.log('Error loading image', error)}
                                        />
                                    ) : null}
                                </BottomSheetView>
                            </BottomSheet>
                        ) : null}
                    </>
                ) : (
                    <>
                        <Text style={styles.text}>Kaart wordt geladen...</Text>
                    </>
                )}
            </View>
        );
    }
};

export default MapScreen;
