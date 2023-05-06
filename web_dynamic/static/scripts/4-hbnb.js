$(function (e) {
  let checkedList = [];
  let checkedString = '';
  let checkedIdsList = [];
  let clicked = false;

  $('input[type="checkbox"]').on('change', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {
      checkedList.push({ id: id, name: name });
    } else {
      checkedList = $.grep(checkedList, (myData) => {
        return myData.id != id;
      });
    }

    checkedString = checkedList.map(function (myData) {
      return myData.name;
    }).join(', ');

    checkedIdsList = checkedList.map(function (myData) {
      return myData.id != id;
    });
 
    $('div.amenities h4').text(checkedString);
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (myData) {
      if (myData.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
  
  function placesRender(data) {
    $.ajax({
      method: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(data),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },  
      success: function (myData) {
        $.each(myData, (index, place) => {
            const html = ` 
              <article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                   <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                   ${place.description}
                </div>
              </article>
            `;
            $('section.places').append(html);
        });
      }
    });  
  }

  $('button').on('click', () => {
    placesRender({'amenities': checkedIdsList});
  });

  placesRender({});
});
