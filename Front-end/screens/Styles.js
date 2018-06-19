import React from 'react';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

var {height, width} = Dimensions.get('window');

export default Styles = EStyleSheet.create({

	/* Container */
	container: {
		flex: 1,
		backgroundColor: '$bg_color',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	centerContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: '0.7rem',
	},
	containerBack: {
		flex: 1,
		alignItems: 'flex-end',
		zIndex: 0,
		position: 'absolute',
	},
	flexStartContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	/* Input */ 
	inputText: {
		fontSize: '1.3rem',
		paddingHorizontal: '1.07rem',
		width: '100%',
		textAlign: 'center',
	},
	inputIcon: {
		color: '$bg_color',
		fontSize: '1.43rem',
	},
	inputTitle: {
		fontSize: '1.28rem',
		color: 'white',
		paddingHorizontal: '1.42rem',
	},
	input: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '75%',
		backgroundColor: 'rgba(255,255,255,0.9)',
		borderRadius: 50,
		paddingHorizontal: '2rem',
		paddingVertical: '1rem',
		marginTop: '0.35rem',
		marginBottom: '0.71rem',
	},

	/* Button */
	button: {
		backgroundColor: 'rgba(200,200,200,0.7)',
		borderRadius: 100,
		marginTop: '1.43rem',
		padding: '0.71rem',
		marginLeft: '0.71rem',
		width: width*0.4,
		alignItems: 'center',
	},
	buttonText: {
		fontSize: '1.3rem',
		color: 'white',
	},

	/* Background */
	background: {
		flex: 1,
		backgroundColor: '$bg_color',
		alignItems: 'center',
		justifyContent: 'center',
	},
	backWithImage: {
		flex: 1,
		backgroundColor: '$bg_color',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	imageBack: {
		width: '$width_image',
		resizeMode: 'contain',
		opacity: 0.2,
	},
	gruposImage: {
		height: '$height_grupos',
	},
	instrutorImage: {
		height: '$height_instrutor',
	},
	pessoasImage: {
		height: '$height_pessoas',
	},
	iconBack: {
		fontSize: '11.43rem',
		color: 'rgba(200, 200, 200, 0.4)',
	},

	/* Header */
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 25,
		backgroundColor: 'white'
	},
	headerButton: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 5,
		paddingBottom: 5 
	},
	headerTitle: {
		fontSize: '1.2rem',
	},
	headerLeftIcon: {
		fontSize: '2.4rem',
	},
	headerRightIcon: {
		fontSize: '1.6rem',
	},
	headerTextColor: {
		color: 'black',
	},
	headerBlankView: {
		paddingRight: '3.57rem',
	},

	/* Login */

	logo: {
	  	fontSize: '12rem',
	  	margin: '3.6rem',
	  	borderRadius: 100,
	  	backgroundColor: 'white',
	  	color: '$bg_color'
	},

	/* Home */
	backgroundHome: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
	},
	backHomeImage: {
		backgroundColor: '$bg_color',
		width: width / 2,
		height: (height - 60) / 3,
		padding: '1.43rem',
	},
	homeTitle: {
		fontSize: '1.3rem',
		paddingBottom: '1.43rem',
		fontWeight: 'bold'
	},
	homeDescription: {
		fontSize: '1.15rem',
		textAlign: 'justify',
	},
	homeTextContainer: {
		flex: 1,
		paddingLeft: '0.71rem',
	},

	/* ItemGrupo */
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: (width - 20) / 2,
		borderRadius: 10,
		margin: '0.35rem',
		padding: '0.71rem',
		backgroundColor: 'rgba(200,200,200,0.7)',
	},
	itemTextos: {
		borderLeftColor: '$bg_color',
		borderLeftWidth: '0.14rem',
		paddingLeft: '0.71rem',
		flex: 1,
		flexWrap: 'wrap',
	},
	itemGrupo: {
		fontSize: '1.42rem',
		color: '#333',
	},
	itemOrg: {
		fontSize: '1rem',
		color: 'white',
	},

	/* Lista */
	listaTitle: {
		fontSize: '1.4rem',
		paddingVertical: '0.5rem',
		color: 'white',
	},
	listaLinha: {
		letterSpacing: -5,
		textAlign: 'center',
	},

	/* Perfil */
	perfilAvatar: {
		width: '11rem',
	  	height: '11rem',
	  	borderRadius: '7rem',
	  	resizeMode: 'cover',
	  	margin: '2.15rem',
	  	borderColor: 'rgba(255,255,255,0.4)',
	  	borderWidth: 2,
	},

	/* Drawer */
	drawerContainer: {
		flex: 1,
	    alignItems: 'center',
	    backgroundColor: '#000913',
	    height: height,
	    paddingVertical: '1.42rem',
	},
	drawerInnerContainer: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	drawerButton: {
		fontSize: '2.4rem',
		color: 'white',
		paddingLeft: '1.3rem'
	},
	drawerMenu: {
		width: width > 500 ? width*0.42 : width*0.7,
	},
	drawerButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: width > 500 ? width*0.42 : width*0.7,
		paddingVertical: '3rem',
	},
	drawerName: {
		fontSize: '1.42rem',
	  	color: 'white',
	  	fontWeight: 'bold',
	  	marginBottom: '2.14rem',
	    padding: '1.42rem',
	    textAlign: 'center',
	},
	drawerStatsContainer: {
		flex: 1,
	  	alignItems: 'flex-start',
	  	padding: '1.42rem',
	  	width: '100%',
	},
	drawerStatsTitle: {
		fontSize: '1.3rem',
	  	color: '#aaa',
	  	marginRight: '0.71rem',
	  	marginBottom: '0.71rem',
	},
	drawerStatsData: {
		fontSize: '1.3rem',
	  	color: '#666',
	  	marginBottom: '0.71rem',
	},

	/* Buscar */
	camera: {
		width: '75%',
		aspectRatio: 1/1,
	},
	buscarMensagens: {
		color: 'white',
		fontSize: '1.5rem',
		padding: '0.71rem',
	},

	/* Reunioes */
	listaReunioesContainerItem: {
		flexDirection: 'row',
		width: width,
		alignItems: 'center',
		borderRadius: 50,
		marginTop: '0.5rem',
		justifyContent: 'space-around',
		backgroundColor: 'rgba(190,190,190,0.7)',
		paddingVertical: '0.2rem',
	},
	listaReunioesIcone: {
	  	fontSize: '2.25rem',
	  	textAlignVertical: 'center',
	  	color: 'white',
	},
	listaDataHora: {
		textAlign: 'center',
		color: 'white',
	},
	listaTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginVertical: '0.5rem',
	},
	listaTitulo: {
		fontSize: '1.4rem',
		textAlign: 'center',
	},
	listaValor: {
		fontSize: '1.2rem',
		color: 'white',
		textAlign: 'center',
	},

	/* Presente */
	presenteIcone: {
		fontSize: '8rem',
		color: 'green',
	  	borderRadius: 100,
	  	backgroundColor: 'white',
	  	marginTop: '3rem',
	  	marginBottom: '1rem',
	},
	presenteTexto: {
		color: 'white',
		fontSize: '1.5rem',
		marginBottom: '4rem',
	},

	/* Membros */
	avatarMembroGrupo: {
		width: '5rem',
	  	height: '5rem',
	  	borderRadius: 50,
	  	resizeMode: 'cover',
	},
	containerMembros: {
		alignItems: 'center',
		borderRadius: 15,
		width: '$width_membro - 1.42rem',
		marginTop: '0.5rem',
		justifyContent: 'center',
		backgroundColor: 'rgba(190,190,190,0.7)',
		paddingHorizontal: '0.5rem',
		paddingVertical: '0.5rem',
		marginHorizontal: '0.35rem',
	},
	mailtoButton: {
		fontSize: '2.6rem',
		color: 'white',
	},
	nomeMembro: {
		fontSize: '1.25rem',
		padding: '0.5rem',
		textAlign: 'center',
	},

	/* NovaReuniao */
	pickers: {
		width: '100%',
		borderWidth: 0,
	},
})