$(function(){
	// caches search results for performance
	var tabList$ = $('ul.tab_bar > li');
	
	// Sets first tab and pointer to active
	tabList$.eq(0).addClass('active');
	tabList$.eq(1).addClass('active');
	
	// calls the resize function on page load
	list_resize();

	// demo controls - Provided for illustration purposes only
	$('#prev').click(function(){
		goBack();
		return false;
	});
	
	$('#next').click(function(){
		goForward();
		return false;
	});
	
	// uncomment & save, on next reload the 3rd tab will be active
	//gotoStep(3);
	
	// changes theme dynamically
	$('#t_1').click(function(){
		$('ul.tab_bar').removeClass('theme_two theme_three').addClass('theme_one');
		return false;
	});
	$('#t_2').click(function(){
		$('ul.tab_bar').removeClass('theme_one theme_three').addClass('theme_two');
		return false;
	});
	$('#t_3').click(function(){
		$('ul.tab_bar').removeClass('theme_one theme_two').addClass('theme_three');
		return false;
	});
	
	// click handler
	$('#add').click(function(){
		addButton('','',2); // pass new values through here
		list_resize();
		return false;
	});
	
	// PLUGIN BRANCH
	
	// click handler
	$('#remove').click(function(){
		removeButton();
		list_resize();
		return false;
	});
	// end of demo controls
	
	// removes page reload functionality of anchor tags from form tabs and form controls
	$('ul.tab_bar, #demo_controls').delegate('a', 'click', function(){
		return false;
    });
	
	// resizes individual <li> elements based on specified width
	function list_resize(){
		tab_elements = $('.tab_bar li:not(.tab_pointer)');  // grabs all <li> elements except those containing the active arrow
		ul_bar_width = $('.tab_bar').width(); 				// gets the width set by the user
		li_count = tab_elements.size();						// counts the number of <li> elements grabbed
		workable_ul_length = ul_bar_width - ((li_count - 1) * 28)	// calculates and stores the average size of the <li> element
		li_length = workable_ul_length / li_count;	
		li_length = li_length - 20;
		tab_elements.css({width : li_length});
	}

	// goes to any tab on the form - Note 1 based numbering. E.g. to select second element send 2
	function gotoStep(stepNumber){
		$('ul.tab_bar > li').removeClass('active').removeClass('tab_pointer_tail');
		stepNumber--;
		$('ul.tab_bar > li').not('li.tab_pointer').eq(stepNumber).addClass('active').next('li.tab_pointer').addClass('active').end().prev('li.tab_pointer').addClass('tab_pointer_tail');
	} 
	
	// selects the previous tab
	function goBack(){
		var activeIndex = $('ul.tab_bar > li').not('li.tab_pointer').index($('.active'));
		gotoStep(activeIndex);
	} 
	
	// selects the next tab
	function goForward(){
		var activeIndex = $('ul.tab_bar > li').not('li.tab_pointer').index($('.active'));
		gotoStep(activeIndex+=2);
	}
	
	// adds a new tab before the last tab
	function addButton(step,desc,pos){
	
		// Default values if nothing is set
		if(!step) step = '?';
		if(!desc) desc = '?short description?';
		if(!pos) pos = 0;
	
		// tab
		var newList = '<li class="tab_inner"><a href="#"><span class="tab_number">' + step + '</span><span class="tab_text"><span class="tab_top_text">STEP ' + step + '</span><br /><span class="tab_bottom_text">' + desc + '</span></span></a></li><li class="tab_pointer"></li>';

		// Checks if value is too large
		if( pos > $('ul.tab_bar > li').not('li.tab_pointer').size() ){
			alert('Index Out of Range - Index Too Large');
			return false;
		}
		
		// Checks if value is too small
		if( pos < 1){
			alert('Index Out of Range - Index Too Small');
			return false;
		}
		
		// If value is valid, add tab and resize list
		var increasedWidth = $('ul.tab_bar > li').not('li.tab_pointer').eq((pos-1)).before(newList).width();
		var oldWidth = $('ul.tab_bar').width();
		$('ul.tab_bar').width(oldWidth + increasedWidth + 46);
		
		// if the user creates a new beginning tab (i.e. - tab to the furthest left)
		if(pos == 1){
			var tabLeft = '<div class="tab_corner_left"></div>';
			// removes left tab from the previous beginning tab
			$('ul.tab_bar > li.tab_first').find('div.tab_corner_left').remove().end().removeClass('tab_first');
			// adds the left tab
			$('ul.tab_bar > li:first').addClass('tab_first').find('a').append(tabLeft);
		}
		
		// Makes the tail active behind the active tab. Needed if the need tab takes the position of an active tab.
		$('ul.tab_bar > li').removeClass('tab_pointer_tail');
		$('ul.tab_bar > li.active:first').prev('li.tab_pointer').addClass('tab_pointer_tail');
	}
	
	// removes the tab before the final tab
	function removeButton(){
		tabList$.last().prev().remove(); // removes pointer
		var reducedWidth = tabList$.last().prev().width(); // gets width for current <li>
		tabList$.last().prev().remove(); // removes pointer
		var oldWidth = $('ul.tab_bar').width();
		$('ul.tab_bar').width(oldWidth - (reducedWidth + 46));
		
		// Makes the tail active behind the active tab
		$('ul.tab_bar > li').removeClass('tab_pointer_tail');
		$('ul.tab_bar > li.active:first').prev('li.tab_pointer').addClass('tab_pointer_tail')
	}
});