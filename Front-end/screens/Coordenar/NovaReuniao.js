import React from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import styles from '../Styles';
import { iniciarReuniao } from '../Funcoes';
import moment from 'moment'

export default class NovaReuniao extends React.Component {
	constructor(props) {
		super(props);
		dados = this.props.navigation.getParam('data', null)
		agora = new Date()
		horaAtual = `${agora.getHours()}:${agora.getMinutes()}`
		this.state = {data: moment(agora).format('YYYY-MM-DD'), horaInicio: horaAtual, horaTermino: horaAtual, local: "", dados: dados}
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
				<View style={styles.innerContainer}>
						<View>
							<Text style={styles.inputTitle}>Início:</Text>
							<View style={styles.input}>
								<Entypo name="clock" style={styles.inputIcon} />
								<DatePicker
									style={styles.pickers}
									customStyles={{dateInput: styles.pickers}}
									mode="time"
									date={this.state.horaInicio}
									confirmBtnText="OK"
									cancelBtnText="Cancelar"
									showIcon={false}
									onDateChange={(horaInicio) => {this.setState({horaInicio})}}
								/>
							</View>
						</View>
						<View>
							<Text style={styles.inputTitle}>Término:</Text>
							<View style={styles.input}>
								<Entypo name="clock" style={styles.inputIcon} />
								<DatePicker
									style={styles.pickers}
									customStyles={{dateInput: styles.pickers}}
									mode="time"
									date={this.state.horaTermino}
									confirmBtnText="OK"
									cancelBtnText="Cancelar"
									showIcon={false}
									onDateChange={(horaTermino) => {this.setState({horaTermino})}}
								/>
							</View>
						</View>
						<View>
							<Text style={styles.inputTitle}>Local:</Text>
							<View style={styles.input}>
								<Entypo name="location" style={styles.inputIcon} />
								<TextInput 
									style={styles.inputText}
									underlineColorAndroid = 'transparent'
									onChangeText={(local) => this.setState({local})}
								></TextInput>
							</View>
						</View>

					<View style={styles.rowContainer}>
						<TouchableOpacity 
							style={styles.button}
							onPress={() => iniciarReuniao(
												this.state.dados.id,
												this.state.data,
												this.state.horaInicio,
												this.state.horaTermino,
												this.state.local,
												this.props.navigation
											)}
						>
							<Text style={styles.buttonText}>Iniciar</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={styles.button}
							onPress={() => this.props.navigation.pop()}
						>
							<Text style={styles.buttonText}>Cancelar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}