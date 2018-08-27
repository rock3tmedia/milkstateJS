//remove popblock
function removePopblock(popblock,delay){

    //check delay
    if(delay == undefined){
        delay = 300;
    }

    //animate success out
    popblock.animate({
        'opacity' : 0
    }, delay);

    //set timeout so success state can be viewed
    var pop_rm = setTimeout(function(){

        //remove popblock
        popblock.remove();
    }, delay + 100);
}