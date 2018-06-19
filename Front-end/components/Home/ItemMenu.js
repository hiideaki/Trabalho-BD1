import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../../screens/Styles.js';

export default ItemMenu = ({title, description, image, inverted, press}) => {
	imagem = () => {
		switch(image) {
			case "pessoas": {
				return require('../../images/pessoas.png');
				break;
			}
			case "grupos": {
				return require('../../images/grupos.png');
				break; 
			}
			case "instrutor": {
				return require('../../images/instrutor.png');
				break;
			}
			default: {
				return require('../../images/relatorio.png');
				break;
			}
		}
	};

	return(
		!inverted
			?
				<View style={styles.rowContainer}>
						<View style={styles.backHomeImage}>
							<Image
								style={{flex: 1, width: undefined, height: undefined}}
					        	source={imagem()}
					        	resizeMode='contain'
					        />
						</View>
						<TouchableOpacity 
							style={styles.homeTextContainer}
							onPress={press}>
							<View>
								<Text style={styles.homeTitle}>{title}</Text>
								<Text style={styles.homeDescription}>{description}</Text>
							</View>
						</TouchableOpacity>
				</View>
			: 
				<View style={styles.rowContainer}>
						<TouchableOpacity 
							style={styles.homeTextContainer}
							onPress={press}>
							<View>
								<Text style={styles.homeTitle}>{title}</Text>
								<Text style={styles.homeDescription}>{description}</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.backHomeImage}>
							<Image
								style={{flex: 1, width: undefined, height: undefined}}
					        	source={imagem()}
					        	resizeMode='contain'
					        />
						</View>
				</View>
)}

var dimensoes = Dimensions.get('window');
const alturaImagem = (dimensoes.height - 70) / 3.0;
const larguraImagem = dimensoes.width / 2.0;

const old_styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	texts: {
		paddingLeft: 10,
		flex: 1,
	},
	image: {
		backgroundColor: '#14B0BF',
		width: larguraImagem,
		height: alturaImagem,
		padding: 20
	},
	title: {
		fontSize: 18,
		paddingBottom: 20,
		fontWeight: 'bold'
	},
	description: {
		textAlign: 'justify',
	}
})

