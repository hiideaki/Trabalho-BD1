$(document).ready(function() {    
    var user;
    var password;
    var url_base = 'http://localhost:8000';

    $('.login').click(preLogin);
        
    var ref = document.location.href;    
    
    
    function preLogin() {
        user = $('.user').val();
        password = $('.password').val();
        var emptyField = false;
        
        if(user == '') {
            $('.user').addClass('incorrect-field');
            emptyField = true;
        }
        
        if(password == '') {
            $('.password').addClass('incorrect-field');
            emptyField = true;            
        }
        
        if(emptyField) return;

        login(); 
    }
    
    $('input').on('focusout', function() {
        var aux = $(this).val();
        if(aux.length > 0) {
            $(this).removeClass('incorrect-field');
        }
    });
    
    $('input').keypress(function(e) {
        if(e.which === 13) preLogin();
    });
    
    // Create the XHR object.
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
    
    // Make the actual CORS request.
    function login() {
        // This is a sample server that supports CORS.
        var url = url_base + '/login_usuario/' + user + '/' + password;

        var xhr = createCORSRequest('GET', url);
        if(!xhr) {
            alert('CORS not supported');
            return;
        }

        // Response handlers.
        xhr.onload = function() {
            var text = xhr.responseText;
            var obj = jQuery.parseJSON(text);
            if(obj.length > 0) {
                
                document.location.href = 'userspace/home.html?idUser=' + obj[0].id + '&?Pessoa=' + obj[0].pessoa + '&?nomeUser=' + obj[0].nomeUsuario + '&?email=' + obj[0].email;
            } else {
                $('.alert').css('visibility', 'visible');
                $('.alert').css('opacity', '1');
            }

        };

        xhr.onerror = function() {
            alert('Woops, there was an error making the request.' + url);
        };

        xhr.send();
    }
});











