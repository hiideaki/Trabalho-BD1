$(document).ready(function() {    
    var user;
    var name;
    var email;
    var password;
    var passwordconf;
    
    var url_base = 'http://localhost:8000';
    
    $('input').on('focusout', function() {
        var aux = $(this).val();
        if(aux.length > 0) {
            $(this).removeClass('incorrect-field');
        }
    });
    
    $('input').keypress(function(e) {
        if(e.which === 13) preSignin();
    });
    
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    
    $('.confirm').click(preSignin)
    
    function preSignin() {
        user = $('.user').val();
        name = $('.name').val();
        email = $('.email').val();
        password = $('.password').val();
        passwordconf = $('.passwordconf').val();
        var emptyField = false;
        if(user === '') {
            $('.user').addClass('incorrect-field');
            emptyField = true;
        }
        
        if(email === '') {
            $('.email').addClass('incorrect-field');
            emptyField = true;
        }
        
        if(!isEmail(email)) {
            $('.email').addClass('incorrect-field');
            $('.email').val('')
            emptyField = true;
            $('#al2').css('visibility', 'visible');
            $('#al2').css('opacity', '1');
        }
        
        if(name === '') {
            $('.name').addClass('incorrect-field');
            emptyField = true;
        }
        if(password === '') {
            $('.password').addClass('incorrect-field');
            emptyField = true;
        }
        if(passwordconf === '') {
            $('.passwordconf').addClass('incorrect-field');
            emptyField = true;
        }
        if(password != passwordconf) {
            $('#al1').css('visibility', 'visible');
            $('#al1').css('opacity', '1');
            $('.passwordconf').addClass('incorrect-field');
            $('.passwordconf').val('');
            return;
        }
        if(emptyField) return;
        
        checkExistingPessoa()
        
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
    
    function checkExistingPessoa() {
        var url = url_base + '/buscar_pessoa/' + name;
        var xhr = createCORSRequest('GET', url);
        xhr.onload = function() {
            if(xhr.readyState == 4) {
                var text = xhr.responseText;
                var obj = jQuery.parseJSON(text);
                if(obj.length == 0) {
                    createPessoa();
                }
                checkExistingUsuario();
            }
        };
        
        xhr.send();
    }
    
    function checkExistingUsuario() {
        var url = url_base + '/buscar_usuario/' + name + '/' + password + '/' + email + '/' + user;
        var xhr = createCORSRequest('GET', url);
        xhr.onload = function() {
            if(xhr.readyState == 4) {
                var text = xhr.responseText;
                var obj = jQuery.parseJSON(text);
                if(obj.length > 0) {
                    $('#al3').css('visibility', 'visible');
                    $('#al3').css('opacity', '1');
                    $('.user').val('');
                } else {
                    createUsuario();
                }
            }
        };
        xhr.send();
    }
    
    function createPessoa() {
        var url = url_base + '/cadastrar_pessoa/' + name;

        var xhr = createCORSRequest('POST', url);
        if(!xhr) {
            alert('CORS not supported');
            return;
        }
        xhr.send();
    }
    
    function createUsuario() {
        var url = url_base + '/cadastrar_usuario/' + name + '/' + password + '/' + email + '/' + user;

        var xhr = createCORSRequest('POST', url);
        
        
        xhr.onload = function() {
            var text = xhr.responseText;
            var obj = jQuery.parseJSON(text);
            document.location.href = 'userspace/home.html?idUser=' + obj.id + '&?Pessoa=' + obj.pessoa + '&?nomeUser=' + obj.nomeUsuario + '&?email=' + obj.email;
            

        };
        
        if(!xhr) {
            alert('CORS not supported');
            return;
        }
        xhr.send();
    }
});











