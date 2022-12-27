import {useState} from 'react';
import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
export default function App() {
	const [pickerUrl, setPickerUrl] = useState();
	const verifyPermissions = async () => {
		const {status} = await ImagePicker.requestCameraPermissionsAsync();

		if (status !== 'granted') {
			Alert.alert('Permisos necesarios', 'Necesita aceptar los permisos', [{text: 'Ok'}]);
			return false;
		}
		return true;
	};
	const handleTakeImage = async () => {
		const permissions = await verifyPermissions();
		if (!permissions) return;

		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.9,
			base64: true
		});
		setPickerUrl(image.assets[0].uri);
	};
	return (
		<View style={styles.container}>
			{pickerUrl === undefined ? (
				<View>
					<Text style={styles.text}>Todavia no has tomado una imagen</Text>
					<Button title="Tomar Imagen" onPress={() => handleTakeImage()} />
				</View>
			) : (
				<View>
					<Text style={styles.text}>Esta es tu imagen</Text>
					<Image source={{uri: pickerUrl}} style={styles.image} />
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#242424',
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		width: 350,
		height: 200,
		borderRadius: 5
	},
	text: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold'
	}
});
