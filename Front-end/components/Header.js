import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../screens/Styles';

export default Header = ({name, icon, navigation, extra, extraScreen}) => (

	<View style={styles.headerContainer}>
		<TouchableOpacity 
			style={styles.headerButton}
			onPress={() => {icon == 'menu' 
							? navigation.navigate('Perfil') 
							: navigation.pop()}}
		>
			<Entypo name={icon == 'menu' ? 'menu' : 'chevron-small-left'} style={[styles.headerLeftIcon, styles.headerTextColor]}/>
		</TouchableOpacity>
		<Text style={[styles.headerTitle, styles.headerTextColor]}>{name}</Text>
		{!extra
		? <View style={styles.headerBlankView}/>
		: <TouchableOpacity 
			style={styles.headerButton}
			onPress={() => {navigation.navigate(extraScreen)}}
		>
			<Entypo name={extra} style={[styles.headerRightIcon, styles.headerTextColor]}/>
		</TouchableOpacity>}
	</View>

);