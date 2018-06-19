import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { View, Text, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './screens/Home';
import Desenvolvedor from './screens/Desenvolvedor';

import Login from './screens/Login/Login';
import Cadastro from './screens/Login/Cadastro';
import RecuperarSenha from './screens/Login/RecuperarSenha';

import Perfil from './screens/Perfil/Perfil';
import TrocaSenha from './screens/Perfil/TrocaSenha';

import Buscar from './screens/Participar/Buscar';
import Presente from './screens/Participar/Presente';

import Lista from './screens/Grupos/Lista';
import NovoGrupo from './screens/Grupos/NovoGrupo';
import InfoGrupo from './screens/Grupos/InfoGrupo';
import Membros from './screens/Grupos/Membros';
import Reunioes from './screens/Grupos/Reunioes';
import Opcao from './screens/Grupos/Opcao';
import EntraGrupo from './screens/Grupos/EntraGrupo';

import Gerencia from './screens/Coordenar/Gerencia';
import NovaReuniao from './screens/Coordenar/NovaReuniao';
import ReuniaoIniciada from './screens/Coordenar/ReuniaoIniciada';
import PessoasPresentes from './screens/Coordenar/PessoasPresentes';

import { GET } from './screens/Funcoes';

global.server = "http://10.0.3.2:8000"
global.user = "yendorr"
global.userid = 16
global.idid = 9

const Screens = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  Cadastro: {
    screen: Cadastro,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Cadastrar Novo Usuário" navigation={navigation}/>
    }),
  },
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
    	header: <Header name="My Meeting Manager" icon="menu" navigation={navigation}/>
    }),
  },
  Perfil: {
    screen: Perfil,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Meu Perfil" navigation={navigation} />
    }),
  },
  TrocaSenha: {
    screen: TrocaSenha,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Troca de Senha" navigation={navigation} />
    }),
  },
  Buscar: {
    screen: Buscar,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Participar de uma reunião" navigation={navigation} />
    }),
  },
  Presente: {
    screen: Presente,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Presença Registrada" navigation={navigation} />
    }),
  },
   Gerencia: {
    screen: Gerencia,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Grupos que gerencia" navigation={navigation} />
    }),
  },
  NovaReuniao: {
    screen: NovaReuniao,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Iniciar Nova Reunião" navigation={navigation} />
    }),
  },
  ReuniaoIniciada: {
    screen: ReuniaoIniciada,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Reunião Iniciada" navigation={navigation} />
    }),
  },
  PessoasPresentes: {
    screen: PessoasPresentes,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Pessoas presentes" navigation={navigation} />
    }),
  },
  Lista: {
    screen: Lista,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Meus Grupos" navigation={navigation} extra="plus" extraScreen="Opcao" />
    }),
  },
  NovoGrupo: {
    screen: NovoGrupo,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Criar Novo Grupo" navigation={navigation} />
    }),
  },
  EntraGrupo: {
    screen: EntraGrupo,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Entrar em um Grupo" navigation={navigation} />
    }),
  },
  Opcao: {
    screen: Opcao,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Adicionar Grupo" navigation={navigation} />
    }),
  },
  InfoGrupo: {
    screen: InfoGrupo,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Detalhes do Grupo" navigation={navigation} />
    }),
  },
  Reunioes: {
    screen: Reunioes,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Reuniões" navigation={navigation} />
    }),
  },
  Membros: {
    screen: Membros,
    navigationOptions: ({ navigation }) => ({
      header: <Header name="Lista de Pessoas" navigation={navigation} />
    }),
  },
},
);

var {height, width} = Dimensions.get('window');

EStyleSheet.build({
  $rem: width > 500 ? 16 : 12,
  $bg_color: '#14B0BF',
  $header_size: '5rem',
  $width_image: width - 20,
  $height_grupos: (width - 20) * 432/989,
  $height_instrutor: (width - 20) * 776/1222,
  $height_pessoas: (width - 20) * 1147/1896,
  $width_membro: width / 3,
});

export default createDrawerNavigator({
  Stack: {
    screen: Screens
  }},{
    contentComponent: Drawer,
    drawerLockMode: 'locked-closed'
  }
)
