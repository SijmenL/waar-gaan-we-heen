// Styles.js
import {StyleSheet} from "react-native";

const lightModeColors = {
    backgroundColor: "#fff",
    textColor: "#000",
    secondaryColor: "#eeeeee",
    tertiaryColor: "#d2d2d2",
    primaryButtonColor: "#0078ff",
    secondaryButtonColor: "#000",
    secondaryButtonText: "#fff",
    navColor: "#ffffff"
};

const darkModeColors = {
    backgroundColor: "#1a1a1a",
    textColor: "#fff",
    secondaryColor: "#1e1e1e",
    tertiaryColor: "#2d2d2d",
    primaryButtonColor: "#0078ff",
    secondaryButtonColor: "#cecece",
    secondaryButtonText: "#000",
    navColor: "#121212",
};

const generateStyles = (themeMode) =>
    StyleSheet.create({
        logo: {
            width: 50,
            height: 50
        },
        headerContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            backgroundColor: themeMode === "light" ? lightModeColors.navColor : darkModeColors.navColor,
            paddingTop: 40,
        },
        settingsIcon: {
            width: 24,
            height: 24,
        },
        container: {
            flex: 1,
            backgroundColor: themeMode === "light" ? lightModeColors.backgroundColor : darkModeColors.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
        },
        screen: {
            backgroundColor: themeMode === "light" ? lightModeColors.backgroundColor : darkModeColors.backgroundColor,
            paddingTop: "5%",
            padding: "5%",
            height: "100%"
        },
        text: {
            color: themeMode === "light" ? lightModeColors.textColor : darkModeColors.textColor,
        },
        saveText: {
            marginLeft: 10
        },
        map: {
            width: "100%",
            height: "100%",
        },
        bottomTitle: {
            textAlign: "center",
        },
        title: {
            fontSize: 25,
            fontWeight: "bold"
        },
        subtitle: {
            fontSize: 18,
            color: themeMode === "light" ? "#7f7f7f" : "#8d8d8d",
        },
        bottomSheet: {
            display: "flex",
            alignItems: "center",
            paddingRight: "5%",
            paddingLeft: "5%",
            justifyContent: "flex-start"
        },
        bottomDescription: {
            textAlign: "center",
            marginTop: "6%",
        },
        buttonContainer: {
            backgroundColor: themeMode === "light" ? lightModeColors.secondaryColor : darkModeColors.secondaryColor,
            width: "90%",
            borderRadius: 5,
            padding: 15,
            alignSelf: "center"
        },
        buttonContainerMap: {
            flexDirection: "column",
            marginTop: "5%"
        },
        buttonContainerInformation: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

        },
        menuButton: {
            marginTop: 5,
            padding: 15,
            margin: 5,
            borderRadius: 10,
        },
        buttonPrimary: {
            backgroundColor: themeMode === "light" ? lightModeColors.primaryButtonColor : darkModeColors.primaryButtonColor,
        },
        buttonSecondary: {
            backgroundColor: themeMode === "light" ? lightModeColors.secondaryButtonColor : darkModeColors.secondaryButtonColor,
        },
        secondaryButtonText: {
            color: themeMode === "light" ? lightModeColors.secondaryButtonText : darkModeColors.secondaryButtonText,
            textAlign: "center"
        },
        buttonDanger: {
            backgroundColor: "red"
        },
        buttonText: {
            color: "white",
            textAlign: "center"
        },
        image: {
            marginTop: "10%",
            height: "60%",
            width: "75%",
            borderRadius: 15
        },
        addImage: {
            height: "100%",
            borderRadius: 15,
            objectFit: "contain"
        },
        addImageContainer: {
            height: "15%",
        },
        sheetImage: {
            marginTop: "10%",
            height: "50%",
            width: "80%",
            objectFit: "contain"
        },
        homeImage: {
            height: 150,
            width: 150,
            borderRadius: 15
        },
        location: {
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginRight: 15
        },
        locationTitle: {
            fontSize: 15,
            maxWidth: 150,
            fontWeight: "bold"
        },
        locationSubtitle: {
            fontSize: 10,
            maxWidth: 150
        },
        fullBanner: {
            flex: 1,
            width: "100%",
            padding: 15,
            marginBottom: 15,
            backgroundColor: themeMode === "light" ? lightModeColors.secondaryColor : darkModeColors.secondaryColor,
            borderRadius: 15,
        },
        banner: {
            flex: 1,
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between"
        },
        innerBanner: {
            flex: 1,
            flexDirection: "row",
            gap: 5,
        },
        bannerText: {
            maxWidth: 190,
            textAlign: "left"
        },
        bannerImage: {
            height: 75,
            width: 75,
            borderRadius: 100,
            margin: 0
        },
        bannerButton: {
            height: "100%",
            maxWidth: 50,
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        input: {
            backgroundColor: themeMode === "light" ? lightModeColors.tertiaryColor : darkModeColors.tertiaryColor,
            borderRadius: 5,
            minHeight: 30,
            padding: 10,
            color: themeMode === "light" ? lightModeColors.textColor : darkModeColors.textColor,
        },
        formElement: {
            padding: 5,
            marginTop: 5
        },
        inputText: {
            marginBottom: 3
        },
        rating: {
            flexDirection: "row"
        },
        modalContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
        },
        modalView: {
            backgroundColor: themeMode === "light" ? lightModeColors.backgroundColor : darkModeColors.tertiaryColor,
            borderRadius: 15,
            padding: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalText: {
            fontSize: 20,
            marginBottom: 20,
            fontWeight: "bold",
            textAlign: "center",
        },
        modalButton: {
            color: themeMode === "light" ? lightModeColors.primaryButtonColor : darkModeColors.primaryButtonColor,
            margin: 10,
            fontSize: 19,
        },
        modalCancel: {
            color: "red",
            margin: 10,
            fontSize: 19,
        },
        colorSelector: {
            flexDirection: "row",
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "center"
        },
        errorMessage: {
            margin: 5,
            color: themeMode === "light" ? "#d50000" : "#ff0000",
            fontWeight: "bold"
        },
        settingContainer: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: themeMode === "light" ? lightModeColors.secondaryColor : darkModeColors.secondaryColor,
            padding: 10,
            borderRadius: 5,
            marginTop: 10
        },
        homeTitle: {
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 15,
            textAlign: "center"
        },
        marginTop: {
            marginTop: 5
        }
    });

export default generateStyles;
