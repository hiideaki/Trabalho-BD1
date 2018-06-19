import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../screens/Styles';
import { GET } from '../../screens/Funcoes';
import moment from 'moment'

export default class ItemListaReunioes extends React.Component {
 	constructor(props) {
 		super(props)
		this.state = {dados: this.props.dados, presente: false}
	}

	async componentWillMount() {
		presente = await GET(['usuario_participa_reuniao', global.idid, this.state.dados.id])
		this.setState({presente: presente.length > 0})
	}

	render() {
		return(
			<View style={styles.listaReunioesContainerItem}>
				<Text style={styles.listaDataHora}>{moment(this.state.dados.data).format('DD/MM/YYYY')}</Text>
				<Text style={styles.listaDataHora}>{moment(this.state.dados.horaInicio, 'HH:mm:ss').format('HH:mm')}</Text>
				<View>
					<Ionicons name={this.state.presente ? 'md-checkmark-circle' : 'md-close-circle'} 
						style={[styles.centerContainer, styles.listaReunioesIcone]}/>
				</View>
			</View>
		)
	}
}