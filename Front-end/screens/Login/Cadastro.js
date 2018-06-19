import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../Styles';
import { cadastrar } from '../Funcoes';

export default class Cadastro extends React.Component {
	constructor(props) {
		super(props)
		this.state = {user: '', nome: '', email: '', senha1: '', senha2: ''}
	}

	render() {
		return(
			<View style = {styles.container}>
				<View style={styles.containerBack}>
					<Entypo name="v-card" style={styles.iconBack}/>
				</View>
				<View style={styles.innerContainer}>
					<View style={styles.input}>
						<Entypo name="flash" style={styles.inputIcon} />
						<TextInput 
							style={styles.inputText}
							placeholder='Usuário'
							underlineColorAndroid = 'transparent'
							onChangeText = {(user) => this.setState({user})}
						/>
					</View>
					<View style={styles.input}>
						<Entypo name="user" style={styles.inputIcon} />
						<TextInput 
							style={styles.inputText}
							placeholder='Nome Completo'
							underlineColorAndroid = 'transparent'
							onChangeText = {(nome) => this.setState({nome})}
						/>
					</View>
					<View style={styles.input}>
						<Entypo name="mail" style={styles.inputIcon} />
						<TextInput 
							style={styles.inputText}
							placeholder='E-mail'
							underlineColorAndroid = 'transparent'
							onChangeText = {(email) => this.setState({email})}
						/>
					</View>
					<View style={styles.input}>
						<Entypo name="key" style={styles.inputIcon} />
						<TextInput 
							style={styles.inputText}
							placeholder='Senha'
							underlineColorAndroid = 'transparent'
							secureTextEntry = {true}
							onChangeText = {(senha1) => this.setState({senha1})}
						/>
					</View>
					<View style={styles.input}>
						<Entypo name="lock" style={styles.inputIcon} />
						<TextInput 
							style={styles.inputText}
							placeholder='Repita a Senha'
							underlineColorAndroid = 'transparent'
							secureTextEntry = {true}
							onChangeText = {(senha2) => this.setState({senha2})}
						/>
					</View>
					<TouchableOpacity 
						style={styles.button}
						onPress={async() => 
							await cadastrar(
								this.state.user,
								this.state.nome,
								this.state.email,
								this.state.senha1,
								this.state.senha2,
								this.props.navigation
							)}
					>
						<Text style={styles.buttonText}>Cadastrar</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}