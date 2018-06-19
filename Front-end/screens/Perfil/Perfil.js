import React from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../Styles';
import { StackActions, NavigationActions } from 'react-navigation';
import { GET, atualizarEmail } from '../Funcoes';

export default class Perfil extends React.Component {
	constructor(props) {
		super(props);
		this.state = {editando: false, carregando: true, dados: '', nome: ''}
	}

	async componentWillMount() {
		dados = await GET(['buscar_nome_usuario', global.user])
		nome = await GET(['buscar_pessoa_id', global.userid])
		this.setState({dados: dados[0], nome: nome[0].nomeCompleto, email: dados[0].email, carregando: false})
	}

	render() {
		return(
			<View style = {styles.container}>
				<View style={styles.containerBack}>
					<Entypo name="v-card" style={styles.iconBack}/>
				</View>
				<View style={styles.innerContainer}>
					{/*<Image
					source = {require('../../images/vicente.jpg')}
					style = {styles.perfilAvatar}
					/>*/}
					<View style={styles.input}>
						<Entypo name="flash" style={styles.inputIcon} />
						<TextInput 
							style={styles.inputText}
							underlineColorAndroid = 'transparent'
							editable = {false}
						>{this.state.dados.nomeUsuario}</TextInput>
					</View>
					<View style={styles.input}>
						<Entypo name="user" style={styles.inputIcon} />
						<TextInput 
							style={styles.inputText}
							underlineColorAndroid = 'transparent'
							editable = {false}
						>{this.state.nome}</TextInput>
					</View>
					<View style={styles.input}>
						<Entypo name="mail" style={styles.inputIcon} />
						<TextInput 
							style={styles.inputText}
							underlineColorAndroid = 'transparent'
							editable = {this.state.editando}
							onChangeText = {(email) => this.setState({email})}
						>{this.state.email}</TextInput>
					</View>
					<View style={styles.rowContainer}>
						{!this.state.editando
							?
								<TouchableOpacity 
									style={styles.button}
									onPress={() => this.setState({editando: true})}
								>
									<Text style={styles.buttonText}>Editar E-mail</Text>
								</TouchableOpacity>
							:
								<TouchableOpacity 
									style={styles.button}
									onPress={() => {this.setState({editando: false}); atualizarEmail(this.state.dados.id, this.state.email)}}
								>
									<Text style={styles.buttonText}>Salvar</Text>
								</TouchableOpacity>
						}
						<TouchableOpacity 
							style={styles.button}
							onPress={() => this.props.navigation.navigate('TrocaSenha', {id: this.state.dados.id})}
						>
							<Text style={styles.buttonText}>Trocar Senha</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity 
							style={styles.button}
							onPress={() => {
				              global.auth = false
				              global.user = ''
				              global.userid = ''
				              this.props.navigation.dispatch(StackActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Login' })]}))
				            }}
						>
							<Text style={styles.buttonText}>Sair</Text>
						</TouchableOpacity>
				</View>
			</View>
		);
	}
}