import React, { useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import ThemeContext from "../utilities/ThemeContext";
import generateStyles from "../Styles";

import FilledLike from '../assets/icons/star_filled.png';
import Like from '../assets/icons/star.png';

const StarRating = ({ rating, onChange, changeAble }) => {
    const { themeMode } = useContext(ThemeContext);
    const styles = generateStyles(themeMode);


    const ChangeAbleRating = () => (
        <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => onChange(star)}>
                    <Image
                        source={star <= rating ? FilledLike : Like}
                        style={{ width: 24, height: 24, margin: 2 }}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );

    const DisplayRating = () => (
        <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Image
                    key={star}
                    source={star <= rating ? FilledLike : Like}
                    style={{ width: 24, height: 24, margin: 2 }}
                />
            ))}
        </View>
    );

    return (
        <View>
            {changeAble ? <ChangeAbleRating /> : <DisplayRating />}
        </View>
    );
};

export default StarRating;
