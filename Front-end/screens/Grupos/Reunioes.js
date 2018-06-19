import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styles from '../Styles';
import { GET } from '../Funcoes';
import Carregando from '../../components/Carregando';
import ItemListaReunioes from '../../components/Participar/ItemListaReunioes';

export default class Reunioes extends React.Component {
	constructor(props) {
		super(props)
		grupo = props.navigation.getParam('grupo', null)
		this.state = {grupo: grupo, reunioes: '', carregando: true}
	}

	async componentWillMount() {
		grupo = await GET(['buscar_grupo', this.state.grupo])
		reunioes = await GET(['buscar_reuniao_grupo', grupo[0].id])
		this.setState({ reunioes: reunioes, carregando: false})
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
				{this.state.carregando
					?
						<Carregando />
					:
						<View>
							<FlatList
								data={this.state.reunioes}
								keyExtractor={(item, index) => `ItemListaReunioes-${index}`}
								renderItem={
									({ item, index }) => 
										(<ItemListaReunioes dados={item} navigation={this.props.navigation}/>
								)}
							/>
						</View>
				}
			</View>
		)
	}
}