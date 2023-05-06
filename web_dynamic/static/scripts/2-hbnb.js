$('document').ready(function () {
  const amenities_dict = {};
  $('li input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities_dict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities_dict[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenities_dict).sort().join(', '));
  });
	$.ajax({
	  url: 'http://0.0.0.0:5001/api/v1/status/',
	  type: 'GET'
	}).done(function (response) {
	  if (response.status === 'OK') {
	    $('#api_status').addClass('available');
	    console.log(response.status)
	  } else {
	      $('#api_status').removeClass('available');
	      console.log(response.status)
	  }
	});
});
