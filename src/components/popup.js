var popup_loader_timeout;

//close popup timeouts
function clearPopupTimeouts(){

	//clear timeouts
	if(typeof popup_loader_timeout !== "undefined"){
	  clearTimeout(popup_loader_timeout);
	}
};

//x-close
$(document).on('click', '#close-btn', function(){
	clearPopupTimeouts();

    $("#popblock").remove();
    $('body').removeAttr("style");
    //clearInterval(left_pane_timeout);
    return false;
});

$(function(){
	$(document).on('click', '.popup', function(e){

		//reset
		//resetPopups();

		//first clear timeouts
		clearPopupTimeouts();

		//get data
		var t = $(e.currentTarget);
		var pop_url = t.attr('data-popup-url');
		var pop_data = t.attr('data-popup-id');
		var pop_data_res = t.attr('data-popup-res');
		var pop_data_size = t.attr('data-popup-size');
		var pop_title = t.attr('data-popup-title');
		var pop_toggle = t.attr('data-popup-toggle');
		var pop_fixed = t.attr('data-popup-fixed');

		//set size(width)
		var pop_size = '';
		if(pop_data_size == null){
			pop_size = 'large';
		}else{
			pop_size = pop_data_size;
		}
		
		//remove popup if exists
	    if($("body #popblock").length === 1) {
	        $("body #popblock").remove();
	    }

		//check if there is data to send to the popup
	    var load_url = pop_url +".php";
	    if(pop_data){
	    	load_url = pop_url +".php" + "?data_res=" + pop_data_res + "&data_val=" + pop_data;
	    }
	    
	    //check if popup is fixed
	    var fixed_class = "";
	    if(pop_fixed){
	    	fixed_class = "popblock_fixed";
	    }

	    //set toggle classes for markup
	    var toggle_class = "";
	    if(pop_toggle){
	    	toggle_class = "toggler";
	    }

	    //the popup load
		$("body").append($('<div class="popblock" id="popblock">\
		<div class="popblock_box" id="popblock-box">\
			<div class="poploader_container" id="pop-loader-container">\
				<div class="loader poploader" id="loader"><div class="loader_container"><div class="loader_body"><div class="spinner"></div></div></div></div>\
			</div>\
		</div>\
		<div class="pop_close"><button id="close-btn" class="close_btn"></button></div>').hide().fadeIn(300));

		//load popup views
		var pop_data = "";
		
        $.when($.get(load_url, function(load_data) {
                pop_data = load_data;
            }),
            $.Deferred(function(deferred) {
                $(deferred.resolve);
            })
        ).then(function(){

			//popup title
			var pop_title_content = "";
			if(pop_title){
				pop_title_content = "\
					<div class='popblock_header' id='popblock-header'>\
						<span>\
						"+pop_title+"\
						</span>\
					</div>\
					";
			}

			//check if is a pop toggle
			var final_pop_data = pop_data;
			if(!pop_toggle){
				final_pop_data = "\
				<div class='pop_content' id='pop-content'>\
		        	"+pop_data+"\
				</div>\
				";
			}

		    //the popup view
			$("#popblock-box").html($('<div class="popblock_container" id="popblock-container">\
			<div class="popblock_body '+pop_size+' '+fixed_class+'" id="popblock-body">\
				'+pop_title_content+'\
				<div class="popblock_body_content '+toggle_class+'" id="popblock-body-content">\
			        	'+final_pop_data+'\
				</div>\
			</div>').hide().fadeIn(300));


			//store images
			var pre_pop_imgs = [];

			//get images to preload
			$("[data-pre-img]").each(function(){

				var t = $(this).attr('data-pre-pop-img');

				//check if there is an image and push it to array
				if(t !== null){
					pre_pop_imgs.push(t);
				}

			});

			//use a promise to preload images
			var preload_pop_img = pre_pop_imgs;
			var pop_img_promises = [];

			for (var i = 0; i < preload_pop_img.length; i++) {
			  (function(url, promise) {
					var img = new Image();
					img.onload = function() {
						//console.log(this.src);
						promise.resolve();
					};
					img.src = url;
				})(preload_pop_img[i], pop_img_promises[i] = $.Deferred());
			}
			$.when.apply($, pop_img_promises).done(function() {

				//remove animation loader
				$('#pop-loader-container').remove();

			});

    	}); 

	return false;
	});
});

function resetPopups(){
	$(".popup").off('click');
	$(".popup").click(onAJAXFormClick);
};

//info item hovers
function info_item(){
    $(document).on('click', '.info_item', function(){
        $(this).find('input, textarea').select();
    });
    $(".info_item .input_row input, .info_item .input_row textarea").focus(function(){
        $(this).parent().parent().addClass('selected');
    });
    $(".info_item .input_row input, .info_item .input_row textarea").blur(function(){
        $(this).parent().parent().removeClass('selected');
    });
}
