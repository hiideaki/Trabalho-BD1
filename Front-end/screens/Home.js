import React from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import styles from './Styles.js';
import ItemMenu from '../components/Home/ItemMenu';

export default class Home extends React.Component {
	render() {
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.backgroundHome}>	
	        	<ItemMenu 
		        	title="Participar de uma reunião"
		        	description="Registre presença na reunião que está participando."
		        	image="pessoas"
		        	press={() => navigate('Buscar')}
	        	/>
		        <ItemMenu 
		        	title="Coordenar uma reunião"
		        	description="Solicite confirmação de presença a um grupo que você coordena."
		        	image="instrutor"
		        	inverted={true}
		        	press={() => navigate('Gerencia')}
		        />
		        <ItemMenu 
		        	title="Meus Grupos"
		        	description="Veja os grupos dos quais você participa ou coordena."
		        	image="grupos"
		        	press={() => navigate('Lista')}
		        />
			</View>
		)}};