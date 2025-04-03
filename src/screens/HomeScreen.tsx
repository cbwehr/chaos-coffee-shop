import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { MenuItemProps } from '../constants/types';
import { apiUrl } from '../constants/values';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartContext } from '../context/CartProvider';

type Props = {
    data: MenuItemProps,
    selectItem: (id: string) => void;
}

const MenuItem: React.FC<Props> = ({data, selectItem}) => {
    return (
        <Pressable onPress={() => {
            console.log(`pressed ${data.id}`);
            selectItem(data.id);
        }} style={styles.itemContainer}>
            <FontAwesomeIcon icon={faMugHot} mask={faCircle} maskId="mug-square" transform="shrink-8 right-0.5 up-0.5" size={48} style={styles.icon} />
            <Text style={styles.item}>{data.name}</Text>
            <Text style={styles.price}>{data.price}</Text>
        </Pressable>
    );
};

const HomeScreen: React.FC = () => {
    const [isLoading, setLoading] = useState(true);
    const [menuData, setMenuData] = useState<MenuItemProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState<MenuItemProps>();
    const {addItem} = useCartContext();

    function selectItem(id: string) {
        getMenuItem(id).then(() => {
            setModalVisible(true);
        });
    }

    function updateCart(item: MenuItemProps) {
        addItem(item);
        setModalVisible(false);
    }

    async function getMenuItems() {
        axios.get<MenuItemProps[]>(`${apiUrl}/menu`)
            .then(({data}) => setMenuData(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    async function getMenuItem(id: string) {
        axios.get<MenuItemProps>(`${apiUrl}/menu/${id}`)
            .then(({data}) => setModalItem(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getMenuItems();
    }, []);

    const insets = useSafeAreaInsets();

    return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <FontAwesomeIcon icon={faMugHot} mask={faCircle} maskId="mug-square" transform="shrink-8 right-0.5 up-0.5" size={56} style={styles.icon} />
                    <Text style={styles.modalText}>{modalItem?.name}</Text>
                    <Text style={styles.price}>{modalItem?.price}</Text>
                    {modalItem?.description ? <Text>{modalItem?.description}</Text> : null}
                    <Pressable
                        disabled={!modalItem}
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            if (modalItem) {
                                updateCart(modalItem);
                            }
                        }}>
                        <Text style={styles.textStyle}>Add to Cart</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
       <FlatList data={menuData}
            renderItem={({item}) => <MenuItem data={item} selectItem={selectItem} />}
            numColumns={2} contentContainerStyle={styles.listMenu}
        />
    </View>);
};

const styles = StyleSheet.create({
      listMenu: {
        flex: 1,
        flexDirection: 'column',
      },
      itemContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 120,
        width: 120,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 8,
        padding: 16,
        margin: 16,
    },
    item: {
        fontSize: 12,
    },
    price: {
        fontWeight: '600',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    icon: {
        paddingBottom: 8,
    },
});

export default HomeScreen;
