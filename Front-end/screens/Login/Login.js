import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from '../Styles';
import { login } from '../Funcoes';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {user: '', senha: ''}
	}

	render() {
		navigation = this.props.navigation
		return(
			<View style={styles.background}>
				<Entypo
					name = 'medium-with-circle'
					style = {styles.logo}
				/>
				<View style={styles.input}>
					<Entypo name="flash" style={styles.inputIcon} />
					<TextInput 
						style={styles.inputText} 
						placeholder="Usuário"
						underlineColorAndroid = 'transparent'
						onChangeText={(user) => this.setState({user})}
					/>
				</View>
				<View style={styles.input}>
					<Entypo name='key' style={styles.inputIcon} />
					<TextInput 
						style={styles.inputText}
						placeholder = "Senha"
						underlineColorAndroid = 'transparent'
						secureTextEntry = {true}
						onChangeText = {(senha) => this.setState({senha})}
					/>
				</View>
				<TouchableOpacity 
					style={styles.button}
					onPress={async() => await login(this.state.id, this.state.user, this.state.senha) ? this.props.navigation.dispatch(StackActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Home' })]})) : null}
				>
					<Text style={styles.buttonText}>Entrar</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={styles.button}
					onPress={() => {navigation.navigate('Cadastro')}}
				>
					<Text style={styles.buttonText}>Cadastrar</Text>
				</TouchableOpacity>
			</View>
	)}
}