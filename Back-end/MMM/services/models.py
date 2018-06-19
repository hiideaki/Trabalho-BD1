from django.db import models
from django import forms
import binascii, os

# Create your models here.
class Organizacao(models.Model):
    nomeOrganizacao = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nomeOrganizacao

class Pessoa(models.Model):
    nomeCompleto = models.CharField(max_length=100)

    def __str__(self):
        return self.nomeCompleto

class Usuario(models.Model):
    nomeUsuario = models.CharField(max_length=20, unique=True)
    senha = models.CharField(max_length=40)
    email = models.EmailField(unique=True)
    pessoa = models.ForeignKey(Pessoa, on_delete=models.CASCADE)

    def __str__(self):
        return self.nomeUsuario

class Grupo(models.Model):
    nomeGrupo = models.CharField(max_length=50, unique=True)
    organizacao = models.ForeignKey(Organizacao, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nomeGrupo} - {self.organizacao}'

class Coordena(models.Model):
    grupo = models.ForeignKey(Grupo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.usuario}: {self.grupo}'

class Representa(models.Model):
    organizacao = models.ForeignKey(Organizacao, on_delete=models.CASCADE)
    pessoa = models.ForeignKey(Pessoa, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.pessoa}: {self.organizacao}'

class Participa(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    grupo = models.ForeignKey(Grupo, on_delete=models.CASCADE)

    def __str__(self):
        return f'Usuario: {self.usuario} | Grupo: {self.grupo}'

class Reuniao(models.Model):
    data = models.DateField()
    horaInicio = models.TimeField()
    horaTermino = models.TimeField()
    local = models.CharField(max_length=50)
    grupo = models.ForeignKey(Grupo, on_delete=models.CASCADE)

    # grupo também deveria entrar no unique_together, não?
    # dois grupos diferentes podem criar reunioes na mesma data e na mesma hora
    class Meta:
        unique_together = (('data', 'horaInicio', 'grupo'),)

    def generate_token():
        return binascii.hexlify(os.urandom(20)).decode()

    qrCode = models.CharField(max_length=20, default=generate_token, editable=False)

    def __str__(self):
        return f'Grupo: {self.grupo} | Data: {self.data} | Inicio: {self.horaInicio} | Termino: {self.horaTermino} | Local: {self.local} | QR: {self.qrCode}'


class Comparece(models.Model):
    reuniao = models.ForeignKey(Reuniao, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    def __str__(self):
        return f'Usuario: {self.usuario} | Reunião: {self.reuniao}'
