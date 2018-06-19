import React from 'react';
import { Text, View, Image, TouchableOpacity, Alert, Dimensions, Share } from 'react-native';
import QRCode from 'react-native-qrcode';
import styles from '../Styles';
import { GET, POST } from '../Funcoes';
import { StackActions, NavigationActions } from 'react-navigation';

export default class ReuniaoIniciada extends React.Component {
	constructor(props) {
		super(props);
		qr = this.props.navigation.getParam('qrCode', null)
		this.state = {qrCode: qr, reuniao: ''}
	}

	confirmar() {
		Alert.alert(
		  'Deseja cancelar a reunião?',
		  'Os dados registrados serão perdidos.',
		  [
		  	{text: 'Apagar', onPress: () => this.apagar()},
		    {text: 'Cancelar'},
		  ],
		  { cancelable: false }
		)
	}

	async apagar() {
		resposta = await POST(['deleta_reuniao', this.state.reuniao.id])
		resposta = true
		if(!resposta) {
			Alert.alert('', 'Erro ao apagar grupo', [{text: 'OK'}], { cancelable: false})
        	return false
		}
		else {
			this.props.navigation.dispatch(StackActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Gerencia' })]}))
		}
	}

	async componentDidMount() {
		reuniao = await GET(['procura_qr', this.state.qrCode])
		this.setState({reuniao: reuniao[0]})
	}

	render() {
		var dimensoes = Dimensions.get('window')
		return(
			<View style={styles.container}>
				<View style={styles.containerBack}>
					<Image
						style={[styles.imageBack, styles.instrutorImage]}
						source={require('../../images/instrutor.png')}
					/>
				</View>
				<View style={styles.innerContainer}>
					
					<QRCode
			          value={this.state.qrCode}
			          size={dimensoes.width * 0.7}
			        />	

					<View style={styles.rowContainer}>
						<TouchableOpacity 
							style={styles.button}
							onPress={() => this.props.navigation.navigate('PessoasPresentes', {id: this.state.reuniao.id})}
						>
							<Text style={styles.buttonText}>Pessoas presentes</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={styles.button}
							onPress={() => this.confirmar()}
						>
							<Text style={styles.buttonText}>Cancelar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}