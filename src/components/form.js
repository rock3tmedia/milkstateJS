//forms
var runForms = function(){

	//on submit
	var onAJAXFormClick = function(e){

		//this element
		var t = $(e.currentTarget);

		//this form name
		var form = t.attr('data-form');

		//check for loader
		var data_loader = t.attr('data-form-loader');
		if(data_loader == 'hidden'){
			data_loader = false;
		}else{
			data_loader = true;
		}

		//check for loader
		var data_loader_target = t.attr('data-form-loader-target');
		if(data_loader_target == undefined){
			data_loader_target = 'body';
		}

	    //get form area
	    var form_area = t.closest('.form_area');

		//ajax form data
		var data = {};
		var fd = new FormData();

		var error = "";

		//form val
		var form_data_val = t.closest('form').attr('form-data');
	    if (form_data_val){
			fd.append('form-data-val', form_data_val);
			data['form-data-val'] = form_data_val;
	    }
	    
		//form response val
		var form_data_res = t.closest('form').attr('form-data-res');
	    if (form_data_res){
			fd.append('form-data-res', form_data_res);
			data['form-data-res'] = form_data_res;
	    }

	    $('.ajax[data-form="'+form+'"]').each(function(){
	    	var t = $(this);
    		if(t.attr('type') == "checkbox"){
    			if(t.prop('checked')){             
    				fd.append(t.attr('data-name'), true);
					data[t.attr('data-name')] = true;
    			}
    		}else if(t.attr('type') == "radio"){
    			if(t.prop('checked')){             
    				fd.append(t.attr('data-name'), this.value);
					data[t.attr('data-name')] = this.value;
    			}
    		}
    		else if(t.attr('type') == "file"){
    			var maxSize = '1024' * 10000;
        		if(t.get(0).files.length){	
	    			if(maxSize){
			            var fileSize = t.get(0).files[0].size; // in bytes
			            if(fileSize>maxSize){
			            	error = 'Filesize exceeds the maximum of ' + maxSize / 1024 + ' KB';
			            }

	    			}        

					fd.append(t.attr('data-name'), t.get(0).files[0]);
	    		}
    		}
    		//else if(t.attr('type') == "captcha"){
				//fd.append(t.attr('data-name'), t.attr('name'));
				//data[t.attr('data-name')] = t.attr('name');
    		//}
    		else
    		{
				fd.append(t.attr('data-name'), this.value);
				data[t.attr('data-name')] = this.value;
    		}
	    });

	    if(error.length > 0){
	    	alert(error);
	    	return;
	    }

	    //store data
		fd.append("form", form);
		data["form"] = form;

		//disable submit
	    t.prop('disabled', true);

    	//clear timeouts
		if(typeof pop_loader !== "undefined"){
		  clearTimeout(pop_loader);
		}
		if(typeof pop_error !== "undefined"){
		  clearTimeout(pop_error);
		}
		if(typeof pop_error_rm !== "undefined"){
		  clearTimeout(pop_error_rm);
		}
		if(typeof pop_update !== "undefined"){
		  clearTimeout(pop_update);
		}
		if(typeof pop_update_rm !== "undefined"){
		  clearTimeout(pop_update_rm);
		}
		if(typeof pop_success !== "undefined"){
		  clearTimeout(pop_success);
		}
		if(typeof pop_success_rm !== "undefined"){
		  clearTimeout(pop_success_rm);
		}

		//timer delay for loader
		var load_delay = 300;

		$.ajax({
			type: 'POST',
			//dataType: 'html',
			url: t.attr('data-url'),
			data: fd,
	        contentType: false,
	        processData: false,
            dataType : 'json',
            encode : true,
        	//cache: false,
        	//async: true,
            beforeSend: function(){

            	//remove main error notice
            	$('#error').remove();

            	//remove form errors
            	form_area.find('.input_row').removeClass('has_error');
            	form_area.find('.form_error').remove();

            	//show loader
    			if(data_loader == true){
	                $(data_loader_target).prepend(app.form_loader); 
				}
            },
			error: function(err){
				console.log(err)
			}	
		}).done(function(data){

			//get loader element
			var loader = $('#form-loader');

			//if errors
            if(!data.success){

            	//check for loader
            	if(data_loader == true){

		            //animate loader out
	        		loader.find('.spinner').animate({
	                	'opacity' : 0
	        		}, load_delay);

	        		//delay removal to allow animation
		            pop_loader = setTimeout(function(){

		            	//remove loader if there is no error text
		            	if(!data.error_txt){
							
							//remove
							removeFormLoader(loader,load_delay);
		            	}
					}, load_delay);
				}

				//show error in loader div
				if (data.error_txt) {

					//show success text in loader div
	                $('body').prepend('<div class="error" id="error">\
		                	<span>\
		                		<span>'+ data.error_txt +'</span>\
							</span>\
	                	</div>');

	                //select error div
	                var error = $('#error');

	                //animate error in
	                error.css({opacity : 0});
		            error.animate({
		                    'opacity' : 1
		            }, load_delay);

		            //remove error and loader div with timeout
		            pop_error = setTimeout(function(){

		            	//animate error out
			            error.animate({
			                    'opacity' : 0
			            }, load_delay);

		        		//remove error
			            pop_error_rm = setTimeout(function(){
		            		error.remove();

		            		//remove loader if it exists
		            		if(data_loader == true){
	            				removeFormLoader(loader,load_delay);
		            		}
				        }, load_delay); //added buffer to make sure

		            }, load_delay + 1000);
		        }

            	//show form errors
                if (data.errors) {
                	for (var name in data.errors) {

                		//error name
                		var err = data.errors[name];

                		//error object
                		var obj = $('.ajax[data-form="'+form+'"][data-name="'+name+'"]');
                		
                		//error target area
                		if(obj.attr('data-error-target')){
                			obj = $(obj.attr('data-error-target'));
                		}

                		//if has a head error (main error), show this only
	                	if (data.errors.head_error){
							$(form_area.prepend('<div class="form_error"><span>' + err + '</span></div>')).hide().fadeIn();
	                	}else{
	                		//all other errors
	         				obj.find('.input_row').addClass('has_error');
	                        obj.append('<div class="form_error"><span>' + err + '</span></div>');
	                	}
                	}
                }

	            //fade in errors
	            form_area.find('.form_error').hide().fadeIn();

	            //resize window to accommadate new data(used for iscrolls in this case)
	            resizeWindow();

            } else {

				//if form submits and shows updated text
            	if(data.update_txt){

					//show success text in loader div
	                $('body').prepend('<div class="success" id="success">\
		                	<span>\
		                		<span>'+ data.update_txt +'</span>\
							</span>\
	                	</div>');

	                //select success div
	                var success = $('#success');

	                //animate success in
	                success.css({opacity : 0});
		            success.animate({
		                'opacity' : 1
		            }, load_delay);

		            //remove success and loader div with timeout
		            pop_update = setTimeout(function(){

		            	//animate success out
			            success.animate({
			                'opacity' : 0
			            }, load_delay);

		        		//remove success and loader
			            pop_update_rm = setTimeout(function(){
		            		success.remove();
				        }, load_delay); //added buffer to make sure

		            }, load_delay + 1000);
            	}

            	//remove loader
            	if(data.remove_loader){

            		//check for loader
            		if(data_loader == true){
	            		
	            		//remove loader
	            		removeFormLoader(loader,load_delay);
			        }
            	}

            	//remove popup
            	if(data.remove_popup){

            		//get popblock
            		var popblock = $('#popblock');

            		//remove
            		removePopblock(popblock,load_delay);
            	}

                //adding live data
                if(data.live_update){

                	//get live data amount
                	var live_data_amount = 0;
                	if(data.live_data_amount){
                		live_data_amount = data.live_data_amount;
                	}

                	//clear content of incoming data
                	if(data.clear_content){

	                	//get id's
	                	var live_target_id = data.live_target_id;

	                	//remove item
	                	$("#"+live_target_id).empty();
                	}

                	//update a value
                	if(data.live_values){
                		
                		//itterate over items
                		$.each(data.live_values, function(i, item) {
                			var live_val_id = item['id'];
                			var live_val = item['value'];

                			//set value
                			$("#"+live_val_id).val(live_val);
            			});
                	}

                	//if there is an amount to update
                	if(data.update_amount){

	                	//live data amount
	                	var live_amount_id = data.live_amount_id;

	                	//get current scene count
	                	var live_count = parseInt($("#"+live_amount_id).html(), 10);

	                	//update scene count
	                	if(data.live_remove){
	                		$("#"+live_amount_id).html(live_count - 1);
	                	}else{
	                		$("#"+live_amount_id).html(live_count + 1);
	                	}
                	}

	                //if there is data to remove
	                if(data.live_remove){

	                	//get id's
	                	var live_target_id = data.live_target_id;
	                	var live_remove_id = data.live_remove_id;
	                	var live_content_id = data.live_content_id;

	                	//remove item
	                	$("#"+live_target_id).find('[data-item-id="' + live_remove_id + '"]').remove();

	                	//check if data is now empty and place in empty content
	                	if ($('#'+live_target_id).children().length == 0){
	                		$("#"+live_content_id).append(""+data.empty_content+"");
	                	}
	                }

                	//if content is to be added
                	if(data.update_content && !data.live_remove){

	                	//id's to place in data with
	                	var live_target_id = data.live_target_id;
	                	var live_content_id = data.live_content_id;

                		//check if content is empty first
		                if($("#"+live_content_id+" .no_content").length == 1){

		                	//remove containing html
		                    $("#"+live_content_id).empty();

		                    //if there is pre data to place in
		                    if(data.live_pre_data){
		                    	$("#"+live_content_id).append(data.live_pre_data);
		                    }
		                }

		                //add content
	                	$("#"+live_target_id).append($(data.live_data).hide().fadeIn(800));
                	}

                	//if title is to be updated
                	if(data.update_title){

                		//get title id
                		var live_title_id = data.live_title_id;

	                	//get current scene count
	                	var live_count = parseInt($("#"+live_amount_id).html(), 10);

	                	//set info
	                	var live_title = $("#"+live_title_id).html();

	                	//get last letter of scene title
	                	var live_title_char = live_title.charAt(live_title.length - 1);

	                	//fix plural for items
						if(live_count !== 1){

							//if doesnt have plural and should
							if(live_title_char != 's'){
								$("#"+live_title_id).append('s');
							}
						}else{

							//if equals one and has plural
							if(live_title_char == 's'){
								var new_title = live_title.substring(0, live_title.length - 1);
								$("#"+live_title_id).html(new_title);
							}
						}
                	}
                }

            	//if and where do we send the page. i.e. login
                if(data.push_view){
					setState(data.section, data.push_view);
                }

                //reload current location (full browser refresh)
                if(data.reload){
                	location.reload(true);
                }

                //load view
                if(data.load_view){

                	var init_data = {
                		win_loc: app.win_loc,
                		view_type: "all",
                		load_type: "form"
                	};

                	msJS(init_data);
                }

                //script control
                //
                //cases.js
                if(data.cases){
                	$("#"+data.case_target).cases({'itemMaxWidth': data.case_width,'itemMaxHeight': data.case_height});
            	}

                //iscroll main window - iscroll-probe.js
                if(data.main_iscroll){
                	mainScrollbar(); // in app-start.js
                }

                //jCrop - image cropper
                if(data.jcrop){

                	//vars
                	var jcrop_id = data.jcrop_id;
                	var jcrop_w = data.jcrop_width;
                	var jcrop_h = data.jcrop_height;
                	var jcrop_ratio_w = data.jcrop_ratio_w;
                	var jcrop_ratio_h = data.jcrop_ratio_h;

                	//initialize
		            $('#'+jcrop_id).Jcrop({
                        bgColor:     'black',
                        bgOpacity:   .4,
                        setSelect:   [ jcrop_w, jcrop_h, 0, 0 ],
                        aspectRatio: jcrop_ratio_w / jcrop_ratio_h,
                        onSelect: updateCoords,
                        keySupport: false
		            });

					//update coordinates for jcrop
					function updateCoords(c)
					{
						$(form_area).find('#x').val(c.x);
						$(form_area).find('#y').val(c.y);
						$(form_area).find('#w').val(c.w);
						$(form_area).find('#h').val(c.h);
					};
                }
            }

            //enable submit
	    	t.prop('disabled', false);
		});

		return false;
	}

	var instantiate = function(){
		$( "button.ajax" ).unbind('click');
		$( "button.ajax" ).click(onAJAXFormClick);
		$( 'input.ajax[type="submit"]' ).unbind('click');
		$( 'input.ajax[type="submit"]' ).click(onAJAXFormClick);
	}
	$(document).ready(instantiate);
	$(document).bind('DOMSubtreeModified', instantiate);
};