import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { useCartContext } from '../context/CartProvider';
import axios from 'axios';
import { apiUrl } from '../constants/values';
import { Props } from '../../App';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

const CheckoutScreen: React.FC<Props<'CheckoutScreen'>> = ({navigation}) => {
    const [name, setName] = useState('');
    const [loyaltyNumber, setLoyaltyNumber] = useState('');
    const {getCartIds, clearCart} = useCartContext();
    const insets = useSafeAreaInsets();

    function submitOrder() {
        if (!name || !loyaltyNumber) {
            Alert.alert('Please complete all fields.');
            return;
        }

        const data = {
            items: getCartIds(),
            loyaltyNumber: loyaltyNumber,
            name: name,
        };
        axios.post(`${apiUrl}/order`, data)
            .then(() => {
                clearCart();
                navigation.navigate('ConfirmationScreen');
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Oops, something went wrong.',
                    'Please try submitting your order again,'
                    + ' or contact us if the problem persists.');
            });
    }

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{
            backgroundColor: 'white',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left + 16,
            paddingRight: insets.right + 16,
        }}>
            <TextInput
                editable
                maxLength={40}
                onChangeText={text => setName(text)}
                defaultValue={name}
                placeholder="Name"
                style={styles.textInput}
                />
            <TextInput
                editable
                maxLength={40}
                onChangeText={text => setLoyaltyNumber(text)}
                defaultValue={loyaltyNumber}
                placeholder="Loyalty Number"
                dataDetectorTypes={'phoneNumber'}
                keyboardType="numeric"
                style={styles.textInput}
                />
            <Button onPress={submitOrder} title="Submit Order" />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
    },
});

export default CheckoutScreen;
