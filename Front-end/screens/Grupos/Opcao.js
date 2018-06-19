import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../Styles';

export default class Opcao extends React.Component {
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
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('NovoGrupo')}
                        >
                            <Text style={styles.buttonText}>Novo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('EntraGrupo')}
                        >
                            <Text style={styles.buttonText}>Existente</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }
}