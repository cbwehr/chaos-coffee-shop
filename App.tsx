/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CartProvider, { useCartContext } from './src/context/CartProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';


export type RootStackParamList = {
    HomeScreen: undefined,
    CartScreen: undefined,
    CheckoutScreen: undefined,
    ConfirmationScreen: undefined,
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
    NativeStackNavigationProp<RootStackParamList, T>;

export type Props<T extends keyof RootStackParamList> = {
    navigation: ScreenNavigationProp<T>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
    const {cartItems} = useCartContext();
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            screenOptions={{
                title: 'Chaos Coffee Shop',
                headerRight: () => (
                    <View>
                        <Pressable onPress={() => navigation.navigate('CartScreen')}>
                            <FontAwesomeIcon testID="cartButton" icon={faCartShopping} size={24} />
                        </Pressable>
                        {cartItems.length ?
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartItems.length}</Text>
                            </View>
                            : null }
                    </View>
                ),
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
            <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
        </Stack.Navigator>
    );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
            <CartProvider>
                <RootStack />
            </CartProvider>
        </NavigationContainer>
    </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: 'red',
        padding: 3,
        borderRadius: 8,
        alignItems: 'center',
        position: 'absolute',
        right: -10,
        top: -6,
        height: 16,
        width: 16,
    },
    badgeText: {
        color: 'white',
        fontSize: 9,
        fontWeight: 500,
        top: -1,
    },
});
export default App;
