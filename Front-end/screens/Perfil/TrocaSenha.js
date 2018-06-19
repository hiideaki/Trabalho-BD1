import React from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../Styles';
import { POST } from '../Funcoes';

export default class TrocaSenha extends React.Component {
	constructor(props) {
		super(props)
		this.state = {nova: '', repita: '', id: props.navigation.getParam('id', null)}
	}

	async alterar() {
		console.log(this.state.nova, this.state.repita)
		if(this.state.nova == '' || this.state.repita == '') {
			Alert.alert('Erro', 'Por favor, preencha todos os campos', [{text: 'OK'}], { cancelable: false})
    		return
		}
		if(this.state.nova != this.state.repita) {
			Alert.alert('Erro', 'Senhas não correspondem', [{text: 'OK'}], { cancelable: false})
    		return
		}
		respostaServidor = await POST(['atualiza_usuario_senha', this.state.id, this.state.nova])
		if(!respostaServidor.ok) {
		      Alert.alert('', 'Erro ao atualizar', [{text: 'OK'}], { cancelable: false})
		      return false
		    }
		  else {
		    Alert.alert('', 'Senha atualizada com sucesso', [{text: 'OK'}], { cancelable: false})
		    this.props.navigation.pop()
		  }
	}
 	render() {
		return(
			<View style = {styles.container}>
				<View style={styles.innerContainer}>
					<View style={styles.input}>
						<TextInput 
							style={styles.inputText}
							underlineColorAndroid = 'transparent'
							placeholder = 'Nova Senha'
							onChangeText = {(nova) => this.setState({nova})}
							secureTextEntry = {true}
						/>
					</View>
					<View style={styles.input}>
						<TextInput 
							style={styles.inputText}
							underlineColorAndroid = 'transparent'
							placeholder = 'Repita a Nova Senha'
							onChangeText = {(repita) => this.setState({repita})}
							secureTextEntry = {true}
						/>
					</View>
					<TouchableOpacity 
						style={styles.button}
						onPress={() => this.alterar()}>
						<Text style={styles.buttonText}>Salvar</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}