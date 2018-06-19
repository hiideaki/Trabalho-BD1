import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../Styles.js';

export default RecuperarSenha = () => (
	<View style = {styles.container}>
		<View style={styles.containerBack}>
			<Entypo name="lock" style={styles.iconBack}/>
		</View>
		<View style={styles.innerContainer}>
			<View style={styles.input}>
				<Entypo name="flash" style={styles.inputIcon} />
				<TextInput 
					style={styles.inputText}
					placeholder='Usuário'
					underlineColorAndroid = 'transparent'
				/>
			</View>
			<View style={styles.input}>
				<Entypo name="mail" style={styles.inputIcon} />
				<TextInput 
					style={styles.inputText}
					placeholder='E-mail'
					underlineColorAndroid = 'transparent'
				/>
			</View>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Enviar</Text>
			</TouchableOpacity>
		</View>
	</View>
);