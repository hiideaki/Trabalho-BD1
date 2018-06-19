import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../../screens/Styles';
import { GET } from '../../screens/Funcoes';

export default class ItemMembro extends React.Component {
	constructor(props) {
		super(props)
		this.state = {nome: ''}
	}

	async componentWillMount() {
		pessoa = await GET(['buscar_nome_pessoa', this.props.data.pessoa])
		this.setState({nome: pessoa[0].nomeCompleto})
	}

	render() {
		return(
			<View style={styles.containerMembros}>
				<View style={[styles.centerContainer, {justifyContent: 'space-around'}]}>
					{/*<Image
						source = {require('../../images/vicente.jpg')}
						style = {styles.avatarMembroGrupo}
					/>*/}
					<View style={[styles.centerContainer, {justifyContent: 'space-around'}]}>
						<Text style={styles.nomeMembro}>{this.state.nome}</Text>
						<TouchableOpacity
							onPress={() => Linking.openURL(`mailto://${this.props.data.email}`)}
						>
							<Entypo
								name="mail"
								style={styles.mailtoButton}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}