//check devices
$(function() {
    if(jQuery.browser.mobile){
        $('body').addClass('is-mob');
    }else{
        $('body').addClass('is-desk');
    }
});