jQuery(function () {

	var date = new Date(); // Get local user date/time
	var utcWeekday = date.getUTCDay(); // Get the UTC equivalent weekday 
	var weekday; // Variable to assign weekday so that Mon-Sun is equal to 1-7 for comparison to JSON office_hours.day
	var utcHour = date.getUTCHours(); // Get the UTC equivalent hour 
	var utcMinute = date.getUTCMinutes(); // Get the UTC equivalent minute 
	var algaecalWeekday; // Variable to determine algaecal weekday based on UTC time
	var algaecalHourOffset = utcHour - 8; // Algaecal is (UTC hours -8) 
	var openTime; // Variable to store current day's opening time
	var closeTime; // Variable to store current day's closing time

	//set weekday to Mon-Sun (1-7) equivalents for comparison to JSON office_hours.day
	switch(utcWeekday) {
	    case 0:
	        weekday = 7;
	        break;
	    case 1:
	        weekday = 1;
	        break;
	    case 2:
	        weekday = 2;
	        break;
	    case 3:
	        weekday = 3;
	        break;
	    case 4:
	        weekday = 4;
	        break;
	    case 5:
	        weekday = 5;
	        break;
	    case 6:
	        weekday = 6;
	        break;
	}


	jQuery.ajax({
		type: 'GET',
		url: 'https://www.algaecal.com/wp-json/acf/v3/options/options',
		success: function(options) {

			jQuery.each(options, function(i, option) {
				// Append the tap to talk link and phone number to the #default-number paragraph using the default_phone_number from the REST API
				jQuery('#default-number').append('Tap to Talk <a href="tel:' + option['default_phone_number'] + '">' + option['default_phone_number'] + '</a>');

				// Update weekday after accounting for UTC offset
				// If the algaecalHourOffset is less than 0, set the algaecalWeekday to 7
				if ( algaecalHourOffset < 0 ) {
					algaecalWeekday = weekday - 1;
					if ( algaecalWeekday == 0 ) {
						algaecalWeekday = 7;
					} else {
					}
				} 
				// If the algaecalHourOffset is greater than or equal to 24, set the algaecalWeekday to 1
				else if ( algaecalHourOffset >= 24 ) {
					algaecalWeekday = weekday + 1;
					if ( algaecalWeekday == 8 ) {
						algaecalWeekday = 1;
					} else {
					}			
				} 
				// Otherwise, set the algaecalWeekday equal to the UTC weekday
				else {
					algaecalWeekday = weekday;
				}

				// Loop through office hours
				for (i = 0; i < option.office_hours.length; i++) {

					// Get the office hours for the current day of the week
					if ( algaecalWeekday == option.office_hours[i].day ) {

						// Get the opening and closing hours for the current weekday from the REST API
						openTime = option.office_hours[i].starting_time;
						closeTime = option.office_hours[i].closing_time;

						// Pad the algaecalHourOffset variable with leading and trailing zeroes to format in 24 hour, 4-digit time
						if ( algaecalHourOffset.length = 2 ) {
							algaecalHourOffset = algaecalHourOffset + '00' 
						} else if ( algaecalHourOffset = 1 ) {
							algaecalHourOffset = '"0"' + algaecalHourOffset + '0'
						}

						// Determine if the current time is within AlgaeCal business hours
						if ( algaecalHourOffset >= openTime &&  algaecalHourOffset < closeTime ) {
							jQuery('#open-message').css('display', 'block');
						} else if ( algaecalHourOffset == closeTime && utcMinute == 0) {
							jQuery('#open-message').css('display', 'block');
						} else {
							jQuery('#open-message').css('display', 'none');
						}
					}
				}	

				// Append the 7 year title to the #guarantee-title heading using the 7yr_title from the REST API
				jQuery('#guarantee-title').append(option['7yr_title']);

				// Append the 7 year long guarantee to the #guarantee-title heading using the 7yr_title from the REST API
				//jQuery('#guarantee-long').append(option['7yr_full_copy']);
				
			})			
		}
	});

	// Hides products until video has been watched up to or clicked past 2:13
	// Hide products container
	jQuery("#products").hide(); 
	// Bind the Wistia video
	window._wq = window._wq || [];
    var videoId = "cecdwaq3dz";
    var pushObj = {};
    pushObj[videoId] = function (video) {
    	// Listener to handle video time elapsed/position
        video.bind("secondchange", function (s) {
            var secondsWatched = video.secondsWatched();
            var timePosition = video.time();
            // If the user watches the video for longer than 2:13, display products
            if (secondsWatched > 133) {
				jQuery("#products").slideDown();
            } 
            // If the user clicks past the 2:13 position, display products
            else if (timePosition > 133) {
				jQuery("#products").slideDown();
            }
        });
    };
    _wq.push(pushObj);
});

