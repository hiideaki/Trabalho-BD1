import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../Styles';
import { GET } from '../Funcoes';
import ItemGrupo from '../../components/Grupos/ItemGrupo';

export default class Gerencia extends React.Component {
	constructor(props) {
		super(props)
		this.state = {coordena: ''}
	}

	async componentWillMount() {
		this.setState({coordena: await GET(['buscar_grupos_gerencia', global.user])})
	}
	
	render() {
		return(
			<View style={styles.container}>
				<View style={styles.containerBack}>
					<Image
						style={[styles.imageBack, styles.instrutorImage]}
						source={require('../../images/instrutor.png')}
					/>
				</View>
					<ScrollView contentContainerStyle={styles.innerContainer}>
						<Text style={styles.listaTitle}>Selecione o grupo</Text>
					<FlatList
						data={this.state.coordena}
						keyExtractor={(item, index) => `ItemTelaGerencia-${index}`}
						renderItem = {
							({item, index}) => 
								<ItemGrupo data={item} novaReuniao={true} navigation={this.props.navigation}/>
						
							}
						numColumns={2}
					/>
					</ScrollView>
			</View>
		);
	}
}