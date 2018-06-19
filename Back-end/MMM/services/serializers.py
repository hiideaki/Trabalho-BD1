from rest_framework.serializers import ModelSerializer
from .models import *

class SerializerOrganizacao(ModelSerializer):
	class Meta:
		model = Organizacao
		fields = '__all__'

class SerializerPessoa(ModelSerializer):
	class Meta:
		model = Pessoa
		fields = '__all__'
        
class SerializerGrupo(ModelSerializer):
	class Meta:
		model = Grupo
		fields = '__all__'

class SerializerOrganizacao(ModelSerializer):
	class Meta:
		model = Organizacao
		fields = '__all__'

class SerializerCoordena(ModelSerializer):
	class Meta:
		model = Coordena
		fields = '__all__'

class SerializerRepresenta(ModelSerializer):
	class Meta:
		model = Representa
		fields = '__all__'

class SerializerParticipa(ModelSerializer):
	class Meta:
		model = Participa
		fields = '__all__'

class SerializerReuniao(ModelSerializer):
	class Meta:
		model = Reuniao
		fields = '__all__'

class SerializerComparece(ModelSerializer):
	class Meta:
		model = Comparece
		fields = '__all__'

class SerializerUsuario(ModelSerializer):
	class Meta:
		model = Usuario
		fields = '__all__'