import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../Styles';
import Carregando from '../../components/Carregando';
import { GET, POST } from '../Funcoes';

import ItemListaReunioes from '../../components/Participar/ItemListaReunioes';

export default class Presente extends React.Component {
	constructor(props) {
		super(props)
		qr = props.navigation.getParam('qrCode', null)
		this.state = {qr: qr, reuniao: '', grupo: '', org: '', carregando: true}
	}

	async componentWillMount() {
		reuniao = await GET(['procura_qr', this.state.qr])
		grupo = await GET(['procura_grupo', reuniao[0].grupo])
		org = await GET(['procura_organizacao', grupo[0].organizacao])
		this.setState({reuniao: reuniao[0], grupo: grupo[0].nomeGrupo, org: org[0].nomeOrganizacao, carregando: false})
		respostaServidor = await POST(['insere_comparece', global.idid, reuniao[0].id])
		if(!respostaServidor.ok) {
			Alert.alert('', 'Erro ao registrar participação.', [{text: 'OK'}], { cancelable: false})
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.containerBack}>
					<Image
						style={[styles.imageBack, styles.pessoasImage]}
						source={require('../../images/pessoas.png')}
					/>
				</View>
				{
					this.state.carregando
						?
							<Carregando />
						:
							<View style={styles.flexStartContainer}>
								<Entypo name="check" style={styles.presenteIcone}/>
								<Text style={styles.presenteTexto}>Presença Registrada!</Text>
								<View style={[styles.centerContainer, {paddingVertical: 20}]}>
									<Text style={styles.itemGrupo}>{this.state.grupo}</Text>
									<Text style={styles.itemOrg}>{this.state.org}</Text>
								</View>
								{
								<ItemListaReunioes dados={this.state.reuniao} nome={true} navigation={this.props.navigation}/>
								}
							</View>
				}
				
				
			</View>
		)
	}
}