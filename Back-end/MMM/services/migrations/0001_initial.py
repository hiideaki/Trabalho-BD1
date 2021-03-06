# Generated by Django 2.0.6 on 2018-06-14 18:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comparece',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Coordena',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Grupo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomeGrupo', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Organizacao',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomeOrganizacao', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Participa',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registro', models.CharField(max_length=20)),
                ('grupo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='services.Grupo')),
            ],
        ),
        migrations.CreateModel(
            name='Pessoa',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomeCompleto', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Representa',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('organizacao', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='services.Organizacao')),
            ],
        ),
        migrations.CreateModel(
            name='Reuniao',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateField()),
                ('horaInicio', models.TimeField()),
                ('horaTermino', models.TimeField()),
                ('local', models.CharField(max_length=50)),
                ('grupo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.Grupo')),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomeUsuario', models.CharField(max_length=20)),
                ('senha', models.CharField(max_length=40)),
                ('email', models.EmailField(max_length=254)),
                ('pessoa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.Pessoa')),
            ],
        ),
        migrations.CreateModel(
            name='Visitante',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pessoa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.Pessoa')),
            ],
        ),
        migrations.AddField(
            model_name='representa',
            name='visitante',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.Visitante'),
        ),
        migrations.AddField(
            model_name='participa',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.Usuario'),
        ),
        migrations.AddField(
            model_name='grupo',
            name='organizacao',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='services.Organizacao'),
        ),
        migrations.AddField(
            model_name='coordena',
            name='grupo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='services.Grupo'),
        ),
        migrations.AddField(
            model_name='coordena',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.Usuario'),
        ),
        migrations.AddField(
            model_name='comparece',
            name='grupo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='services.Grupo'),
        ),
        migrations.AddField(
            model_name='comparece',
            name='pessoa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.Pessoa'),
        ),
        migrations.AddField(
            model_name='comparece',
            name='reuniao',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='services.Reuniao'),
        ),
        migrations.AlterUniqueTogether(
            name='reuniao',
            unique_together={('data', 'horaInicio')},
        ),
    ]
