function mapInit() {
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={pk.eyJ1IjoiYWJoaXBhZCIsImEiOiJja202cWc3YjkwZHk5MnBzOW5oOTM0YTJnIn0.7b8wlS14qH_ERpMAPJB4KA}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',,
   maxZoom: 18,
   id: 'mapbox/streets-v11',
   tileSize: 512,
   zoomOffset: -1,
   accessToken: 'pk.eyJ1IjoiYWJoaXBhZCIsImEiOiJja202cWc3YjkwZHk5MnBzOW5oOTM0YTJnIn0.7b8wlS14qH_ERpMAPJB4KA'
       }  ).addTo(mymap);

  return map;
}

async function dataHandler(mapObjectFromFunction) {
  async function windowActions() {
    const search = document.querySelector('#searchByZip');
    const submitButton = document.querySelector('#subButton');
    const filteredList = document.querySelector('#filteredList');
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
    const request = await fetch(endpoint);
    const locations = await request.json();
  
  
    function findMatches(search, places) {
      return places.filter(place => {
        const regex = new RegExp(search, 'gi')
        return place.zip.match(regex)
      }); 
    }
    function removeChildren(parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }
    async function displayMatches() {
    const filteredPlaces = findMatches(search.value, locations);
          removeChildren(filteredList);
          filteredPlaces.forEach((place) => {
            filteredList.insertAdjacentHTML(
              "beforeend",
              `<li class='card mt-4'>
                  <div class="card-content">
                      <div class="content">
                          <p class="title is-3">${place.name}</p>
                          <p class="subtitle is-5">${place.category}</p>
                          <address>${place.address_line_1}<br/>${place.address_line_2}<br/>
                              ${place.city}, ${place.state}. ${place.zip}</address>
                      </div>
                  </div>
                  </li>`)
          })
    }
  
    search.addEventListener("change", displayMatches);
    search.addEventListener("keyup", displayMatches);
    //submitButton.addEventListener("onsubmit", displayMatches);
  }
  window.onload = windowActions;
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;