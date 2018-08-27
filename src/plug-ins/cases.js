//Cases by Ryan Snooks - Jan 2016

(function($) {
    jQuery.fn.cases = function(settings) {

        var config = {
          //Defaults
          'itemMargin': 10,
          'itemMaxWidth': 172,
          'itemMaxHeight': 240,
          'slider': false,
          'slideOffset': 80,
          'slideControls': false
        };

        if (settings){$.extend(config, settings);}

        var this_main = $(this);

        var caseRow = this_main.find('ul.case_row');

        var itemMaxHeight = config.itemMaxHeight
        , itemMargin = config.itemMargin
        , itemMaxWidth = config.itemMaxWidth + itemMargin
        , slideOffset = config.slideOffset
        , slideControls = config.slideControls

        var itemCount = this_main.find('ul.case_row > li').length;

        var maxCaseWidth = itemCount * itemMaxWidth;

        if (config.slider == true) {
            //add slider
            this_main.addClass('case_slider');
            this_main.find('ul.case_row').wrapAll("<div class='case_slider_container'></div>");
            var caseSliderContainer = this_main.find('.case_slider_container');

            //add margin to fix case position
            if (itemMargin > 0){
                caseRow.css({'marginLeft' :  + -(itemMargin) + 'px'});
            }
        }else{
            //add margin to fix case position
            if (itemMargin > 0){
                caseRow.css({'marginLeft' :  + -(itemMargin) + 'px'});
            }
        }

        function case_resize(){
            //get width of case
            var caseWidth = this_main.width() + itemMargin;

            //get width of case ul
            var caseRowWidthMain = caseRow.width();

            //add offset to width of case for slider to prevent collapsing
            if (config.slider == true) {
                caseWidth = slideOffset + this_main.width();
            }

            //get and round amount of items that fit in container using max width of item
            var caseItemAmount = caseWidth / itemMaxWidth;
            var caseRowLength = Math.round(caseItemAmount);

            //get percentage of each item (for non slider)
            var case_width_percent = (100 / caseRowLength);
            
            //get pixels of each item (for slider)
            var case_width_px = caseWidth / caseRowLength;

            //total width of all the items
            var total_item_width = 0;

            //get aspect ratio height
            var aspectRatoiHeight = (itemMaxHeight / itemMaxWidth) * case_width_px;

            //each item
            this_main.find('ul.case_row > li').each(function(rnd) {
                var this_item = $(this);

                if (caseWidth >= maxCaseWidth){
                    //set sizes when resizing
                    if (config.slider == true) {
                        this_item.css({'width' :  + itemMaxWidth + 'px', 'height' :  + itemMaxHeight + 'px', 'paddingLeft' :  + itemMargin + 'px'});
                    }else{
                        this_item.css({'width' :  + itemMaxWidth + 'px', 'height' :  + (itemMaxHeight + 10) + 'px', 'paddingLeft' :  + itemMargin + 'px', 'paddingBottom' :  + itemMargin + 'px'});
                    }
                }else{
                    //set sizes when resizing
                    if (config.slider == true) {
                        //slider
                        this_item.css({'width' :  + case_width_px + 'px', 'height' :  + aspectRatoiHeight + 'px', 'paddingLeft' :  + itemMargin + 'px'});
                    }else{
                        //normal cases
                       this_item.css({'width' :  + case_width_percent + '%', 'height' :  + (aspectRatoiHeight + 10) + 'px', 'paddingLeft' :  + itemMargin + 'px', 'paddingBottom' :  + itemMargin + 'px'});
                    }
                }

                //get width of current item
                var this_item_width = this_item[0].getBoundingClientRect().width;
                total_item_width += this_item_width;
            });

            if (config.slider == true) {
                if (caseWidth >= maxCaseWidth){
                    //height of case
                    this_main.css({'height' :  + (itemMaxHeight) + 'px'});

                    //height of slider container
                    caseSliderContainer.css({'height' :  + itemMaxHeight + 'px', 'width' :  + (total_item_width - itemMargin) + 'px'});

                    //normal cases
                   caseRow.css({'width' :  + total_item_width + 'px'});
                }else{
                    //height of case
                    this_main.css({'height' :  + (aspectRatoiHeight) + 'px'});

                    //height of slider container
                    caseSliderContainer.css({'height' :  + aspectRatoiHeight + 'px', 'width' :  + (total_item_width - itemMargin) + 'px'});

                    //normal cases
                   caseRow.css({'width' :  + total_item_width + 'px'});
                }
            }

            //add controls
            if(slideControls == true){
                if (this_main.find('.nav-circlepop').length === 0) {
                    this_main.append("<nav class='nav-circlepop'><a class='prev scroll-arrow scroll-arrow_less' href='/item1'><span class='icon-wrap'></span></a><a class='next scroll-arrow scroll-arrow_more' href='/item3'><span class='icon-wrap'></span></a></nav>");
                }else{
                //hide scrollbar if it exists
                    this_main.find('.nav-circlepop').show();
                }
            }
        }
        case_resize();

        $(window).resize(function() {
            case_resize();
        });


    };
})(jQuery);