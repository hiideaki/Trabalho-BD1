import React from 'react';
import { ScrollView, Text, Image, ImageBackground, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import styles from '../screens/Styles';
import { StackActions, NavigationActions } from 'react-navigation';

export default Drawer = (props) => {
  return(
  <ScrollView>
    <SafeAreaView 
      style={styles.drawerContainer}
    	forceInset={{ top: 'always', horizontal: 'never' }}>
      <ImageBackground
      	style={styles.drawerInnerContainer}
      	source={require('../images/fundoDrawer.png')}
      	resizeMode='cover'>
        <View style={styles.centerContainer}>
          <Image
            source={require('../images/vicente.jpg')}
            style={styles.perfilAvatar} 
          />
          <Text style={styles.drawerName}>Vicente Coelho Lobo Neto</Text>
        </View>
      	<View style={styles.drawerStatsContainer}>
      		<View style={styles.rowContainer}>
	      		<Text style={styles.drawerStatsTitle}>Grupos: </Text>
	      		<Text style={styles.drawerStatsData}>5</Text>
	      	</View>
	      	<View style={styles.rowContainer}>
	      		<Text style={styles.drawerStatsTitle}>Frequência Média:</Text>
	      		<Text style={styles.drawerStatsData}>71%</Text>
	      	</View>
      	</View>
      	<View style={styles.drawerButtonContainer}>
          <TouchableOpacity onPress={() => {props.navigation.dispatch(DrawerActions.closeDrawer()); props.navigation.navigate('Perfil'); }}>
            <Entypo name="cog" style={styles.drawerButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              props.navigation.dispatch(DrawerActions.closeDrawer()); 
              global.auth = false
              global.user = ''
              global.userid = ''
              props.navigation.dispatch(StackActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Login' })]}))
            }}>
            <Entypo name="log-out" style={styles.drawerButton} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  </ScrollView>
)};