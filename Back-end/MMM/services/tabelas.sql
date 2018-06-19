create table ORGANIZACAO (
 ID_ORGANIZACAO number,
 NOME_ORGANIZACAO varchar2(50) unique,
 constraint ORGANIZACAO_PK primary key (ID_ORGANIZACAO)
);
create table PESSOA (
 ID_PESSOA number,
 NOME_COMPLETO varchar2(100),
 constraint PESSOA_PK primary key (ID_PESSOA)
);
create table USUARIO (
 ID_USUARIO number,
 ID_CELULAR varchar2(17),
 NOME_USUARIO varchar2(20),
 SENHA varchar2(100),
 EMAIL varchar2(100),
 ID_PESSOA number references PESSOA(ID_PESSOA),
 constraint USUARIO_PK primary key (ID_USUARIO)
);
create table VISITANTE (
 ID_VISITANTE number,
 ID_PESSOA number references PESSOA(ID_PESSOA),
 constraint VISITANTE_PK primary key (ID_VISITANTE)
);
create table GRUPO (
 ID_GRUPO number,
 NOME_GRUPO varchar2(50),
 SENHA_CONEXAO varchar2(100),
 ID_ORGANIZACAO number references ORGANIZACAO(ID_ORGANIZACAO),
 constraint GRUPO_PK primary key (ID_GRUPO)
);
create table COORDENA (
 ID_COORDENA number,
 ID_GRUPO number references GRUPO(ID_GRUPO),
 ID_USUARIO number references USUARIO(ID_USUARIO),
 constraint COORDENA_PK primary key (ID_COORDENA)
);
create table REPRESENTA (
 ID_REPRESENTA number,
 ID_ORGANIZACAO number references ORGANIZACAO(ID_ORGANIZACAO),
 ID_VISITANTE number references VISITANTE(ID_VISITANTE),
 constraint REPRESENTA_PK primary key (ID_REPRESENTA)
);
create table PARTICIPA (
 NUM_REGISTRO number,
 ID_GRUPO number references GRUPO(ID_GRUPO),
 ID_USUARIO number references USUARIO(ID_USUARIO),
 constraint PARTICIPA_PK primary key (ID_GRUPO, ID_USUARIO)
);
create table REUNIAO (
 DATA_REUNIAO date,
 HORA_INICIO date,
 HORA_TERMINO date,
 LOCAL_REUNIAO varchar2(100),
 ID_GRUPO number references GRUPO(ID_GRUPO),
 constraint REUNIAO_PK primary key (ID_GRUPO, DATA_REUNIAO, HORA_INICIO)
);
create table COMPARECE (
 ID_GRUPO number references REUNIAO(ID_GRUPO),
 DATA_REUNIAO date references REUNIAO(DATA_REUNIAO),
 HORA_INICIO date references REUNIAO(HORA_INICIO),
 ID_PESSOA number references PESSOA(ID_PESSOA),
 constraint COMPARECE_PK primary key (ID_GRUPO, DATA_REUNIAO, HORA_INICIO,
ID_PESSOA)
);