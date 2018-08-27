//resize window event, because jquery's doesnt work as intended
function resizeWindow(){
    var evt = window.document.createEvent('UIEvents'); 
    evt.initUIEvent('resize', true, false, window, 0); 
    window.dispatchEvent(evt);
}