import React, {useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import generateStyles from '../Styles';
import ThemeContext from '../ThemeContext';
import { Magnetometer } from 'expo-sensors';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';



const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [heading, setHeading] = useState(0);

    const [markers, setMarkers] = useState([]);

    const { themeMode } = useContext(ThemeContext);
    const styles = generateStyles(themeMode);

// ref
    const bottomSheetRef = useRef(null);

// callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Waar gaan we heen? heeft geen toegang tot je locatie!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();

        fetchLocations();
    }, []);

    useEffect(() => {
        const subscription = Magnetometer.addListener((result) => {
            const { x, y, z } = result;

            console.log(result)

            const newHeading = Math.atan2(y, x) * (180 / Math.PI);
            setHeading(newHeading >= 0 ? newHeading : newHeading + 360);
        });

        Magnetometer.setUpdateInterval(16);

        return () => {
            subscription.remove();
        };
    }, []);


    const fetchLocations = async () => {
        try {
            const response = await fetch('https://sijmenlokers.nl/waar-gaan-we-heen/locations.json');
            const data = await response.json();
            setMarkers(data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const generateMarkerImage = (color) => {
        switch (color) {
            case 'blue':
                return require('../assets/icons/map/marker_blue.png');
            case 'cyan':
                return require('../assets/icons/map/marker_cyan.png');
            case 'green':
                return require('../assets/icons/map/marker_green.png');
            case 'magenta':
                return require('../assets/icons/map/marker_magenta.png');
            case 'orange':
                return require('../assets/icons/map/marker_orange.png');
            case 'pink':
                return require('../assets/icons/map/marker_pink.png');
            default:
                return null;
        }
    };


    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {location ? (
                <>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                            title={marker.name}
                        >
                            <Image
                                source={generateMarkerImage(marker.color)}
                                style={{ width: 40, height: 70 }}
                            />
                        </Marker>
                    ))}

                    <Marker
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
                                transform: [{ rotate: `${heading}deg` }]
                            }}
                        />
                    </Marker>
                </MapView>

                    <BottomSheet
                        snapPoints={[100, '90%']}
                        ref={bottomSheetRef}
                        onChange={handleSheetChanges}
                    >
                        <BottomSheetView style={styles.container}>
                            <Text>Awesome 🎉</Text>
                        </BottomSheetView>
                    </BottomSheet>
                </>

            ) : (
                <Text style={styles.text}>Kaart wordt geladen...</Text>
            )}
        </View>
    );
};

export default MapScreen;
