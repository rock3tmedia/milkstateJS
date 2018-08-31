//this script loads the style sheets using a deferred promise
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
};