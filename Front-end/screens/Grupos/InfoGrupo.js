import React from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../Styles';
import { POST } from '../Funcoes';
import { StackActions, NavigationActions } from 'react-navigation';

export default class InfoGrupo extends React.Component {
	constructor(props) {
		super(props);
		data = props.navigation.getParam('data', null)
		coordena = props.navigation.getParam('coordena', false)
		this.state = 
					{
						editavel: false, 
						id: data.id,
						grupo: data.grupo,
						org: data.org,
						coordena: coordena
					}
	}

	confirmar() {
		Alert.alert(
		  'Deseja apagar o grupo?',
		  'Esta ação não poderá ser desfeita.',
		  [
		  	{text: 'Apagar', onPress: () => this.apagar()},
		    {text: 'Cancelar'},
		  ],
		  { cancelable: false }
		)
	}

	async apagar() {
		resposta = await POST(['deleta_grupo', this.state.id])
		resposta = true
		if(!resposta) {
			Alert.alert('', 'Erro ao apagar grupo', [{text: 'OK'}], { cancelable: false})
        	return false
		}
		else {
			this.props.navigation.pop(2)
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.containerBack}>
					<Image
						style={[styles.imageBack, styles.gruposImage]}
						source={require('../../images/grupos.png')}
					/>
				</View>
				<View style={styles.innerContainer}>
						<View>
							<Text style={styles.inputTitle}>Nome:</Text>
							<View style={styles.input}>
								<Entypo name="users" style={styles.inputIcon} />
								<TextInput 
									style={styles.inputText}
									underlineColorAndroid = 'transparent'
									editable = {this.state.editavel}
									onChangeText = {(grupo) => this.setState({grupo})}
								>{this.state.grupo}</TextInput>
							</View>
						</View>
						<View>
							<Text style={styles.inputTitle}>Organização:</Text>
							<View style={styles.input}>
								<Entypo name="home" style={styles.inputIcon} />
								<TextInput 
									style={styles.inputText}
									underlineColorAndroid = 'transparent'
									editable = {this.state.editavel}
								>{data.org}</TextInput>
							</View>
						</View>

					<View style={styles.rowContainer}>
						<TouchableOpacity 
							style={styles.button}
							onPress={() => this.props.navigation.navigate('Membros', {id: this.state.id})}
						>
							<Text style={styles.buttonText}>Membros</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={styles.button}
							onPress={() => this.props.navigation.navigate('Reunioes', {grupo: this.state.grupo})}
						>
							<Text style={styles.buttonText}>Reuniões</Text>
						</TouchableOpacity>
					</View>

					{this.state.coordena
						? 
							<View style={styles.rowContainer}>
								<TouchableOpacity 
									style={styles.button}
									onPress={() => this.confirmar()}>
									<Text style={styles.buttonText}>Apagar</Text>
								</TouchableOpacity>
							</View>
						: null}
				</View>
			</View>
		)
	}
}