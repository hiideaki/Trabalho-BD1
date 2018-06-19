$(document).ready(function() {
    var top = $(window).scrollTop();
    var windowHeight = $(window).innerHeight();
    var windowWidth = $(window).outerWidth();
    var menuHeight = $('.menu').height();
    
    var ref = document.location.href;    
    var doc = ref.substring(ref.lastIndexOf('/') + 1);
    if(top < windowHeight && doc != 'signin.html' && doc != 'login.html') $('.background-img').css('top', 80 + -top / 2 + 'px');
    
    changeNav();
    
    
    $(window).resize(function() {
        top = $(window).scrollTop();
        windowHeight = $(window).innerHeight();
        windowWidth = $(window).outerWidth();
        changeNav();
    });
    
    $(window).on('scroll', changeNav);
    
    function changeNav() {
        if(doc === 'signin.html' || doc === 'login.html') return;
        top = $(window).scrollTop();
        
        if(top < windowHeight - 80) {
            $('.background-img').css('top', 80 + -top / 2 + 'px');
        }
        
    }
    
    $('.menu-trigger').click(function() {
        $('.ln1').toggleClass('ln1-rotated');
        $('.ln2').toggleClass('ln2-rotated');
        $('.ln3').toggleClass('ln3-rotated');  
        $('.menu').toggleClass('show-menu');
    });
});











