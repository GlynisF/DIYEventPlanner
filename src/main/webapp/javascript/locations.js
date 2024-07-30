let address;
let address2;
let city;
let state;
let zip;
let phoneNumber;
let website;
let accessible;
let formattedAddress;
let locationId;
let venue;

const setLocationData = async (location) => {
    venue = location.locationName || '';
    address = location.address || '';
    address2 = location.address2 || '';
    city = location.city || '';
    state = location.state || '';
    zip = location.zip || '';
    phoneNumber = location.phoneNumber || '';
    website = location.website || '';
    accessible = location.accessibility === 'true' ? 'Yes' : 'No';
    locationId = location.id;
    formattedAddress = `${address}, ${address2} ${city}, ${state} ${zip}`;
}

const createTableRow = (location) => {
    setLocationData(location);
    return ` <tr>
                <td class="col-sm">
                    <div class="input-group">
                      <span class="input-group-text">Venue</span>
                      <input class="form-control" type="text" id="locationName-${locationId}" value="${venue}" placeholder="venue">
                    </div>
                    <div id="predictions" class="list-group"></div>
                </td>
            </tr>  
            <tr> 
                <td class="col-sm">
                    <div class="input-group">
                        <span class="input-group-text">Address</span>
                        <input class="form-control" type="text" id="formattedAddress-${locationId}" value="${formattedAddress}" placeholder="address">
                    </div>                  
                </td>
            </tr>
            <tr>
              <td class="col-sm">
                <div class="input-group">
                  <span class="input-group-text">Phone #</span>
                  <input class="form-control" type="tel" id="phoneNumber-${locationId}" value="${phoneNumber}" placeholder="phone #"> 
               </div>
            </td>
            </tr>   
            <tr>
              <td class="col-sm">
                <div class="input-group">
                  <span class="input-group-text">Website</span>
                  <input class="form-control" type="text" id="website-${locationId}" value="${website}" placeholder="website"> 
               </div>
              </td>
            </tr>
              <td class="col-sm">  
              <div class="input-group">
              <span class="input-group-text">Accessibility</span>
              <div class="form-check">
            <input class="form-check-input mr-2" type="checkbox" name="accessible" value="Yes" id="true" checked>
            <label class="form-check-label" for="true">
                Yes
            </label>
            <input class="form-check-input" type="checkbox" name="accessible" value="No" id="false">
            <label class="form-check-label" for="false">
                No
            </label>
            </div>
              </td>
            </tr>
            `;
}

const formatAddress = (location) => {
    return `${location.address}, ${location.city}, ${location.state} ${location.zip}`;
}


const locationTable = async (data) => {
    data.location.forEach((location, i) => {
        let rowId = i + 1;
        location = location[0];
        setLocationData(location[0]);
        (createInputGroup(`${venue}`, 'Venue', `locationName-${locationId}`, 'text', 'venue name', rowId));
        (createInputGroup(`${formattedAddress}`, 'Address', `address-${locationId}`, 'text', 'address', rowId));
        (createInputGroup(`${phoneNumber}`, 'Phone #', `phoneNumber-${locationId}`, 'tel', 'phone number', rowId));
        (createInputGroup(`${website}`, 'Website', `website-${locationId}`, 'text', 'website', rowId));
    });

}

const createInputGroup = (location, name, id, type, placeholder, rowId) => {
    let tr = document.createElement('tr');
    tr.id = rowId;

    let td = document.createElement('td');
    td.setAttribute('class', 'col-sm');

    let div = createInputGroupDiv();
    let span = createSpanElement(name);
    let input = createInputGroupElement(location, id, type, placeholder);

    div.appendChild(span);
    div.appendChild(input);
    td.appendChild(div);
    tr.appendChild(td);

    document.getElementById('locationBody').appendChild(div);
    return div;
}

const createInputGroupDiv = () => {
    let div = document.createElement('div');
    div.setAttribute('class', 'input-group');
    return div;
}

const createSpanElement = name => {
    let span = document.createElement('span');
    span.setAttribute('class', 'input-group-text');
    span.textContent = name;
    span.style.backgroundColor = 'white';
    return span;
}

const createInputGroupElement = (locationValue, type, id, placeholder) => {
    let input = document.createElement('input');
    input.setAttribute('class', 'form-control');
    input.readOnly = true;
    input.disabled = true;
    input.id = id;
    input.type = type;
    input.value = locationValue;
    input.placeholder = placeholder;
    input.style.backgroundColor = 'white';
    return input;
}

let autocompleteListener = async (e, id) => {
    let inputId = document.getElementById(`locationName-${locationId}`);
    let param = e.target.value;

    return await autocompleteFetch(encodeURIComponent(param), id);
}

const autocompleteFetch = async (e, id) => {
    let userInput = e.target.value;
    let param = encodeURIComponent(userInput)
    let predictionsFetch = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/autocomplete?userInput=${param}`);
    return await predictionsFetch.json();
}

const autocompleteSelectedLocationListener = async (e) => {
    let id = e.target.getAttribute("id");
    let placeDetailsFetch = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/autocomplete/${id}`);
    let placeDetails = await placeDetailsFetch.json();

    console.log(placeDetails);
    return placeDetails;
}

let createListItem = prediction => {
    let li = document.createElement('li');
    li.id = prediction.placeId;
    li.setAttribute("class", "list-group-item");
    li.textContent = prediction.description;
    return li;
}

const fillInForm = async (data) => {
    document.getElementById(`locationName-${locationId}`).value = `${data.name}`;
    document.getElementById(`formattedAddress-${locationId}`).value = `${data.address}, ${data.city}, ${data.state} ${data.zip}`;
    document.getElementById(`phoneNumber-${locationId}`).value = data.phone_number;
    document.getElementById(`website-${locationId}`).value = data.website;

    let ul = document.getElementById('predictions');
    ul.classList.add('visually-hidden');
    ul.innerHTML = '';
}
