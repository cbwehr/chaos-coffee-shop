import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Props } from '../../App';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ConfirmationScreen: React.FC<Props<'ConfirmationScreen'>> = ({navigation}) => {
    const insets = useSafeAreaInsets();

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left + 16,
            paddingRight: insets.right + 16,
            }}>
                <FontAwesomeIcon icon={faCheckCircle} size={42} />
                <Text style={styles.text}>Hooray! We'll be whipping up your order shortly.</Text>
                <Button onPress={() => navigation.navigate('HomeScreen')} title="View Menu" />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        marginVertical: 20,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ConfirmationScreen;
