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
});
