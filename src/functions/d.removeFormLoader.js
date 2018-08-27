//remove form loader
function removeFormLoader(loader,delay){

    //fade loader out
    loader.animate({
        'opacity' : 0
    }, delay);

    //delay removal to allow animation
    var pop_loader_rm = setTimeout(function(){
        loader.remove();
    }, delay);
}