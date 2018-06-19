import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../../screens/Styles';
import { GET, nomeOrganizacao } from '../../screens/Funcoes';


export default class ItemGrupo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {grupo: this.props.data.nomeGrupo, 
					  org: this.props.data.organizacao.toString()}
	}

	async componentWillMount() {
		org = await GET(['procura_organizacao', this.state.org])
		this.setState({org: org[0].nomeOrganizacao})
	}

	render() {
		return(
			<TouchableOpacity
				onPress={() => 
					this.props.novaReuniao 
					? this.props.navigation.navigate('NovaReuniao', {data: this.props.data})
					: this.props.navigation.navigate('InfoGrupo', {data: {id: this.props.data.id, grupo: this.state.grupo, org: this.state.org}, coordena: this.props.coordena})}
			>
				<View style={styles.itemContainer}>
					<View style={styles.itemTextos}>
						<Text style={styles.itemGrupo}>{this.state.grupo}</Text>
						<Text style={styles.itemOrg}>{this.state.org}</Text>
					</View>
				</View>

			</TouchableOpacity>
		)}
}