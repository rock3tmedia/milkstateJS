//convert youtube time
function convert_time(duration) {
    var a = duration.match(/\d+/g);
    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
        a = [0, a[0], 0];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
        a = [a[0], 0, a[1]];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
        a = [a[0], 0, 0];
    }
    duration = 0;
    if (a.length == 3) {
        duration = duration + parseInt(a[0]) * 3600;
        duration = duration + parseInt(a[1]) * 60;
        duration = duration + parseInt(a[2]);
    }
    if (a.length == 2) {
        duration = duration + parseInt(a[0]) * 60;
        duration = duration + parseInt(a[1]);
    }
    if (a.length == 1) {
        duration = duration + parseInt(a[0]);
    }
    var h = Math.floor(duration / 3600);
    var m = Math.floor(duration % 3600 / 60);
    var s = Math.floor(duration % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
};//check devices
$(function() {
    if(jQuery.browser.mobile){
        $('body').addClass('is-mob');
    }else{
        $('body').addClass('is-desk');
    }
});;function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
};//gets an object by using a string
// jshint ignore: start
function getObjByValue(path, origin) {
    if (origin === void 0 || origin === null) origin = self ? self : this;
    if (typeof path !== 'string') path = '' + path;
    var c, pc, i = 0, n = path.length, name = '', q;
    while (i<=n)
        ((c = path[i++]) == '.' || c == '[' || c == ']' || c == "'" || c == '"' || c == void 0) ? (c==q&&path[i]==']'?q='':q?name+=c:name?(origin?origin=origin[name]:i=n+2,name='') : (pc=='['&&(c=='"'||c=="'")?q=c:pc=='.'||pc=='['||pc==']'&&c==']'||pc=='"'||pc=="'"?i=n+2:void 0), pc=c) : name += c;
    if (i==n+2 || name) throw "Invalid path: "+path;
    return origin;
};//if value is in array
function isInArray(value, array) {

	//check if array exists
	if(array !== undefined){
	  return array.indexOf(value) > -1;
	}
};//check if string is in string
function startsWith(str, word) {
    return str.lastIndexOf(word, 0) === 0;
};//this script loads the style sheets using a deferred promise
var preloadAssets = function (css,js,img,states) {

    //check if state is section
    var class_type = "";
    if(states != undefined && states.view_type == 'section'){
        class_type = 'sec';
    }

    //star asset loading
    var loadAssets = (function() {

        //loading function
        function _load(tag) {

            //data to return to promise array
            return function(data) {

                //each file
                $.each(data, function(i, item) {

                    //get url for item
                    var url = item;

                    var element = "";

                    // This promise will be used by Promise.all to determine success or failure
                    return new Promise(function(resolve, reject) {

                        //create assets
                        switch(tag) {
                            case 'img':
                            element = new Image();
                            break;
                            case 'script':
                            element = document.createElement(tag);
                            break;
                            case 'link':
                            element = document.createElement(tag);
                            break;
                        }
                        
                        //attr
                        var parent = 'body';
                        var attr = 'src';

                        // Important success and error for the promise
                        element.onload = function() {
                            resolve(url);
                        };
                        element.onerror = function() {
                            reject(url);
                        };

                        //define
                        switch(tag) {
                            case 'script':
                            element.type = 'text/javascript';
                            element.className = "pre_jsxrq"+class_type+"";
                            //element.async = true;
                            break;
                            case 'link':
                            element.type = 'text/css';
                            element.rel = 'stylesheet';
                            element.className = 'pre_cssxrq';
                            attr = 'href';
                            parent = 'head';
                            break;
                        }

                        //update url
                        element[attr] = url;

                        //define asset head
                        var asset_head = "";

                        //create assets
                        switch(tag) {
                            case 'script':
                            //send to iframe to start loading
                            //asset_head = window.frames["asset-loader"].document.getElementsByTagName("HEAD")[0];         
                            
                            asset_head = document.getElementsByTagName("HEAD")[0];
                            asset_head.appendChild(element);
                            break;
                            case 'link':
                            //send to iframe to start loading
                            asset_head = window.frames["asset-loader"].document.getElementsByTagName("HEAD")[0];         
                            asset_head.appendChild(element);
                            break;
                        }
                    });
                });
            };
        }
      
        //set types
        return {
            css: _load('link'),
            js: _load('script'),
            img: _load('img')
        };
    })();

    //load file types
    Promise.all([
        loadAssets.js(js), 
        loadAssets.css(css),
        loadAssets.img(img)
    ]).then(function() {
        //console.log('Assets Loaded');
    }).catch(function() {
        //console.log('Error loading assets.');
    });
};;//remove form loader
function removeFormLoader(loader,delay){

    //fade loader out
    loader.animate({
        'opacity' : 0
    }, delay);

    //delay removal to allow animation
    var pop_loader_rm = setTimeout(function(){
        loader.remove();
    }, delay);
};//remove popblock
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
};//resize window event, because jquery's doesnt work as intended
function resizeWindow(){
    var evt = window.document.createEvent('UIEvents'); 
    evt.initUIEvent('resize', true, false, window, 0); 
    window.dispatchEvent(evt);
};//in view by Ryan Snooks - Jan 2018
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
};//start
/*jshint sub:true*/
var msJS = function(init_data){

    //app data
    app = {
        app_name: "",
        json_views: "",
        win_loc: "",
        addToApp: function() {

            //check for app name
            if(init_data.app_name == undefined){
                app.app_name = "milkstateApp";
            }else{
                app.app_name = init_data.app_name;
            }

            //check for app name
            if(init_data.views == undefined){
                app.json_views = "views/views.json";
            }else{
                app.json_views = init_data.json_views;
            }

            //check if win_loc is defined or not
            if(init_data.win_loc == undefined){
                app.win_loc = window.location.pathname.replace(/^\/|\/$/g, '');
            }else{
                app.win_loc = init_data.win_loc;
            }
        },
        view_loc: "",
        app_idle: true,
        initial_load: true,
        views: [],
        menu_data: [], //stores menu data pertaining to view
        section_states: [], //store current view section, excluded url data vals
        loader_section_target: "#view-section-container", //default appended loader location
        view_section_target: "#view-section-content", //default section target
        template: "",
        view_loader: "",
        form_loader: "",
        html_loaded: false
    };

    //add data to app
    app.addToApp();

    //store onpop.window states
    var pop_states = {
        view_links: [],
        view_types: [],
        view_targets: [],
        current_pop_count: 0,
        active_pop_count: 0
    };

    view_state = {
        view_link: app.win_loc,
        view_loc: "",
        view_type: "",
        load_type: "",
        addToState: function() { 

            //check if win_loc is defined or not and set defaults
            if(init_data.load_type == undefined){
                view_state.load_type = "view";
            }else{
                view_state.load_type = init_data.load_type;
            }

            //check if win_loc is defined or not and set defaults
            if(init_data.view_type == undefined){
                view_state.view_type = "all";
            }else{
                view_state.view_type = init_data.view_type;
            }
        },
        loader_target: "body",
        view_target: "body",
        view_data_vals: [], //store current data values
        view_data_loc: [], //stores current view location and data values(not sections)
        url_data: [], //url data stored
        url_data_count: 0, //amount of data including sections and discluding view
        post_url_data_count: 0, //amount of data values only
        push_state: false,
        pop_state: false,
        forced_content: false
    };

    //add data to app
    view_state.addToState();

    //store view scroll
    mainScroll = null;

    //store view loader timeout
    var loader_timeout;

    //set template dir
    var temp_dir = init_data.base_url + "templates/";

    //get templates then run app
    $.when($.get(temp_dir + 'app.view.htm'),
        $.get(temp_dir + 'app.view-loader.htm'),
        $.get(temp_dir + 'app.form-loader.htm')
    ).then(function(vt,vl,fl) {

        //set templates
        app.template = vt[0];
        app.view_loader = vl[0];
        app.form_loader = fl[0];

        //start app
        runApp();
    });

    //history state control
    function runApp(states){

        //get states
        var cur_states = {};
        if(states == undefined || states == null){
            cur_states = view_state;
        }else{
            cur_states = states;
        }

        //set default load type - load types: view, form
        if(cur_states.load_type == undefined){
            cur_states.load_type = "view";
        }

        //set default view type - view types: all, content, section
        if(cur_states.view_type == undefined){
            cur_states.view_type = "content";
        }

        //set default view type
        if(cur_states.loader_target == undefined){
            cur_states.loader_target = "body";
        }

        //set default view type
        if(cur_states.view_target == undefined){
            cur_states.view_target = "body";
        }

        //put data into an array
        var init_url_data = cur_states.view_link.split('/');

        //get first location(directory)
        var init_first_loc = init_url_data[0];

        //set default view if empty
        if(init_first_loc == app.app_name){

            //remove first data
            init_url_data.shift();

            //join back to create url
            cur_states.view_link = init_url_data.join('/');
        }

        //if not initial load - view_data_loc is undefined otherwise
        //template data has also already been loaded
        if(app.initial_load == false){

            //check if current location is in view link
            var checkLoc = startsWith(cur_states.view_link, view_state.view_data_loc);

            //check location
            if(checkLoc){

                //if the next data location is in the entire link - type must be a section
                cur_states.loader_target = app.loader_section_target;
                cur_states.view_target = app.view_section_target;
                cur_states.view_type = "section";
            }else{

                //otherwise type is content because it is a different view
                cur_states.loader_target = "body";
                cur_states.view_target = "body";
                cur_states.view_type = "content";
            }
        }

        //check to see if content has to be forced or not
        if(cur_states.view_type == "content" && !app.app_idle || cur_states.view_type == "all" && !app.app_idle){
            view_state.forced_content = true;
        }

        //if forced content
        if(view_state.forced_content == true){
            cur_states.view_target = "body";

            //check if html has loaded
            if(app.html_loaded == true){
                cur_states.view_type = "content";
            }else{
               cur_states.view_type = "all";
            }
        }

        //reset html loaded
        if(cur_states.view_type == "all"){
            app.html_loaded = false;
        }

        //increase popstate
        pop_states.current_pop_count++;

        //run loader
        loaderAni(cur_states);

        //check state to push
        if(cur_states.push_state == true){

            //push url state (for links)
            if(app.win_loc != cur_states.view_link){
                window.history.pushState({selector: cur_states.view_link, target: cur_states.view_target, type: cur_states.view_type}, cur_states.view_link, cur_states.view_link);
            }
        }else{

            //replace if not a popstate (for initial load)
            if(!cur_states.pop_state){
                window.history.replaceState({selector: cur_states.view_link, target: cur_states.view_target, type: cur_states.view_type}, cur_states.view_link, cur_states.view_link);
            }
        }

        //set app location to current view
        app.win_loc = cur_states.view_link;

        //push new current states
        pushPopStates(cur_states);

        //if app is idle, run
        if(app.app_idle == true){

            //set idle to false - app is now running
            app.app_idle = false;

            //increase active popstate count - used to compare stored pop counts later
            pop_states.active_pop_count++;

            //load asset loader (iframe)
            assetLoader(true);

            //load the url data - api, view data(json), data location and full url data
            loadViewUrlData(cur_states).then(function(url_obj) {

                //run view from state
                load_view(url_obj);
            });
        }
    }

    //push states to obj
    function pushPopStates(cur_states){
        pop_states.view_links.push(cur_states.view_link);
        pop_states.view_types.push(cur_states.view_type);
        pop_states.view_targets.push(cur_states.view_target);
    }

    function assetLoader(run){

        //load or remove
        if(run == true){

            //if loader exists, remove.
            if($('#asset-loader').length){
                $('#asset-loader').remove();
            }

            //add
            $('<iframe>')
            .attr('src','templates/asset-loader.php')
            .attr('height',0)
            .attr('width',0)
            .attr('border',0)
            .attr('border','none')
            .attr('id','asset-loader')
            .attr('name','asset-loader')
            .prependTo('body');
        }else{
            $('#asset-loader').remove();
        }
    }

    //star load view url data
    function loadViewUrlData(cur_states){

        //get url data
        var urlDatax = urlData(cur_states.view_link);
        cur_states.url_data = urlDatax.url_data;
        cur_states.url_data_count = urlDatax.url_data_count;
        cur_states.view_loc = urlDatax.view_location;

        //clear views
        app.views = [];

        //clear data values
        cur_states.view_data_vals = [];

        //set view data location
        var cur_view_data_loc = "";

        //the data url used
        var data_url = "";

        //for error
        var load_view_error = false;

        //get api info
        return $.getJSON('api/@api.php').then(function(rq_api_data){

            var api_data = rq_api_data[0];

            //get views
            return $.getJSON(app.json_views).then(function(rq_json_data){

                //set json
                var json_data = rq_json_data;

                //get page(view) names from json data
                $.each(json_data, function(i, item){
                    var view = i;

                    //add view to views array
                    app.views.push(view);
                });

                //check if view exists
                if(isInArray(cur_states.view_loc,app.views)){

                    //set the views data location
                    var view_loc = cur_states.view_loc;

                    //get url data
                    var post_url_data = [];
                    if(json_data[view_loc][0]['url_data']){
                        post_url_data = json_data[view_loc][0]['url_data'];
                    }

                    //set the views data location
                    cur_view_data_loc = view_loc;

                    //get length of url data
                    cur_states.post_url_data_count = post_url_data.length;

                    //store amount of data being procesesed
                    var data_count = 0;

                    //for each url data
                    $.each(post_url_data, function(i, item) {

                        //get data name and val
                        var url_data_name = item;
                        var url_data_val = cur_states.url_data[data_count];

                        //if data, merge to url
                        if(data_count == 0){

                           //first data
                            data_url += url_data_name +"="+ url_data_val;

                        }else{
                            //next data, add ampersand for url
                            data_url += "&"+ url_data_name +"="+ url_data_val;
                        }

                        //set view data location
                        cur_view_data_loc += "/"+ url_data_val;

                        //store data vals
                        cur_states.view_data_vals.push(url_data_val);

                        //increase count
                        data_count++;
                    });

                    //request api key if there is data and add to url
                    if(data_count){
                        data_url += "&" + "dev_id" + "=" + api_data['dev_id'];
                        data_url += "&" + "dev_key" + "=" + api_data['dev_key'];
                    }
                }else{

                    //view does not exist
                    load_view_error = true;
                }

                //check for errors
                if(!load_view_error){

                    //store url object data
                    var data = {
                        api_data: api_data,
                        json_data: json_data,
                        view_data_loc: cur_view_data_loc,
                        data_url: data_url,
                        cur_states: cur_states
                    };
                }else{
                    var data = {
                        error: true
                    };
                }

                return data;
            });
        });
    }

    //get url data
    function urlData(data){

        //put data into an array
        var url_data = data.split('/');

        //get first location(directory)
        var first_loc = url_data[0];

        //set default view if empty
        if(first_loc == ""){
            first_loc = "home";
        }

        //remove first data (will always be main view)
        url_data.shift();

        //get url array count
        var url_data_count = url_data.length;

        //data to return
        var urlObject = {};
        urlObject["view_location"] = first_loc;
        urlObject["url_data"] = url_data;
        urlObject["url_data_count"] = url_data_count;

        return urlObject;
    }

    //loader view
    var load_view = function(url_obj){

        //check for error
        if(url_obj.error){
            window.location.href = init_data.base_url;
        }

        //get states
        var cur_states = url_obj.cur_states;

        //get json data
        var data = url_obj.json_data;

        //get view loc
        var data_url = url_obj.data_url;

        //define load url
        var load_url = "";

        //get view loc
        var view_loc = cur_states.view_loc;

        //get current view data location
        var view_data_loc = url_obj.view_data_loc;

        //set the views data location to current
        cur_states.view_data_loc = view_data_loc;

        //checks for sections
        var has_section = false;

        //clear some app data to make way for new data
        app.menu_data        = [];
        app.section_states   = [];

        //declare some view data
        var view_sections    = [];
        var append_data      = "";

        //get view link
        var data_link = "";
        if(data[view_loc][0]['data_link']){
            data_link = data[view_loc][0]['data_link'];
        }

        //get data error
        var error_link = "";
        if(data[view_loc][0]['data_error']){
            error_link = data[view_loc][0]['data_error'];
        }

        //get section error
        var error_section = "";
        if(data[view_loc][0]['error_section']){
            error_section = data[view_loc][0]['error_section'];
        }

        //get css
        var view_css = [];
        if(data[view_loc][0]['css'] && cur_states.view_type != "section"){
            view_css = data[view_loc][0]['css'];
        }

        //get js
        var view_js = [];
        if(data[view_loc][0]['js'] && cur_states.view_type != 'section'){
            view_js = data[view_loc][0]['js'];
        }

        //get template data
        var view_template_content_data = "";
        if(data[view_loc][0]['template_data'] && cur_states.view_type == "all"){
            view_template_content_data = data[view_loc][0]['template_data'];
        }

        //store before(pre) content data
        var view_pre_content_data = [];
        //
        //store view content data
        var view_content_data = [];
        //
        //store after(post) content data
        var view_post_content_data = [];

        //stores all previous and proceeding sections of current section
        var store_sections = [];
        //
        //store functions to run
        var run_functions = [];
        //
        //store post functions to run
        var post_run_functions = [];

        //store view section content data
        var view_section_content_data = [];
        //
        //store view section js data
        var view_section_js_data = [];
        //
        //store view section run functions
        var view_section_run_functions = [];

        //store template functions
        var template_functions = [];
        //
        //check if there is template functions
        if(data[view_loc][0]['template_functions'] && cur_states.view_type == "all"){

            //get functions
            var view_template_functions = data[view_loc][0]['template_functions'];

            //itterate over array to add to run functions
            for (i = 0; i < view_template_functions.length; i++) {
                run_functions.push(view_template_functions[i]);
            }
        }

        //section error
        var section_error = false;

        //store first section from main view
        var first_section = "";

        //push view location to state
        app.section_states.push(view_loc);

        //check for sections
        if(data[view_loc][0]['sections']){

            //get sections
            var data_sections = data[view_loc][0]['sections'];

            //get section names from data
            $.each(data_sections[0], function(i, item) {
                var data_section = i;

                //add section to array
                view_sections.push(data_section);
            });

            //store sections
            store_sections.push(view_sections);

            //send to menu
            app.menu_data = store_sections;

            //get first section from view
            first_section = view_sections[0];

            //set
            has_section = true;
        }else{

            //set sections to nothing
            view_sections = null;
        }

        //if url has data - *sections are also data
        if(cur_states.url_data_count >= cur_states.post_url_data_count && cur_states.url_data_count > 0){

            //get pre(global to section) section data
            setPreSectionData();

            //set url for grabbing json data
            var data_grab_url = "";

            //find difference of data values between the url and the view "url_data"
            var section_dif_val = cur_states.url_data_count - cur_states.post_url_data_count;

            //if not in a datas section - ie. url.com/username/info(info is a section, so this will not pass)
            if(!section_dif_val){

                //get sections
                data_grab_url = data_grab_url += "['sections'][0]['"+first_section+"'][0]";

                app.section_states.push(first_section);

                //get first section data
                getSectionData();
            }

            //if sections, iterate through amount of difference and get data
            //var all_prev_sections = view_sections;
            for (i = 0; i < section_dif_val; i++) {

                //get value from counting after the amount of "url_data" needed
                var section_val = cur_states.post_url_data_count + i;

                //get current section ignoring "url_data"
                var section = cur_states.url_data[section_val];

                //add to url to fix array
                if(i == 0){
                    section_num = 1; //start at 1
                }else{
                    section_num = i + 1;
                }
                data_url += "&section"+section_num+"" +"="+ section;  

                //get sections
                data_grab_url = data_grab_url += "['sections'][0]['"+section+"'][0]";

                //check for sections
                var current_section_data = [];

                //if no section error
                if(!section_error){

                    //first check if section is real
                    if(isInArray(section, store_sections[i]) ){

                        //get section data - first check if it exists
                        if(getObjByValue(data_grab_url + "['sections']", data[view_loc][0])){
                            current_section_data = getObjByValue(data_grab_url + "['sections']", data[view_loc][0]);
                        }
                    }else{

                        //has error
                        section_error = true;
                    }

                    //count data
                    var section_data_length = countProperties(current_section_data[0]);

                    //get current section names from data and store in array
                    var current_sections = [];

                    //if section has sections - get current sections to store
                    if(current_section_data !== undefined && section_data_length > 0){

                        //get current sections
                        for (i2 = 0; i2 < section_data_length; i2++) {

                            var cur_section = Object.keys(current_section_data[0])[i2];

                            //add section to array
                            current_sections.push(cur_section);
                        }

                        //store sections
                        store_sections.push(current_sections);
                    }

                    //get first section from within section so that empty section url's load the first section
                    var current_section = section;

                    //push current view location(section) to state
                    app.section_states.push(current_section);
                }

                //get or clear section data
                getSectionData(section_error);
            }

            //push(join) view section js data
            if(view_section_js_data.length){
                for (i = 0; i < view_section_js_data.length; i++) {
                    view_js.push(view_section_js_data[i]);
                }
            }

            //push(join) section run functions
            if(view_section_run_functions.length){
                for (i = 0; i < view_section_run_functions.length; i++) {
                    run_functions.push(view_section_run_functions[i]);
                }
            }

            //create url with data
            load_url = data_link + "?"+ data_url;

        }else if(cur_states.url_data_count == 0){

            //if view has no url data, get landing page content data
            var landing = true;
            setPreSectionData(landing);
        }

        //check pop status
        var pop_status = checkPopCount(cur_states);

        //check if any states have been added while app was loading
        if(pop_status){
            
            //reload app
            app.app_idle = true;
            runApp(pop_status.cur_states);
        }else{
            
            //load with promise
            //we use get instead of getjson because getjson doesnt receive empty values
            $.when(preloadAssets(view_css,view_js,null,cur_states),
                $.get(load_url), //get api data
                $.Deferred(function(deferred) {
                    $(deferred.resolve);
                })
            ).then(function(assets,loaded_url_data) {

                //add disabled css to head after preloading in iframe -
                //because disabled stylesheets can not be preloaded
                var head = document.head;
                $.each(view_css, function(i, item) {

                    //css link
                    var loaded_css = item;

                    //create link
                    var link = document.createElement("link");
                    link.type = "text/css";
                    link.rel = "stylesheet";
                    link.href = loaded_css;
                    link.className = 'pre_cssxrq';
                    link.disabled = true;
                    head.appendChild(link);
                });

                //add js to head after preloading in iframe
                //console.log(view_js);

                //get new view data
                var loaded_view_data = loaded_url_data[0];

                //if view data has error
                if(loaded_view_data[0].error || section_error){

                    //get view error link
                    if(section_error){
                        load_url = error_section;
                    }else{
                        load_url = error_link;
                    }

                    //clear content data
                    view_pre_content_data = [];
                    view_post_content_data = [];
                    view_content_data = [];

                    //load with promise
                    $.when($.get(load_url),
                        $.Deferred(function(deferred) {
                            $(deferred.resolve);
                        })
                    ).then(function(loaded_error_data) {

                        //get data
                        loaded_view_data = loaded_error_data[0];

                        //has error
                        var error_state = true;

                        //load template content data
                        loadViewContent(loaded_view_data,error_state);
                    });
                }else{

                    //no error
                    var error_state = false;

                    //load template content data
                    loadViewContent(loaded_view_data,error_state);
                }

                //function to load view content
                function loadViewContent(loaded_view_data,error_state){
           
                    //get template data if not an error and not a section
                    var get_data = true;

                    //turn template to html object
                    var appTemplate = $(app.template);

                    //load template data
                    loadViewContentData(view_template_content_data,append_data,null,error_state,get_data,cur_states).then(function(template_data) {

                        //prepend template data
                        //console.log(appTemplate);
                        appTemplate.prepend(template_data);

                    }).then(function() {

                        //load the views content data
                        loadViewContentData(view_content_data,append_data,loaded_view_data,error_state,null,cur_states).then(function(content_data) {

                            //add main content
                            appTemplate.find('#main-content').prepend(content_data);

                        }).then(function() {

                            //load pre content
                            loadViewContentData(view_pre_content_data,append_data,null,error_state,null,cur_states).then(function(pre_data) {
                        
                                //add pre data content
                                appTemplate.find('#view-content').prepend(pre_data);

                            }).then(function() {

                                //load pre content
                                loadViewContentData(view_post_content_data,append_data,null,error_state,null,cur_states).then(function(post_data) {
                            
                                    //add post data content
                                    appTemplate.find('#view-content').append(post_data);

                                }).then(function() {

                                    //load the views section data
                                    loadViewContentData(view_section_content_data,append_data,loaded_view_data,error_state,null,cur_states).then(function(section_content_data) {

                                        //add main content
                                        appTemplate.find('#view-section-content').html(section_content_data);

                                    }).then(function() {

                                        //view data
                                        var view_data = appTemplate;

                                        //remove section html if section does not exist for view
                                        if(!has_section){
                                            view_data.find('#view-section').remove();
                                        }

                                        //check types
                                        switch(cur_states.view_type){
                                            case "content":
                                                view_data = view_data.find('#view-content').html();
                                                break;
                                            case "section":
                                                view_data = view_data.find('#view-section-content').html();
                                                break;
                                        }

                                        //send data through to preload images
                                        preloadImgs(view_data,run_functions,post_run_functions,cur_states,view_css);
                                    });
                                });
                            });
                        });
                    });
                }
            }, function(err) {
                //err
                console.log(err);
                console.log(err.responseText);
            });
        }
        //start functions
        //the view section data which is global to the sections
        function setPreSectionData(landing){

            //check if is landing page or not
            var target_section_data = 'pre_section_data';
            if(landing == true){
                target_section_data = 'landing_page_data';
            }

            //get pre content data
            if(data[view_loc][0][target_section_data][0]['pre_content_data'] && cur_states.view_type != 'section'){
                view_pre_content_data = data[view_loc][0][target_section_data][0]['pre_content_data'];
            }

            //get post content data
            if(data[view_loc][0][target_section_data][0]['post_content_data'] && cur_states.view_type != 'section'){
                view_post_content_data = data[view_loc][0][target_section_data][0]['post_content_data'];
            }

            //get content data
            if(data[view_loc][0][target_section_data][0]['content_data'] && cur_states.view_type != 'section'){
                view_content_data = data[view_loc][0][target_section_data][0]['content_data'];
            }

            //get section functions that run after section content data loads
            if(data[view_loc][0][target_section_data][0]['run_functions'] && cur_states.view_type != 'section'){

                //get functions
                var view_run_functions = data[view_loc][0][target_section_data][0]['run_functions'];

                //itterate over array to add to run functions
                for (i = 0; i < view_run_functions.length; i++) {
                    run_functions.push(view_run_functions[i]);
                }
            }

            //get post run functions
            if(data[view_loc][0][target_section_data][0]['post_run_functions'] && cur_states.view_type != 'section'){

                //get functions
                var view_post_run_functions = data[view_loc][0][target_section_data][0]['post_run_functions'];

                //itterate over array to add to run functions
                for (i = 0; i < view_post_run_functions.length; i++) {
                    post_run_functions.push(view_post_run_functions[i]);
                }
            }
        }

        //this function sets the data for the sections
        function getSectionData(section_error){

            //no error
            if(!section_error){

                //check and get section js
                if(getObjByValue(data_grab_url + "['js']", data[view_loc][0])){

                    //get
                    var section_js = getObjByValue(data_grab_url + "['js']", data[view_loc][0]);

                    //push to views js array
                    view_section_js_data = section_js;
                }

                //check and get section content data
                if(getObjByValue(data_grab_url + "['content_data']", data[view_loc][0])){
                    
                    //get
                    var section_content_data = getObjByValue(data_grab_url + "['content_data']", data[view_loc][0]);
                    
                    //set to equal to override previous section js
                    view_section_content_data = section_content_data;
                }
                
                //check and get section run functions
                if(getObjByValue(data_grab_url + "['run_functions']", data[view_loc][0])){
                    
                    //get
                    var section_run_functions = getObjByValue(data_grab_url + "['run_functions']", data[view_loc][0]);

                    //set to equal to override previous section run functions
                    view_section_run_functions = section_run_functions;
                }
            }else{
                
                //is error - clear the data
                view_section_js_data = [];
                view_section_content_data = [];
                view_section_run_functions = [];
            }
        }
    };

    //the content of the view and view sections
    function loadViewContentData(view_content_data,append_data,loaded_view_data,error_state,get_data,cur_states){

        //get view type
        var view_type = cur_states.view_type;

        //check get data status
        if(get_data == undefined){
            get_data = true;
        }

        //store promises
        var store_promises = [];

        //check if there is content to load, and the state is not an error
        if(view_content_data.length > 0 && !error_state && get_data){

            //retrieves main view data and stores as promises
            store_promises = view_content_data.map(f => window[f](loaded_view_data,view_type));

            //join the results together to display in order
            return Promise.all(store_promises).then(
            results => results.reduce((acc, this_d) => acc + this_d), append_data);

        }else{

            //check for error
            if(error_state){
                //clear callback data
                append_data = loaded_view_data;
            }else{
                //clear callback data
                append_data = "";
            }

            //return an empty promise if empty
            return Promise.resolve(append_data);
        }
    }

    //preload images - content data and run functions are sent through here before showing
    function preloadImgs(view_data,run_functions,post_run_functions,cur_states,view_css){

        //var thisData = data;
        var loadedData = $(view_data);

        //store images to repload
        var view_imgs = [];

        //get images to preload
        loadedData.find("[data-pre-img]").each(function(){

            //get image url
            var t = $(this).attr('data-pre-img');

            //check if there is an image and push it to array
            if(t !== null){
                view_imgs.push(t);
            }
        });

        //preload images
        $.when(preloadAssets(null,null,view_imgs,null)).then(function() {

            //show view
            showView(view_data,run_functions,post_run_functions,cur_states,view_css);
        });
    }

    //show view
    function showView(view_data,run_functions,post_run_functions,cur_states,view_css){

        //check pop status
        var pop_status = checkPopCount(cur_states);

        //check if any states have been added while app was loading
        if(pop_status){
            
            //reload app
            app.app_idle = true;
            runApp(pop_status.cur_states);
        }else{

            //hide previous content - avoids stylesheet flickering
            hidePrevContent(cur_states);

            //clear previous styles and activate new
            setStyles(cur_states);

            //clear previous js and active new
            setJS(cur_states);

            //remove asset loader(iframe)
            assetLoader(false);

            //replace new html data before timeout to avoid stylesheet flickering
            placeHTML(cur_states,view_data);

            //new html had loaded
            app.html_loaded = true;

            //set initial load to false because html has now been placed
            app.initial_load = false;

            //update data location because html has been placed
            view_state.view_data_loc = cur_states.view_data_loc;

            //add timeout to allow assets to propigate.
            //no way around this
            setTimeout(function(){

                //show html data
                showHTML(cur_states);

                //run functions
                runAllFunctions(run_functions,post_run_functions,cur_states);
            }, 100);
        }
    }

    //functions that are run after content had loaded
    function runAllFunctions(run_functions,post_run_functions,cur_states){

        //get page(view) names from json data
        $.each(run_functions, function(i, item) {
            var view = item;

            //run functions
            window[view]();
        });

        //initialize main scrollbar
        mainScrollbar();

        //run scroll data functions
        $.each(post_run_functions, function(i, item) {
            var view = item;

            //run functions
            window[view]();
        });

        //check pop status
        var pop_status = checkPopCount(cur_states);

        //check if any states have been added while app was loading
        if(pop_status){
            
            //reload app
            app.app_idle = true;
            runApp(pop_status.cur_states);
        }else{
            
            //set app status
            app.app_idle = true;

            //set forced content
            view_state.forced_content = false;

            //initialize links
            initializeLinks();

            //remove
            removeLoader(cur_states);
        }
    }

    //this checks for pop state counts
    function checkPopCount(cur_states){

        //set new data
        var ret_data = {
            cur_states: cur_states
        };

        //check
        if(pop_states.current_pop_count > pop_states.active_pop_count){

            //set prev pop state amount
            pop_states.active_pop_count = pop_states.current_pop_count;

            //update view states
            ret_data.cur_states.view_link = pop_states['view_links'][pop_states.view_links.length - 1];
            ret_data.cur_states.view_type = pop_states['view_types'][pop_states.view_types.length - 1];
            ret_data.cur_states.view_target = pop_states['view_targets'][pop_states.view_targets.length - 1];

            return ret_data;
        }else{
            return false;
        }
    }

    //clear head
    function setJS(cur_states){

        //always remove section js
        $('.jsxrqsec').remove();

        //remove all scripts and styles added by app
        if(cur_states.view_type != 'section'){
            
            //remove all main js
            $('.jsxrq').remove();
        }

        //toggle preloaded asset classes
        $('.pre_jsxrq').removeClass('pre_jsxrq').addClass('jsxrq');
        $('.pre_jsxrqsec').removeClass('pre_jsxrqsec').addClass('jsxrqsec');
    }

    //clear styles
    function setStyles(cur_states){

        //remove all scripts and styles added by app
        if(cur_states.view_type != 'section'){

            //remove previous style sheets
            $('.cssxrq').remove();

            //enable css
            $('.pre_cssxrq').prop("disabled", false);

            //toggle class
            $('.pre_cssxrq').removeClass('pre_cssxrq').addClass('cssxrq');

        }
    }

    //display view data
    function hidePrevContent(cur_states){

        //check types
        switch(cur_states.view_type){
            case "all":
                $('#view').css({
                    opacity: 0
                });
                break;
            case "content":
                $('#view-content').css({
                    opacity: 0
                });
                break;
            case "section":
                $('#view-section-content').css({
                    opacity: 0
                });
                break;
        }
    }

    //place html data
    function placeHTML(cur_states,view_data){

        //get html data
        var loaded_html = view_data;

        //check types and place data
        switch(cur_states.view_type){
            case "all":
                $('body').html(loaded_html);
                break;
            case "content":
                $('#view-content').html(loaded_html);
                break;
             case "section":
                $('#view-section-content').html(loaded_html);
                break;
        }
    }

    //show html data
    function showHTML(cur_states,load){

        //check types
        switch(cur_states.view_type){
            case "all":
               $('#view').css({
                    opacity: 1
                });
                break;
            case "content":
                $('#view-content').css({
                    opacity: 1
                });
                break;
            case "section":
                $('#view-section-content').css({
                    opacity: 1
                });
                break;
        }
    }

    //view loader animation
    function loaderAni(cur_states){

        //check to make sure it is not coming from a form
        if(cur_states.load_type != "form"){

            //check if loader exists
            if (!$('#view-loader').length){
                addViewLoader(cur_states);
            }else{
                //clear the timeout
                clearLoaderTimeout();
            }
        }
    }

    //add view loader
    function addViewLoader(cur_states){
        $(cur_states.loader_target).prepend(app.view_loader);
    }

    //prevent loader from clearing and removing
    function clearLoaderTimeout(){

        //clear loader timeout if it is running
        if(typeof loader_timeout !== "undefined"){
            clearTimeout(loader_timeout);
            $('#view-loader').removeClass('deactive');
        }
    }

    //remove the loader
    function removeLoader(cur_states){

        //remove main view loader
        if(cur_states.load_type == 'view'){

            //add deactive class
            $('#view-loader').addClass('deactive');

            //enable page transitions
            $("body").removeClass("preload");

            //loader timeout
            loader_timeout = setTimeout(function(){

                //remove view loader
                $('#view-loader').remove();
            }, 600);
        }

        //remove form loader
        if(cur_states.load_type == 'form'){

            //check if loader exists and then remove
            if($('#form-loader').length){
                removeFormLoader($('#form-loader'),300);
            }

            //check if popup exists and then remove
            if($('#popblock').length){
                removePopblock($('#popblock'),300);
            }
        }
    }

    //view links
    function scene_view_links(){

        //get object
        var t = $(this);

        //get view link url
        var view_link = t.attr('data-view-link');

        //get view type
        var view_type = t.attr('data-view-type');

        //get load type
        var load_type = t.attr('data-load-type');

        //get view target
        var view_target = t.attr('data-view-target');

        //current states
        var states = {
            view_loc: null,
            view_link: view_link,
            view_type: view_type,
            loader_target: "",
            view_target: view_target,
            load_type: load_type,
            push_state: true,
            pop_state: false,
            url_data: [],
            url_data_count: [],
            html_loaded: false
        };

        //run app
        runApp(states);

        return false;
    }

    //reset view lings
    function initializeLinks(){

        //initialize links
        $('.view_link').off();
        $('.view_link').click(scene_view_links);
    }

    //browser history state control
    window.onpopstate = function (e) {

        //check for state
        if(e.state && e.state.selector || e.state.selector == ""){

            //get state
            var view_link = e.state.selector;

            //get type
            var view_type = e.state.type;
            
            //get load type
            var load_type = e.state.load_type;

            //view target
            var view_target = e.state.target;

            //current states
            var states = {
                view_loc: null,
                view_link: view_link,
                view_type: view_type,
                load_type: load_type,
                view_target: view_target,
                push_state: false,
                pop_state: true,
                html_loaded: false
            };

            //run app
            runApp(states);
        }
    };

    //scroll needs to be global
    function mainScrollbar(){

        //check if has been initialized
        if(mainScroll == undefined || mainScroll == null){
            newMainScroll();
        }else{
            //destory then reinitialize
            //mainScroll.refresh();
            mainScroll.destroy();
            mainScroll = null;
            newMainScroll();
        }

        //main scroll(iscroll)
        function newMainScroll(){
            mainScroll = new IScroll('#main-scroll', {
                scrollbars: true,
                scrollX: false,
                scrollY:true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: false,
                fade: true,
                bounce: true,
                disableTouch: false,
                probeType: 3,
                tap: true,
                disableMouse: false,
                disablePointer: true
            }); 
        }
    }
};

