import React from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import ItemMembros from '../../components/Grupos/ItemMembros';
import Carregando from '../../components/Carregando';
import styles from '../Styles';
import { GET } from '../Funcoes';

export default class PessoasPresentes extends React.Component {
    constructor(props) {
        super(props);
        this.state = 
                    { 
                        id: props.navigation.getParam('id', null),
                        membros: '',
                        carregando: true,
                    }
        console.log(this.state.id)
    }

    async componentWillMount() {
        this.setState({ membros: await GET(['buscar_comparece_reuniao', this.state.id]),
                        carregando: false})
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
                <View>
                    {this.state.carregando
                        ? 
                            <Carregando />
                        :
                            <FlatList
                                data={this.state.membros}
                                keyExtractor={(item, index) => `ItemListaMembros-${index}`}
                                renderItem={
                                    ({ item, index }) => 
                                        (<ItemMembros data={item} navigation={this.props.navigation}/>
                                )}
                                numColumns={3}
                                columnWrapperStyle={styles.listaMembrosColunas}
                            />
                    }
                </View>
            </View>
        )
    }
}