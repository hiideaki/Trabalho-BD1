import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import ItemGrupo from '../../components/Grupos/ItemGrupo';
import Carregando from '../../components/Carregando';
import styles from '../Styles';
import { GET } from '../Funcoes';

export default class Lista extends React.Component {
	constructor(props) {
		super(props)
		this.state = {coordena: '', participa: '', carregando: true}
	}

	async atualizarGrupos() {
		this.setState(
			{coordena: await GET(['buscar_grupos_gerencia', global.user]),
			 participa: await GET(['buscar_grupos_participa', global.user]),
			 carregando: false})
	}

	componentWillMount() {
		this.atualizarGrupos()
		global.atualizar = this.atualizarGrupos()
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
							<ScrollView contentContainerStyle={styles.innerContainer}>
								<Text style={styles.listaTitle}>Gerencia</Text>
								<Text style={styles.listaLinha}>———</Text>
								<FlatList
									data={this.state.coordena}
									keyExtractor={(item, index) => `ItemListaGeralGerencia-${index}`}
									renderItem={
										({ item, index }) => 
											(<ItemGrupo data={item} navigation={this.props.navigation} coordena={true} i={index}/>
									)}
									numColumns={2}
									columnWrapperStyle={styles.itensContainer}
								/>
								<Text style={styles.listaTitle}>Participa</Text>
								<Text style={styles.listaLinha}>———</Text>
								<FlatList
									data={this.state.participa}
									keyExtractor={(item, index) => `ItemListaGeralNaoGerencia-${index}`}
									renderItem={
										({ item, index }) => 
											(<ItemGrupo data={item} navigation={this.props.navigation} i={index}/>
									)}
									numColumns={2}
									columnWrapperStyle={styles.itensContainer}
								/>
							</ScrollView>
					}
			</View>
		)
	}
}