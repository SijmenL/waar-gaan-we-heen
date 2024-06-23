import AsyncStorage from '@react-native-async-storage/async-storage';

// Load all the markers from the async storage
export const loadSavedMarkers = async () => {
    try {
        const savedData = await AsyncStorage.getItem('savedMarkers');
        if (savedData !== null) {
            return JSON.parse(savedData);
        }
        return [];
    } catch (error) {
        console.error('Error loading saved markers:', error);
        return [];
    }
};

// Sasve a marker to the async storage
export const saveMarker = async (marker, savedMarkers) => {
    const newSavedMarkers = [...savedMarkers, marker];
    await AsyncStorage.setItem('savedMarkers', JSON.stringify(newSavedMarkers));
    return newSavedMarkers;
};

// Delete a marker from the storage
export const unsaveMarker = async (marker, savedMarkers) => {
    const newSavedMarkers = savedMarkers.filter(savedMarker => savedMarker.name !== marker.name);
    await AsyncStorage.setItem('savedMarkers', JSON.stringify(newSavedMarkers));
    return newSavedMarkers;
};

// Get the saved and online markers and combine them
export const getAllLocations = async (setMarkers, setSavedMarkers, setOnlineMarkers) => {
    try {
        const onlineResponse = await fetch('https://sijmenlokers.nl/waar-gaan-we-heen/locations.json');
        const onlineData = await onlineResponse.json();

        const savedData = await loadSavedMarkers();

        const onlineDataUnique = onlineData.filter(onlineLocation =>
            !savedData.some(savedLocation => savedLocation.name === onlineLocation.name)
        );

        const combinedLocations = [...savedData, ...onlineDataUnique];
        setMarkers(combinedLocations);
        setOnlineMarkers(onlineDataUnique);
        setSavedMarkers(savedData);
    } catch (error) {
        console.error('Error fetching and combining locations:', error);
    }
};

// Logic for the save button in the list view
export const toggleSaveMarker = async (marker, savedMarkers, setSavedMarkers, getAllLocations) => {
    const isSaved = savedMarkers.some(savedMarker => savedMarker.name === marker.name);
    if (isSaved) {
        setSavedMarkers(await unsaveMarker(marker, savedMarkers));
    } else {
        setSavedMarkers(await saveMarker(marker, savedMarkers));
    }
    await getAllLocations(); 
};

// Edit the saved notes
export const handleNotesChange = async (index, text, savedMarkers, setSavedMarkers) => {
    const newSavedMarkers = [...savedMarkers];
    newSavedMarkers[index].notes = text;
    setSavedMarkers(newSavedMarkers);
    await AsyncStorage.setItem('savedMarkers', JSON.stringify(newSavedMarkers));
};

// Edit the rating
export const handleRatingChange = async (index, rating, savedMarkers, setSavedMarkers) => {
    const newSavedMarkers = [...savedMarkers];
    newSavedMarkers[index].rating = rating;
    setSavedMarkers(newSavedMarkers);
    await AsyncStorage.setItem('savedMarkers', JSON.stringify(newSavedMarkers));
};

// Return the right color marker
export const generateMarkerImage = (color) => {
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
}