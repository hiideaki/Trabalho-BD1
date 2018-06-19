"""MMM URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from services.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('lista_pessoas/', lista_pessoas),
    path('lista_organizacoes/', lista_organizacoes),
    path('lista_usuarios/', lista_usuarios),
    path('lista_grupos/', lista_grupos),
    path('buscar_pessoa/<pnome>', buscar_pessoa),
    path('buscar_usuario/<pnome>/<psenha>/<pemail>/<pusuario>', buscar_usuario),
    path('buscar_pessoa_id/<ppessoa>', buscar_pessoa),
    path('buscar_nome_usuario/<pusuario>', buscar_nome_usuario),
    path('buscar_usuario_campo/<campo>/<valor>', buscar_usuario_campo),
    path('cadastrar_pessoa/<pnome>', cadastrar_pessoa),
    path('cadastrar_usuario/<pnome>/<psenha>/<pemail>/<pusuario>', cadastrar_usuario),
    path('login_usuario/<pusuario>/<psenha>', login_usuario),
    path('buscar_grupos_gerencia/<pusuario>', buscar_grupos_gerencia),
    path('buscar_grupo_organizacao/<pgrupo>/<porganizacao>', buscar_grupo_organizacao),
    path('buscar_nome_pessoa/<pnome>', buscar_nome_pessoa),
    path('buscar_coordenador_grupo/<pgrupo>', buscar_coordenador_grupo),
    path('buscar_membros_grupo/<pgrupo>', buscar_membros_grupo),
    path('buscar_reuniao_grupo/<pgrupo>', buscar_reuniao_grupo),
    path('buscar_grupos_participa/<pusuario>', buscar_grupos_participa),
    path('insere_participa/<pusuario>/<pgrupo>/<pregistro>', insere_participa),
    path('insere_reuniao/<pgrupo>/<pdata>/<phorai>/<phorat>/<plocal>', insere_reuniao),
    path('buscar_participa_grupo/<pgrupo>', buscar_participa_grupo),
    path('procura_organizacao/<porganizacao>', procura_organizacao),
    path('insere_organizacao/<pnome>', insere_organizacao),
    path('insere_grupo/<pnome>/<porganizacao>', insere_grupo),
    path('insere_coordena/<pusuario>/<pgrupo>', insere_coordena),
    path('insere_comparece/<pgrupo>/<pdata>/<phorai>/<ppessoa>', insere_comparece),
    path('procura_reuniao_ativo/<pgrupo>', procura_reuniao_ativo),
    path('buscar_grupo/<pgrupo>', buscar_grupo),
    path('procura_organizacao_nome/<porganizacao>', procura_organizacao_nome),
    path('reunioes_usuario_presente/<pusuario>/<pgrupo>', reunioes_usuario_presente),
    path('procura_qr/<pqr>', procura_qr),
    path('buscar_organizacao/<porganizacao>', buscar_organizacao),
    path('procura_grupo_nome/<pgrupo>', procura_grupo_nome),    
    path('procura_grupo/<pgrupo>', procura_grupo),
    path('deleta_reuniao/<preuniao>', deleta_reuniao),    
    path('buscar_comparece_reuniao/<preuniao>', buscar_comparece_reuniao),
    path('atualiza_usuario_senha/<pid>/<psenha>', atualiza_usuario_senha),
    path('atualiza_usuario_email/<pid>/<pemail>', atualiza_usuario_email),
    path('usuario_participa_reuniao/<pusuario>/<preuniao>', usuario_participa_reuniao),
    path('verifica_comparece/<pusuario>/<pgrupo>', verifica_comparece),
    path('deleta_grupo/<pgrupo>', deleta_grupo),
    
]











