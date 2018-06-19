import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { BarCodeScanner, Permissions } from 'expo';
import styles from '../Styles';

export default class Buscar extends React.Component {
	state = {
		hasCameraPermission: null,
	}

	async componentWillMount() {
	    const { status } = await Permissions.askAsync(Permissions.CAMERA);
	    this.setState({hasCameraPermission: status === 'granted'});
    }

    _handleBarCodeRead = ({ type, data }) => {
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
		this.props.navigation.navigate('Presente', {qrCode: data})
	}

	render() {
		const { hasCameraPermission } = this.state;
		return(
			<View style={styles.container}>
				<View style={styles.containerBack}>
					<Image
						style={[styles.imageBack, styles.pessoasImage]}
						source={require('../../images/pessoas.png')}
					/>
				</View>
				<View style={styles.innerContainer}>
					{hasCameraPermission === null
						? <Text style={styles.buscarMensagens}>Solicitando permissão de acesso à câmera...</Text>
						: hasCameraPermission === false
							? 	<Text style={styles.buscarMensagens}>Permissão de acesso à câmera negada.</Text>
							: 	<View style={styles.centerContainer}>
									<Text style={styles.buscarMensagens}>Posicione o QR Code:</Text>
									<BarCodeScanner 
										onBarCodeRead={this._handleBarCodeRead}
										style={styles.camera} 
									/>
								</View>
					}
				</View>
				
				
			</View>
		)
	}
}