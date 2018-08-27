//used to prevent anchors from not changing state
function js_hovers(){
    $(".js_hover").each(function(){
        var t = $(this);

        //mouse enter
        t.mouseenter(function() {
           t.addClass('hover');
        }).mouseleave(function() {
           t.removeClass('hover');
        });

        //click
        t.click(function(){
            t.removeClass('hover');
        }); 
    });
};

//input focus
function js_focus(){
    $(".js_focus").each(function(){
        var t = $(this);

        //focus and blur
        t.on('focus', function () {
             t.parent().addClass('focus');
            if(!t.val()){
                t.parent().addClass('active');
            }     
        }).on('blur', function () {
            t.parent().removeClass('focus');
            if(!t.val()){
                t.parent().removeClass('active');
            }     
        });

        //check if already has values(browser auto complete)
        if (t.val().length > 0 || t.is(":-webkit-autofill")) {
            t.parent().addClass('active');
        }
    });
};

//placeholders
function js_placeholders(){
    $(".js_placeholder").each(function(){

        var t = $(this);
        var v = t.attr('placeholder');

        //remove placeholder
        t.removeAttr('placeholder');

        //add label
        t.parent().append('<label><span>'+v+'</span></label>');

    });
};