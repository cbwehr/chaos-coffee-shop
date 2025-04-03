import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useCartContext } from '../context/CartProvider';
import { MenuItemProps } from '../constants/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Props } from '../../App';

type ItemProps = {
    data: MenuItemProps,
};

const CartItem: React.FC<ItemProps> = ({data}) => {
    return (
        <View style={styles.listItem}>
            <Text>{data.name}</Text>
            <Text>{data.price}</Text>
        </View>
    );
};

const CartScreen: React.FC<Props<'CartScreen'>> = ({navigation}) => {
    const {cartItems, getCartTotal} = useCartContext();
    const insets = useSafeAreaInsets();

    return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{
        backgroundColor: 'white',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 16,
        paddingRight: insets.right + 16,
      }}>
        <Text style={styles.title}>Cart</Text>
            {cartItems.length
                ? (
                    <View style={styles.centeredView}>
                        <FlatList
                            data={cartItems}
                            renderItem={({item}) => <CartItem data={item} />}
                            contentContainerStyle={styles.list}
                        />
                        <View style={styles.total}>
                            <Text>Total:</Text>
                            <Text>{getCartTotal()}</Text>
                        </View>
                        <Button title="Checkout" onPress={() => navigation.navigate('CheckoutScreen')} />
                    </View>
                )
                : <Text>Cart is empty.</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 500,
    },
    list: {
        flexDirection: 'column',
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        borderTopWidth: 1,
    },
    centeredView: {
        justifyContent: 'flex-start',
    },
});

export default CartScreen;
