import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default Desenvolvedor = () => (
	<View style = {styles.container}>
		<View style={styles.backgroundContainer}>
			<Entypo name="code" style={styles.backgroundIcon}/>
		</View>
		<View style={styles.innerContainer}>
			<Image
			source = {require('../images/vicente.jpg')}
			style = {styles.avatar}
			/>
			<Text style={styles.info}>Vicente Lobo</Text>
			<View style={styles.containerIcon}>
				<TouchableOpacity>
					<Entypo name="facebook" style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Entypo name="mail" style={styles.icon} />
				</TouchableOpacity>
			</View>
		</View>
	</View>
);

var dimensoes = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#14B0BF',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	backgroundContainer: {
		flex: 1,
		alignItems: 'flex-end',
		zIndex: 0,
		position: 'absolute',
		paddingHorizontal: 10,
	},
	backgroundIcon: {
		fontSize: 160,
		color: 'rgba(200, 200, 200, 0.6)',
	},
	innerContainer: {
		flex: 1,
		alignItems: 'center',
	},
	avatar: {
	  	width: 180,
	  	height: 180,
	  	borderRadius: 100,
	  	resizeMode: 'cover',
	  	margin: 30,
	  	borderColor: 'rgba(255,255,255,0.4)',
	  	borderWidth: 2,
	},
	containerIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	icon: {
		fontSize: 26,
		color: 'black',
		padding: 10,
		backgroundColor: 'rgba(255,255,255,0.9)',
		borderRadius: 100,
		borderColor: 'rgba(255,255,255,0.9)',
		margin: 10,
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.9)',
		borderRadius: 50,
		paddingHorizontal: 30,
		paddingVertical: 10,
		marginTop: 5,
		marginBottom: 5,
		fontSize: 22,
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center'
	},
})