import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../Styles';
import { entraEmGrupo } from '../Funcoes';

export default class EntraGrupo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {grupo: '', organizacao: ''}
    }
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.containerBack}>
                    <Image
                        style={[styles.imageBack, styles.gruposImage]}
                        source={require('../../images/grupos.png')}
                    />
                </View>
                    <View style={styles.innerContainer}>
                        <View style={styles.input}>
                            <Entypo name="users" style={styles.inputIcon} />
                            <TextInput 
                                style={styles.inputText}
                                placeholder='Nome do Grupo'
                                underlineColorAndroid = 'transparent'
                                onChangeText = {(grupo) => this.setState({grupo})}
                            />
                        </View>
                        <View style={styles.input}>
                            <Entypo name="home" style={styles.inputIcon} />
                            <TextInput 
                                style={styles.inputText}
                                placeholder='Nome da Organização'
                                underlineColorAndroid = 'transparent'
                                onChangeText = {(organizacao) => this.setState({organizacao})}
                            />
                        </View>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => entraEmGrupo(this.state.grupo, this.state.organizacao, this.props.navigation)}
                        >
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }
}