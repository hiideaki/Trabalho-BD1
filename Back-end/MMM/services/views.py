from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from rest_framework.decorators import api_view
from .serializers import *
from rest_framework.response import Response
from rest_framework import status

@api_view(['get'])
def lista_pessoas(request):
    pessoas = Pessoa.objects.raw('SELECT * FROM SERVICES_PESSOA')
    serializer = SerializerPessoa(pessoas, many=True)
    return Response(serializer.data)

@api_view(['get'])
def lista_organizacoes(request):
    organizacoes = Organizacao.objects.raw('SELECT * FROM SERVICES_ORGANIZACAO')
    serializer = SerializerOrganizacao(organizacoes, many=True)
    return Response(serializer.data)

@api_view(['get'])
def lista_usuarios(request):
    usuarios = Usuario.objects.raw('SELECT * FROM SERVICES_USUARIO')
    serializer = SerializerUsuario(usuarios, many=True)
    return Response(serializer.data)

@api_view(['get'])
def lista_grupos(request):
    grupos = Grupo.objects.raw('SELECT * FROM SERVICES_GRUPO')
    serializer = SerializerGrupo(grupos, many=True)
    return Response(serializer.data)

@api_view(['get'])
def usuario_participa_reuniao(request, pusuario, preuniao):
    comparece = Comparece.objects.raw('SELECT * FROM SERVICES_COMPARECE WHERE SERVICES_COMPARECE.REUNIAO_ID={} AND SERVICES_COMPARECE.USUARIO_ID={}'.format(preuniao, pusuario))
    serializer = SerializerComparece(comparece, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_pessoa_id(request, ppessoa):
    pessoa = Pessoa.objects.raw('SELECT * FROM SERVICES_PESSOA WHERE SERVICES_PESSOA.ID={}'.format(ppessoa))
    serializer = SerializerPessoa(pessoa, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_pessoa(request, pnome):
    pessoa = Pessoa.objects.raw('SELECT * FROM SERVICES_PESSOA WHERE NOMECOMPLETO LIKE "' + pnome + '"')
    serializer = SerializerPessoa(pessoa, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_usuario(request, pnome, psenha, pemail, pusuario):
    usuario = Usuario.objects.raw('SELECT * FROM SERVICES_USUARIO WHERE NOMEUSUARIO LIKE "' + pnome + '" OR EMAIL LIKE "' + pemail + '" OR NOMEUSUARIO LIKE "' + pusuario + '"')
    serializer = SerializerUsuario(usuario, many=True)
    return Response(serializer.data)

@api_view(['post'])
def cadastrar_pessoa(request, pnome):
    pessoa = Pessoa.objects.create(nomeCompleto=pnome)
    pessoa.save()
    serializer = SerializerPessoa(pessoa, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['get'])
def buscar_nome_usuario(request, pusuario):
    usuario = Usuario.objects.raw('SELECT * FROM SERVICES_USUARIO WHERE NOMEUSUARIO LIKE "' + pusuario + '"')
    serializer = SerializerUsuario(usuario, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_usuario_campo(request, campo, valor):
    usuario = Usuario.objects.raw(f'SELECT * FROM SERVICES_USUARIO WHERE {campo} LIKE "{valor}"')
    serializer = SerializerUsuario(usuario, many=True)
    return Response(serializer.data)

@api_view(['post'])
def cadastrar_usuario(request, pnome, psenha, pemail, pusuario):
    objpessoa = Pessoa.objects.raw('SELECT * FROM SERVICES_PESSOA WHERE NOMECOMPLETO LIKE "' + pnome + '"')
    usuario = Usuario.objects.create(nomeUsuario=pusuario, senha=psenha, email=pemail, pessoa=objpessoa[0])
    usuario.save()
    serializer = SerializerUsuario(usuario, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['get'])
def login_usuario(request, pusuario, psenha):
    usuario = Usuario.objects.raw('SELECT * FROM SERVICES_USUARIO WHERE NOMEUSUARIO LIKE "' + pusuario + '" AND SENHA LIKE "' + psenha + '"')
    serializer = SerializerUsuario(usuario, many=True)
    return Response(serializer.data)
    

@api_view(['get'])
def buscar_grupo_organizacao(request, pgrupo, porganizacao):
    grupo = Grupo.objects.raw('SELECT * FROM SERVICES_GRUPO, SERVICES_ORGANIZACAO WHERE SERVICES_GRUPO.NOMEGRUPO LIKE "{}" AND SERVICES_ORGANIZACAO.NOMEORGANIZACAO LIKE "{}" AND SERVICES_GRUPO.ORGANIZACAO_ID=SERVICES_ORGANIZACAO.ID'.format(pgrupo, porganizacao))
    serializer = SerializerGrupo(grupo, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_grupos_gerencia(request, pusuario):
    grupos = Grupo.objects.raw('SELECT SERVICES_GRUPO.* FROM SERVICES_GRUPO, SERVICES_COORDENA, SERVICES_USUARIO WHERE SERVICES_GRUPO.ID=SERVICES_COORDENA.GRUPO_ID AND SERVICES_USUARIO.ID=SERVICES_COORDENA.USUARIO_ID AND SERVICES_USUARIO.NOMEUSUARIO="' + pusuario + '"')
    serializer = SerializerGrupo(grupos, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_grupo(request, pgrupo):
    grupos = Grupo.objects.raw('SELECT * FROM SERVICES_GRUPO WHERE NOMEGRUPO LIKE "' + pgrupo + '"')
    serializer = SerializerGrupo(grupos, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_coordenador_grupo(request, pgrupo):
    usuario = Usuarios.objects.raw('SELECT SERVICES_USUARIO.* FROM SERVICES_USUARIO, SERVICES_COORDENA WHERE SERVICES_USUARIO.ID=SERVICES_COORDENA.USUARIO_ID AND SERVICES_COORDENA.GRUPO_ID=' + pgrupo)
    serializer = SerializerUsuario(usuario, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_nome_pessoa(request, pnome):
    pessoa = Pessoa.objects.raw('SELECT * FROM SERVICES_PESSOA WHERE ID=' + pnome)
    serializer = SerializerPessoa(pessoa, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_membros_grupo(request, pgrupo):
    usuario = Usuarios.objects.raw('SELECT SERVICES_USUARIO.* FROM SERVICES_USUARIO, SERVICES_PARTICIPA, SERVICES_COORDENA WHERE (SERVICES_USUARIO.ID=SERVICES_PARTICIPA.USUARIO_ID AND SERVICES_PARTICIPA.GRUPO_ID=' + pgrupo + ') OR (SERVICES_USUARIO.ID=SERVICES_COORDENA.USUARIO_ID AND SERVICES_COORDENA.GRUPO_ID=' + pgrupo + ')')
    serializer = SerializerUsuario(usuario, many=True)
    return Response(serializer.data)
    
@api_view(['get'])
def buscar_reuniao_grupo(request, pgrupo):
    reuniao = Reuniao.objects.raw('SELECT * FROM SERVICES_REUNIAO WHERE GRUPO_ID=' + pgrupo)
    serializer = SerializerReuniao(reuniao, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_grupos_participa(request, pusuario):
    grupo = Grupo.objects.raw('SELECT SERVICES_GRUPO.* FROM SERVICES_GRUPO, SERVICES_PARTICIPA, SERVICES_USUARIO WHERE SERVICES_PARTICIPA.GRUPO_ID=SERVICES_GRUPO.ID AND SERVICES_PARTICIPA.USUARIO_ID=SERVICES_USUARIO.ID AND SERVICES_USUARIO.NOMEUSUARIO="' + pusuario + '"')
    serializer = SerializerGrupo(grupo, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_participa_grupo(request, pgrupo):
    usuario = Usuario.objects.raw('SELECT SERVICES_USUARIO.* FROM SERVICES_USUARIO, SERVICES_PARTICIPA WHERE SERVICES_USUARIO.ID=SERVICES_PARTICIPA.USUARIO_ID AND SERVICES_PARTICIPA.GRUPO_ID=' + pgrupo)
    serializer = SerializerUsuario(usuario, many=True)
    return Response(serializer.data)
    
@api_view(['post'])
def insere_participa(request, pusuario, pgrupo):
    objusuario = Usuario.objects.raw('SELECT * FROM SERVICES_USUARIO WHERE ID=' + pusuario)
    objgrupo = Grupo.objects.raw('SELECT * FROM SERVICES_GRUPO WHERE ID=' + pgrupo)
    participa = Participa.objects.create(usuario=objusuario[0], grupo=objgrupo[0])
    participa.save()
    serializer = SerializerParticipa(participa, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['get'])
def procura_reuniao_ativo(request, pgrupo):
    reuniao = Reuniao.objects.raw('SELECT * FROM SERVICES_REUNIAO WHERE DATE(DATETIME("NOW", "LOCALTIME"))=DATA AND GRUPO_ID=' + pgrupo + ' AND TIME("NOW", "LOCALTIME") > HORAINICIO AND HORATERMINO')
    serializer = SerializerReuniao(reuniao, many=True)
    return Response(serializer.data)
    
@api_view(['post'])
def insere_reuniao(request, pgrupo, pdata, phorai, phorat, plocal):
    objgrupo = Grupo.objects.raw('SELECT * FROM SERVICES_GRUPO WHERE ID=' + pgrupo)
    reuniao = Reuniao.objects.create(data=pdata, horaInicio=phorai, horaTermino=phorat, local=plocal, grupo=objgrupo[0])
    reuniao.save()
    serializer = SerializerReuniao(reuniao, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['get'])
def procura_organizacao(request, porganizacao):
    organizacao = Organizacao.objects.raw('SELECT * FROM SERVICES_ORGANIZACAO WHERE ID=' + porganizacao)
    serializer = SerializerOrganizacao(organizacao, many=True)
    return Response(serializer.data)

@api_view(['get'])
def reunioes_usuario_presente(request, pusuario, pgrupo):
    comparece = Comparece.objects.raw('SELECT * FROM SERVICES_COMPARECE WHERE SERVICES_COMPARECE.GRUPO_ID={} AND SERVICES_COMPARECE.PESSOA_ID={}'.format(pgrupo, pusuario))
    serializer = SerializerComparece(comparece, many=True)
    return Response(serializer.data)

@api_view(['get'])
def procura_qr(request, pqr):
    reuniao = Reuniao.objects.raw('SELECT * FROM SERVICES_REUNIAO WHERE QRCODE="{}"'.format(pqr))
    serializer = SerializerReuniao(reuniao, many=True)
    return Response(serializer.data)

@api_view(['get'])
def buscar_organizacao(request, porganizacao):
    organizacao = Organizacao.objects.raw('SELECT * FROM SERVICES_ORGANIZACAO WHERE NOMEORGANIZACAO LIKE "' + porganizacao + '"')
    serializer = SerializerOrganizacao(organizacao, many=True)
    return Response(serializer.data)


@api_view(['get'])
def procura_organizacao_nome(request, porganizacao):
    organizacao = Organizacao.objects.raw('SELECT * FROM SERVICES_ORGANIZACAO WHERE NOMEORGANIZACAO LIKE "' + porganizacao + '"')
    serializer = SerializerOrganizacao(organizacao, many=True)
    return Response(serializer.data)
    
@api_view(['post'])
def insere_organizacao(request, pnome):
    organizacao = Organizacao.objects.create(nomeOrganizacao=pnome)
    organizacao.save()
    serializer = SerializerOrganizacao(organizacao, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['get'])
def procura_grupo_nome(request, pgrupo):
    grupo = Grupo.objects.raw('SELECT * FROM SERVICES_GRUPO WHERE NOMEGRUPO LIKE "' + pgrupo + '"')
    serializer = SerializerGrupo(grupo, many=True)
    return Response(serializer.data)

@api_view(['get'])
def procura_grupo(request, pgrupo):
    grupo = Grupo.objects.raw('SELECT * FROM SERVICES_GRUPO WHERE ID={}'.format(pgrupo))
    serializer = SerializerGrupo(grupo, many=True)
    return Response(serializer.data)
    
@api_view(['post'])
def insere_grupo(request, pnome, porganizacao):
    objorganizacao = Organizacao.objects.raw('SELECT * FROM SERVICES_ORGANIZACAO WHERE ID=' + porganizacao)
    grupo = Grupo.objects.create(nomeGrupo=pnome, organizacao=objorganizacao[0])
    grupo.save()
    serializer = SerializerGrupo(grupo, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['post'])
def insere_coordena(request, pusuario, pgrupo):
    objusuario = Usuario.objects.raw('SELECT * FROM SERVICES_USUARIO WHERE ID=' + pusuario)
    objgrupo = Grupo.objects.raw('SELECT * FROM SERVICES_GRUPO WHERE ID=' + pgrupo)
    coordena = Coordena.objects.create(grupo=objgrupo[0], usuario=objusuario[0])
    coordena.save()
    serializer = SerializerCoordena(coordena, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['post'])
def insere_comparece(request, pgrupo, pdata, phorai, ppessoa):
    objreuniao = Reuniao.objects.raw('SELECT * FROM SERVICES_REUNIAO WHERE DATA=' + pdata + ' AND HORAINICIO=' + phorai + ' AND GRUPO=' + pgrupo)
    objpessoa = Pessoa.objects.raw('SELECT * FROM SERVICES_PESSOA WHERE ID=' + ppessoa)
    comparece = Comparece.objects.create(grupo=pgrupo, reuniao=objreuniao[0], pessoa=objpessoa[0])
    comparece.save()
    serializer = SerializerComparece(comparece, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['post'])
def deleta_grupo(request, pgrupo):
    objgrupo = Grupo.objects.get(pk=pgrupo)
    objgrupo.delete()
    return Response(status=status.HTTP_200_OK)
    
@api_view(['post'])
def deleta_reuniao(request, preuniao):
    objReuniao = Reuniao.objects.get(pk=preuniao)
    objReuniao.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(['get'])
def buscar_comparece_reuniao(request, preuniao):
    usuario = Usuario.objects.raw('SELECT SERVICES_USUARIO.* FROM SERVICES_USUARIO, SERVICES_COMPARECE WHERE SERVICES_USUARIO.ID=SERVICES_COMPARECE.USUARIO_ID AND SERVICES_COMPARECE.REUNIAO_ID=' + preuniao)
    serializer = SerializerUsuario(usuario, many=True)
    return Response(serializer.data)

@api_view(['get'])
def verifica_comparece(request, pusuario, pgrupo):
    comparece = Comparece.objects.raw('SELECT * FROM SERVICES_COMPARECE WHERE USUARIO_ID=' + pusuario + ' AND GRUPO_ID=' + pgrupo)
    serializer = SerializerComparece(comparece, many=True)
    return Response(serializer.data)

@api_view(['post'])
def atualiza_usuario_senha(request, pid, psenha):
    Usuario.objects.filter(id=pid).update(senha=psenha)
    return Response(status=status.HTTP_200_OK)

@api_view(['post'])
def atualiza_usuario_email(request, pid, pemail):
    Usuario.objects.filter(id=pid).update(email=pemail)
    return Response(status=status.HTTP_200_OK)






    
    
    
