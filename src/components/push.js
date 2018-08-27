//push
var goPush = function(){

	var onPushClick = function(e){

		//this element
		var t = $(e.currentTarget);

		//get push container
		var this_push_area = t.closest('.push');

		//form name
		var data_form = t.attr('data-push-form');

		//url to post data
		var data_url = this_push_area.attr('data-push-url');

		//name of current data
		var data_name = t.attr('data-push-name');

		//get id data
		var data_id = t.attr('data-push-id');

		//get resource data
		var data_res = t.attr('data-push-res');

		//get resource data
		var data_toggle = t.attr('data-push-toggle');

		//get data push state
		var data_state = t.attr('data-push-state');

		//set form data
		var data = {};
		var fd = new FormData();

	    //item data
		fd.append('data_name', data_name);
		data['data_name'] = data_name;
		fd.append('data_id', data_id);
		data['data_id'] = data_id;
		fd.append('data_res', data_res);
		data['data_res'] = data_res;
		fd.append('data_state', data_state);
		data['data_state'] = data_state;

		//post
		$.ajax({
			type: 'POST',
			url: data_url,
			data: fd,
	        contentType: false,
	        processData: false,
            dataType : 'json',
            encode : true,
            beforeSend: function(){

            	//remove all errors
            	this_push_area.find('.form_error').remove();

            	//if is toggle item
				if(data_toggle){

					//set state
					if(data_state == 1){
						t.attr('data-push-state',0);
					}else if(data_state == 0){
						t.attr('data-push-state',1);
					}

		        	//set current item to active to avoid delay
		        	if(t.hasClass('selected')){
		        		t.removeClass('selected');
		        	}else{
		        		t.addClass('selected');
		        	}
				}
            }
		}).done(function(data){

			//timer delay for loader
			var load_delay = 1500;

			//animation delay for success and main errors
			var animation_delay = 300;

            if (!data.success) {

				//reset toggle state if error occured
				if(data_toggle){
					if(data_state == 0){
						t.removeClass('selected');
						t.attr('data-push-state',0);
					}else if(data_state == 1){
						t.attr('data-push-state',1);
						t.addClass('selected');
					}
				}

            	//show error
            	if(data.show_error_popup){
            	
	                $('body').prepend('\
	                	<div class="loader" id="loader">\
		                	<div class="loader_container">\
			                	<div class="loader_body">\
				                	<div class="error" id="error">\
				                		<span>An error occured.</span>\
				                	</div>\
			                	</div>\
		                	</div>\
	                	</div>'); 

					//get loader element
					var loader = $('#loader');

	                //select error div
	                var error = $('#error');

	                //animate error in
	                error.css({opacity : 0});
		            error.animate({
		                    'opacity' : 1
		            }, animation_delay);

		            //remove error and loader div with timeout
		            pop_error = setTimeout(function(){

		            	//animate error out
			            error.animate({
			                    'opacity' : 0
			            }, animation_delay);

			            //animate loader out
		        		loader.animate({
		                	'opacity' : 0
		        		}, animation_delay);

		        		//remove error and loader
			            pop_error_rm = setTimeout(function(){
		            		error.remove();
		            		loader.remove();
				        }, animation_delay + 100); //added buffer to make sure

		            }, load_delay);
		        }

            	//show errors
                if (data.errors) {

                	//if you want to show error
                	if (data.show_error) {

                		var head_class = '';
                		if(data.errors.head_error){
                			head_class = ' head_error';
                		}

	                	for (var name in data.errors) {
	                		var err = data.errors[name];
	                        this_push_area.prepend('<div class="form_error'+head_class+'"><span>' + err + '</span></div>');
	                	}
                	}
                }

            } else {
            
            	//if form submits and shows updated text
            	if(data.update_txt){

	                $('body').prepend('\
	                	<div class="loader" id="loader">\
		                	<div class="loader_container">\
			                	<div class="loader_body">\
				                	<div class="success" id="success">\
				                		<span>'+ data.update_txt +'</span>\
				                	</div>\
			                	</div>\
		                	</div>\
	                	</div>'); 

					//get loader element
					var loader = $('#loader');

	                //select success div
	                var success = $('#success');

	                //animate success in
	                success.css({opacity : 0});
		            success.animate({
		                'opacity' : 1
		            }, animation_delay);

		            //remove success and loader div with timeout
		            pop_success = setTimeout(function(){

		            	//animate success out
			            success.animate({
			                'opacity' : 0
			            }, animation_delay);

			            //animate loader out
		        		loader.animate({
		                	'opacity' : 0
		        		}, animation_delay);

		        		//remove success and loader
			            pop_success_rm = setTimeout(function(){
		            		success.remove();
	            			loader.remove();
				        }, animation_delay + 100); //added buffer to make sure

		            }, load_delay);
            	}
            }
		});

		return false;
	}

	//define push click
	var push = function(){
		$('.push_item').unbind('click');
		$('.push_item').click(onPushClick);
	}
	$(document).ready(push);
	$(document).bind('DOMSubtreeModified', push);
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}