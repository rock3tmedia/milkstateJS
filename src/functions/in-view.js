//in view by Ryan Snooks - Jan 2018
function inScrollView(thisY){

	//reset objects
	var inViewObjs = [];

	//get in view objects
	$(".in_view").each(function(i){

		//store
		inViewObjs[i] = $(this);
	});

	//get height of container
	var scrollheight = $('#main-container').outerHeight();

	//for each object
	var i;
	for (i = 0; i < inViewObjs.length; ++i) {

		//get objects offset
	    var objOffset = inViewObjs[i].offset().top;

		//get objects height
	    var objHeight = inViewObjs[i].outerHeight();

	    //get difference from containing div
	    var scrollDif = scrollheight - objOffset;

	    //get data attributes
	    var objHasTarget = false;
	    var objTarget = inViewObjs[i].attr('data-in-view-target');
		if (typeof objTarget !== typeof undefined && objTarget !== false) {
		    objHasTarget = true;
		}

	    //check
	    if (scrollDif > 0 && scrollDif < objHeight + scrollheight){
	    //is in view

	    	//check if view has been active(seen) yet
	    	if(!inViewObjs[i].hasClass('is_active_view')){
	    		inViewObjs[i].addClass('is_active_view');
	    	}

	    	//if in view and does not have class, add class
	    	if(!inViewObjs[i].hasClass('is_in_view')){
	    		inViewObjs[i].addClass('is_in_view');
	    		inViewObjs[i].removeClass('is_not_in_view');

	    		//check for target
	    		if(objHasTarget){
	    			$('#'+objTarget).addClass('is_in_view');
	    			$('#'+objTarget).removeClass('is_not_in_view');
	    		}
	    	}
	    }else{
	    //not in view

	    	//if in view, add class
	    	if(inViewObjs[i].hasClass('is_in_view')){
	    		inViewObjs[i].removeClass('is_in_view');
	    		inViewObjs[i].addClass('is_not_in_view');

	    		//check for target
	    		if(objHasTarget){
	    			$('#'+objTarget).removeClass('is_in_view');
	    			$('#'+objTarget).addClass('is_not_in_view');
	    		}
	    	}
	    }
	}
}