import React from 'react';
import { Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export async function login(id, user, senha) {
    if(user == '') {
        Alert.alert('Erro', 'Insira o nome de usuário.', [{text: 'OK'}], { cancelable: false})
        return false
    }
    if(senha == '') {
        Alert.alert('Erro', 'Insira a senha.', [{text: 'OK'}], { cancelable: false})
        return false
    }

    encontrado = await GET(['login_usuario', user, senha])

    if(encontrado.length == 0) {
        Alert.alert('Usuário ou senha incorretos', 'Verifique os dados inseridos.', [{text: 'OK'}], { cancelable: false})
        return false
    }
    else {
        global.auth = true
        global.user = user
        global.userid = encontrado[0].pessoa
        global.idid = encontrado[0].id
        return true
    }
}

function validarEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
};

export async function GET(dados) {
      url = `${global.server}/${dados.join('/')}?format=json` 
       try {
           const response = await fetch(url);
           const responseJson = await response.json();
           return responseJson;
       } catch(error){
            console.error(error);
       }
    }

export async function POST(dados, valores) {
      url = `${global.server}/${dados.join('/')}`
      console.log(url)
       try {
           const response = await fetch(url, 
            {method: 'POST',
             body: JSON.stringify(valores)
             });
           // const responseJson = await response.json();
           return response;
       } catch(error){
            console.error(error);
       }
    }

export async function cadastrar(user, nome, email, senha1, senha2, nav) {
  if(user == '' || nome == '' || email == '' || senha1 == '' || senha2 == '') {
    Alert.alert('Erro', 'Por favor, preencha todos os campos.', [{text: 'OK'}], { cancelable: false})
    return
  }
  if(!validarEmail(email)) {
    Alert.alert('Erro', 'E-mail em formato inválido.', [{text: 'OK'}], { cancelable: false})
    return
  }
  if(senha1 != senha2) {
    Alert.alert('Erro', 'Senhas não correspondem.', [{text: 'OK'}], { cancelable: false})
    return
  }

  respostaServidor = await GET(['buscar_usuario_campo', 'nomeusuario', user])

  if(respostaServidor.length > 0) {
    Alert.alert('Erro', 'Nome de usuário já existente.', [{text: 'OK'}], { cancelable: false})
    return
  }

  respostaServidor = await GET(['buscar_usuario_campo', 'email', email])

  if(respostaServidor.length > 0) {
    Alert.alert('Erro', 'E-mail já cadastrado.', [{text: 'OK'}], { cancelable: false})
    return
  }

  respostaServidor = await GET(['buscar_pessoa', nome])
  if(respostaServidor.length == 0) {
    respostaServidor = await POST(['cadastrar_pessoa', nome])
        if(!respostaServidor.ok) {
          Alert.alert('', 'Erro ao adicionar pessoa.', [{text: 'OK'}], { cancelable: false})
          return
        }
  }

  respostaServidor = await POST(['cadastrar_usuario', nome, senha1, email, user])
  if(!respostaServidor.ok) {
    Alert.alert('', 'Erro ao adicionar usuário.', [{text: 'OK'}], { cancelable: false})
    return
  }
  else {
    Alert.alert('', 'Usuário cadastrado com sucesso.', [{text: 'OK', onPress: () => nav.pop()}], { cancelable: false})
  }
}

export async function inserirNovoGrupo(grupo, organizacao, nav) {
  if(grupo == '' || organizacao == '') {
    Alert.alert('Erro', 'Por favor, preencha todos os campos.', [{text: 'OK'}], { cancelable: false})
    return false
  }

  respostaServidor = await GET(['buscar_grupo_organizacao', grupo, organizacao])
  
  if(respostaServidor.length > 0) {
    Alert.alert('Erro', `${organizacao} já possui o grupo ${grupo}.`, [{text: 'OK'}], { cancelable: false})
    return false
  }

  proc_org = await GET(['buscar_organizacao', organizacao])
  if(proc_org.length == 0) {
    respostaServidor = await POST(['insere_organizacao', organizacao])
    if(!respostaServidor.ok) {
      Alert.alert('', 'Erro ao criar organização.', [{text: 'OK'}], { cancelable: false})
      return false
    }
  }

  proc_org = await GET(['buscar_organizacao', organizacao])
  respostaServidor = await POST(['insere_grupo', grupo, proc_org[0].id])

  if(!respostaServidor.ok) {
    Alert.alert('', 'Erro ao adicionar grupo.', [{text: 'OK'}], { cancelable: false})
    return false
  }

  proc_grupo = await GET(['buscar_grupo', grupo])
  respostaServidor = await POST(['insere_coordena', global.idid, proc_grupo[0].id])

  if(!respostaServidor.ok) {
    Alert.alert('', 'Erro ao associar grupo ao coordenador.', [{text: 'OK'}], { cancelable: false})
    console.log(respostaServidor)
    return false
  }
  else {
    Alert.alert('', 'Grupo cadastrado com sucesso.', [{text: 'OK', onPress: () => {nav.pop(2)}}], { cancelable: false})
  } 
}

export async function entraEmGrupo(grupo, organizacao, nav) {
  if(grupo == '' || organizacao == '') {
    Alert.alert('Erro', 'Por favor, preencha todos os campos.', [{text: 'OK'}], { cancelable: false})
    return false
  }

  proc_org = await GET(['buscar_organizacao', organizacao])
  if(proc_org.length == 0) {
    Alert.alert('Erro', 'Organização não encontrada.', [{text: 'OK'}], { cancelable: false})
    return false
  }

  respostaServidor = await GET(['buscar_grupo_organizacao', grupo, organizacao])
  
  if(respostaServidor.length == 0) {
    Alert.alert('Erro', `${organizacao} não possui o grupo ${grupo}.`, [{text: 'OK'}], { cancelable: false})
    return false
  }

  proc_grupo = await GET(['buscar_grupo', grupo])
  membrosGrupo = await GET(['buscar_membros_grupo', proc_grupo[0].id])
  membrosGrupo.map((i_grupo) => {
    if(i_grupo.nomeUsuario == global.user) {
      Alert.alert('Erro', 'Você já participa desse grupo', [{text: 'OK'}], { cancelable: false})
      return false
    }
  })

  coordenadorGrupo = await GET(['buscar_coordenador_grupo', proc_grupo[0].id])
  coordenadorGrupo.map((i_grupo) => {
    if(i_grupo.nomeUsuario == global.user) {
      Alert.alert('Erro', 'Você coordena esse grupo', [{text: 'OK'}], { cancelable: false})
      return false
    }
  })

  respostaServidor = await POST(['insere_participa', global.idid, proc_grupo[0].id])
  if(!respostaServidor.ok) {
    Alert.alert('', 'Erro ao adicionar', [{text: 'OK'}], { cancelable: false})
    return false
  }
  else {
    Alert.alert('', 'Adicionado ao grupo', [{text: 'OK', onPress: () => {nav.pop(2)}}], { cancelable: false})
  } 
}

export async function iniciarReuniao(grupo, data, horaInicio, horaTermino, local, nav) {
    if(horaInicio >= horaTermino) {
      Alert.alert(
        'Horário Incorreto',
        'Término não pode ser igual ou anterior ao início.',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      )
      return
    }
    if(!local) {
      Alert.alert(
        'Local Incorreto',
        'O local deve ser preenchido.',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      )
      return
    }

    respostaServidor = await POST(['insere_reuniao', grupo, data, horaInicio, horaTermino, local])
    if(!respostaServidor.ok) {
      Alert.alert('', 'Erro ao adicionar', [{text: 'OK'}], { cancelable: false})
      return false
    }
    else{
      dados = await respostaServidor.json()
      nav.navigate('ReuniaoIniciada', {qrCode: dados.qrCode}) 
    }
  }

export async function atualizarEmail(usuario, email) {
  if(!validarEmail(email)) {
    Alert.alert('Erro', 'E-mail em formato inválido.', [{text: 'OK'}], { cancelable: false})
    return
  }
  respostaServidor = await POST(['atualiza_usuario_email', usuario, email])
  if(!respostaServidor.ok) {
      Alert.alert('', 'Erro ao atualizar', [{text: 'OK'}], { cancelable: false})
      return false
    }
  else {
    Alert.alert('', 'E-mail atualizado com sucesso', [{text: 'OK'}], { cancelable: false})
  }
}