var navTo = (n) => {
    $('body').animate({scrollTop:$('#'+n).offset().top}, 8e2);
}