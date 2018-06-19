import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../../screens/Styles';

export default ItemInput = ({title, icon}) => (
	<View style={styles.input}>
		<Entypo name={icon} style={styles.inputIcon} />
		<TextInput 
			placeholder = {title}
			underlineColorAndroid = "transparent"
			style={styles.inputText} 
		/>
	</View>)