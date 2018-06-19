$(document).ready(function() {
    var obj = [];
    /*
        obj[0] = ID Usuário
        obj[1] = ID Pessoa
        obj[2] = Nome Usuário
        obj[3] = Email
    */
    var grupos;
    var grupoClicked;
    var grupoObj;
    var reuniaoAtiva;
    var windowHeight = $(window).outerHeight();
    $('html, body').animate({scrollTop: 0}, 400);
    
    $(window).resize(function() {
        windowHeight = $(window).outerHeight();    
    })
    
    var url_base = 'http://localhost:8000';
    
    var data;
    var horaini;
    var horafim;
    var local;
    
    getParam();
    fetchGroups();
    
    // Buscar os parametros na URL e coloca nas variáveis globais
    function getParam() {
        var ref = document.location.href;    
        var doc = ref.substring(ref.lastIndexOf('/') + 1);
        
        var ind
        var param = '';
        for(ind = 0; doc[ind] != '?'; ind++);
        param = doc.substring(ind + 1);
        
        var sParam = param.split('&?');
        for(var i = 0; i < sParam.length; i++) {
            obj[i] = sParam[i].substring(sParam[i].lastIndexOf('=') + 1);
        }
    }
    
    // Coloca o usuário que está logado
    $('.username').text(obj[2]);
    
    // Evento de o usuário clicar nas "caixas" com os grupos
    $('.grupos .sub').on('click', '.grupo', function() {
        $('.horafim').attr('tabindex', '0');
        $('.local').attr('tabindex', '0');
        $('html, body').animate({scrollTop: windowHeight}, 700);
        grupoClicked = Number($(this).attr('name'));
        
        var d = new Date();
        
        var dia = ('0' + d.getDate()).slice(-2);
        var mes = ('0' + (d.getMonth() + 1)).slice(-2);
        var ano = d.getFullYear();
        var horai = ('0' + d.getHours()).slice(-2);
        var mini = ('0' + d.getMinutes()).slice(-2);
        
        $('.data').val(ano + '-' + mes + '-' + dia);
        $('.horaini').val(horai + ':' + mini);
        
        data = $('.data').val();
        horaini = $('.horaini').val();
        
        $('.horafim').attr('tabindex', '0');
        $('.local').attr('tabindex', '0');
        $('.nome-grupo').text(grupos[grupoClicked].nomeGrupo);
        
        checkAtivo(); 
    });
    
    
    // Evento de o usuário clicar no botão de voltar (apenas altera para efeitos visuais)
    $('.voltar').click(function() {
        $('html, body').animate({scrollTop: 0}, 700);
        reuniaoAtiva = null;
        setTimeout(function() {
            $('#qrcode').empty();
            $('#qrcode').css('opacity', '0');
            $('#qrcode').css('visibility', 'hidden');
            $('.subdiv input').attr('tabIndex', -1);
            $('.horafim').removeAttr('readonly');
            $('.local').removeAttr('readonly');
            $('.btnConfirmar').removeAttr('disabled');
            $('.horafim').removeClass('disabled');
            $('.local').removeClass('disabled');
            $('.btnConfirmar').removeClass('disabled');
            $('.alert').css('visibility', 'hidden');
            $('.alert').css('opacity', '0');
            $('.horafim').val('');
            $('.local').val('');
            $('.horafim').removeClass('incorrect-field');
            $('.local').removeClass('incorrect-field');
            $('.btnCancelar').attr('disabled', true);
            $('.btnCancelar').addClass('disabled');
            $('.btnListar').attr('disabled', true);
            $('.btnListar').addClass('disabled');
        }, 700);
    })
    
    
    // Quando o input perde o foco verifica se há algo escrito e retira a classe 'incorrect-field' 
    $('input').on('focusout', function() {
        var aux = $(this).val();
        if(aux.length > 0) {
            $(this).removeClass('incorrect-field');
        }
    });
    
    // Ao apertar enter chama função preReuniao()
    $('.subdiv input').keypress(function(e) {
        if($(this).attr('tabindex') == -1) return;
        if(e.which === 13) preReuniao();
    });
    
    // Associa função ao botão
    $('.btnConfirmar').click(preReuniao);
    
    // Verifica os campos ao criar a reunião e, se tudo estiver ok, cria a reunião de fato
    function preReuniao() {
        horafim = $('.horafim').val();
        local = $('.local').val();
        var emptyField = false;
        if(horafim == '') {
            $('.horafim').addClass('incorrect-field');
            emptyField = true;
        }
        
        if(local == '') {
            $('.local').addClass('incorrect-field');
            emptyField = true;
        }
        if(emptyField) return;
        
        if(horafim < horaini) {
            $('.horafim').addClass('incorrect-field');
            $('.horafim').val('');
            
            return;
        } 
        
        criarReuniao();
    }
    
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    }
    
    // Busca os grupos associados ao usuário logado e cria as "caixas"
    function fetchGroups() {
        var url = url_base + '/buscar_grupos_gerencia/' + obj[2];
        var xhr = createCORSRequest('GET', url);
        xhr.onload = function() {
            if(xhr.readyState == 4) {
                var text = xhr.responseText;
                grupos = jQuery.parseJSON(text);
                for(var i = 0; i < grupos.length; i++) {
                    $('.grupos .sub').append('<div class="grupo" name="' + i + '"><h3>' + grupos[i].nomeGrupo + '</h3></div>')
                }
            }
        };
        
        xhr.send();
    }
    
    // Verifica se o grupo clicado tem uma reunião ativa no momento
    function checkAtivo() {
        var url = url_base + '/procura_reuniao_ativo/' + grupos[grupoClicked].id;
        var xhr = createCORSRequest('GET', url);
        
        xhr.onload = function() {
            var text = xhr.responseText;
            var reuniaoObj = jQuery.parseJSON(text);
            if(reuniaoObj.length > 0) {
                reuniaoAtiva = reuniaoObj[0];
                $('#qrcode').empty();
                new QRCode(document.getElementById("qrcode"), reuniaoObj[0].qrCode);
                $('#qrcode').css('opacity', '1');
                $('#qrcode').css('visibility', 'visible');
                $('.horafim').attr('readonly', 'true');
                $('.local').attr('readonly', 'true');
                $('.btnConfirmar').attr('disabled', 'true');
                $('.horafim').addClass('disabled');
                $('.local').addClass('disabled');
                $('.btnConfirmar').addClass('disabled');
                $('.alert').css('visibility', 'visible');
                $('.alert').css('opacity', '1');
                $('.horafim').attr('tabindex', '-1');
                $('.local').attr('tabindex', '-1');

                $('.data').val(reuniaoObj[0].data);
                $('.horaini').val(reuniaoObj[0].horaInicio);
                $('.horafim').val(reuniaoObj[0].horaTermino);
                $('.local').val(reuniaoObj[0].local);
                $('.horafim').removeClass('incorrect-field');
                $('.local').removeClass('incorrect-field');
                $('.btnCancelar').removeAttr('disabled');
                $('.btnCancelar').removeClass('disabled');
                $('.btnListar').removeAttr('disabled');
                $('.btnListar').removeClass('disabled');
            }
            
        };
        
        xhr.send();
    }
    
    // Cria a reunião e atualiza o visual
    function criarReuniao() {
        var url = url_base + '/insere_reuniao/' + grupos[grupoClicked].id + '/' + data + '/' + horaini + '/' + horafim + '/' + local;

        var xhr = createCORSRequest('POST', url);
        
        xhr.onload = function() {
            var text = xhr.responseText;
            var reuniaoAux = jQuery.parseJSON(text);
            reuniaoAtiva = reuniaoAux;
            
            $('#qrcode').empty();
            new QRCode(document.getElementById("qrcode"), reuniaoAux.qrCode);
            $('#qrcode').css('opacity', '1');
            $('#qrcode').css('visibility', 'visible');
            $('.horafim').attr('readonly', 'true');
            $('.local').attr('readonly', 'true');
            $('.btnConfirmar').attr('disabled', 'true');
            $('.horafim').addClass('disabled');
            $('.local').addClass('disabled');
            $('.btnConfirmar').addClass('disabled');
            $('.alert').css('visibility', 'visible');
            $('.alert').css('opacity', '1');
            $('.horafim').attr('tabindex', '-1');
            $('.local').attr('tabindex', '-1');
            $('.btnCancelar').removeAttr('disabled');
            $('.btnCancelar').removeClass('disabled');
            $('.btnListar').removeAttr('disabled');
            $('.btnListar').removeClass('disabled');
        }
        
        
        if(!xhr) {
            alert('CORS not supported');
            return;
        }
        xhr.send();
    }
    
    $('.btnCancelar').click(cancelarReuniao);
    
    function cancelarReuniao() {
        var temp = reuniaoAtiva.id;
        var url = url_base + '/deleta_reuniao/' + reuniaoAtiva.id;
        var xhr = createCORSRequest('POST', url);
        
        xhr.onload = function() {
            // apos deletar
            location.reload();
        }
        if(!xhr) {
            alert('CORS not supported');
            return;
        }
        xhr.send();
    }
    
    $('.adicionar').click(function() {
        $('.overlay1').css('visibility', 'visible');
        $('.overlay1').css('opacity', '1');
        $('.ngrupo').val('');
        $('.norganizacao').val('');
        $('.ngrupo').removeClass('incorrect-field');
        $('.norganizacao').removeClass('incorrect-field');
    });
    
    $('.overlay1').on('click', function(e) {
        if(e.target !== this)
            return;

        $('.overlay1').css('visibility', 'hidden');
        $('.overlay1').css('opacity', '0');
    });
    
    $('.novo-grupo input').keypress(function(e) {
        if(e.which === 13) preNovoGrupo();
    });
    
    
    $('.criargrupo').click(preNovoGrupo)
    
    var ngrupo;
    var norganizacao;
    var idOrganizacao;
    var idGrupo;
    
    function preNovoGrupo() {
        ngrupo = $('.ngrupo').val();
        norganizacao = $('.norganizacao').val();
        var emptyField = false;
        
        if(ngrupo == '') {
            $('.ngrupo').addClass('incorrect-field');
            emptyField = true;
        }
        
        if(norganizacao == '') {
            $('.norganizacao').addClass('incorrect-field');
            emptyField = true;
        }
        
        if(emptyField) return;
        
        checkOrganizacao();
                
    }
    
    function checkOrganizacao() {
        var url = url_base + '/procura_organizacao_nome/' + norganizacao;
        var xhr = createCORSRequest('GET', url);
        
        xhr.onload = function() {
            var text = xhr.responseText;
            orgObj = jQuery.parseJSON(text);
            if(orgObj.length == 0) {
                criaOrganizacao();
            } else {
                idOrganizacao = orgObj[0].id;
                checkGrupo();
            }
            
        };
        
        xhr.send();
    }
    
    function criaOrganizacao() {
        var url = url_base + '/insere_organizacao/' + norganizacao;

        var xhr = createCORSRequest('POST', url);
        
        xhr.onload = function() {
            var text = xhr.responseText;
            var orgAux = jQuery.parseJSON(text);
            idOrganizacao = orgAux.id;
            checkGrupo();
        }
        
        if(!xhr) {
            alert('CORS not supported');
            return;
        }
        xhr.send();
    }
    
    function checkGrupo() {
        var url = url_base + '/procura_grupo_nome/' + ngrupo;
        var xhr = createCORSRequest('GET', url);
        
        xhr.onload = function() {
            var text = xhr.responseText;
            var grupoAux = jQuery.parseJSON(text);
            if(grupoAux.length == 0) {
                criaGrupo();
            }
            
        };
        
        xhr.send();
    }
    
    function criaGrupo() {
        var url = url_base + '/insere_grupo/' + ngrupo + '/' + idOrganizacao;

        var xhr = createCORSRequest('POST', url);
        
        xhr.onload = function() {
            var text = xhr.responseText;
            var orgAux = jQuery.parseJSON(text);
            idGrupo = orgAux.id;
            criaCoordena();
        }
        
        if(!xhr) {
            alert('CORS not supported');
            return;
        }
        xhr.send();
    }
    
    function criaCoordena() {
        var url = url_base + '/insere_coordena/' + obj[0] + '/' + idGrupo;

        var xhr = createCORSRequest('POST', url);
        
        xhr.onload = function() {
            var text = xhr.responseText;
            var orgAux = jQuery.parseJSON(text);
            location.reload();
        }
        
        if(!xhr) {
            alert('CORS not supported');
            return;
        }
        xhr.send();
        
    }
    
    $('.btnListar').click(listaComparece);
    
    function listaComparece() {
        var url = url_base + '/buscar_comparece_reuniao/' + reuniaoAtiva.id;
        var xhr = createCORSRequest('GET', url);
        
        xhr.onload = function() {
            var text = xhr.responseText;
            var listaPresenca = jQuery.parseJSON(text);
            $('table').empty();
            $('table').append('<tr><th>ID</th><th>Nome</th</tr>');
            for(var i = 0; i < listaPresenca.length; i++) {
                $('table').append('<tr><td>' + listaPresenca[i].id + '</td><td>' + listaPresenca[i].nomeUsuario + '</td></tr>')
            }
            
        };
        
        xhr.send();
    }
    
    $('.btnListar').click(function() {
        $('.overlay2').css('visibility', 'visible');
        $('.overlay2').css('opacity', '1');
    });
    
    $('.overlay2').on('click', function(e) {
        if(e.target !== this)
            return;

        $('.overlay2').css('visibility', 'hidden');
        $('.overlay2').css('opacity', '0');
    });
    
});











