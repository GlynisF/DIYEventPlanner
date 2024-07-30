const baseURL = `http://localhost:8080/DIYEventPlanner_war/app/`;

const init = async () => {
    let locationField = document.getElementById('locationName');

    locationField.addEventListener('keyup', async (e) => {
        let predictions = await autocompleteFetch(e);
        console.log(predictions);

        let div = document.getElementById('places');
        div.innerHTML = '';

        let ul = document.createElement('ul');

        predictions.forEach(prediction => {
            let li = createListItem(prediction);
            li.addEventListener('click', async (e) => {
                let selectedLi = await autocompleteSelectedLocationListener(e);
                await predictionsList(selectedLi);
            });
            ul.appendChild(li);
        });

        div.appendChild(ul);
    });

    document.getElementById('addEvent').addEventListener('click', runPostAjax);
};

const predictionsList = async (prediction) => {
    document.getElementById('locationName').value = prediction.name;
    document.getElementById('address').value = prediction.address;
    document.getElementById('city').value = prediction.city;
    document.getElementById('state').value = prediction.state;
    document.getElementById('zip').value = prediction.zip;
    document.getElementById('phoneNumber').value = prediction.phone_number;
    document.getElementById('website').value = prediction.website;

    let accessibility = prediction.accessibility;
    if (accessibility === 'true') {
        document.getElementById('true').checked = true;
        document.getElementById('false').checked = false;
    } else {
        document.getElementById('false').checked = true;
        document.getElementById('true').checked = false;
    }

    document.getElementById('places').innerHTML = '';
};

const submitNotebook = async () => {
    let form = document.getElementById('addNotebookForm');
    let title = form.elements['title'].value;
    let userId = document.getElementById('addNotebookUser').value;

    const notebook = new Notebook(title, userId);
    console.log(notebook);

    try {
        let response = await sendNotebookData(notebook, userId);
        if (response.ok) {
            let responseData = await response.json();
            document.getElementById('event-notebookId').value = `${responseData.id}`;
            alert('Notebook added successfully!');
            return responseData.id;
        } else {
            throw new Error('Failed to add notebook');
        }
    } catch (error) {
        alert('Error adding notebook. Please try again.');
        console.error('Error:', error);
        throw error;
    }
};

const sendNotebookData = async (notebook, userId) => {
    return await fetch(`http://localhost:8080/DIYEventPlanner_war/app/notebooks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user_id': userId
        },
        body: JSON.stringify(notebook)
    });
};

const runPostAjax = async (e) => {
    e.preventDefault();
    try {
        let notebookId = await submitNotebook();
        await addEvent(notebookId);
        await addDetails();
        await addLocation();
        await addArtist();
    } catch (error) {
        console.error('Error in runPostAjax:', error);
    }
};

const postFetch = async (entity, entityId, entityIdValue, entityType) => {
    let postEntity = await fetch(`${baseURL}${entityType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            [entityIdValue]: entityId
        },
        body: JSON.stringify(entity)
    });

    if (!postEntity.ok) {
        throw new Error(`Failed to add ${entityType}`);
    }
    return await postEntity.json();
};

const addEvent = async (notebookId) => {
    let form = document.getElementById('addEventForm');
    let eventName = form.elements['eventName'].value;

    const event = new Event(eventName, notebookId);
    console.log(event);

    try {
        let addedEvent = await postFetch(event, notebookId, 'notebook_id', 'events');
        document.getElementById('details-eventId').value = addedEvent.id;
        document.getElementById('location-eventId').value = addedEvent.id;
        document.getElementById('artist-eventId').value = addedEvent.id;
    } catch (error) {
        alert('Error adding event');
        console.error(error);
        throw error;
    }
};

const addDetails = async () => {
    let form = document.getElementById('addDetailsForm');
    let date = form.elements['date'].value;
    let startTime = form.elements['startTime'].value + ':00';
    let endTime = form.elements['endTime'].value + ':00';
    let eventId = form.elements['details-eventId'].value;

    const eventDetails = new EventDetails(date, startTime, endTime, eventId);
    console.log(eventDetails);

    try {
        await postFetch(eventDetails, eventId, 'event_id', 'details');
        console.log('Details added successfully');
    } catch (error) {
        alert('Error adding event details');
        console.error(error);
        throw error;
    }
};

const addArtist = async () => {
    let form = document.getElementById('addArtistForm');
    let formData = {};

    for (let element of form.elements) {
        if (element.name) {
            formData[element.name] = element.value;
        }
    }
    console.log('formData: ' + JSON.stringify(formData));

    let event_id = form.elements['artist-eventId'].value;
    let artist = new Artist(formData.moniker, formData.firstName, formData.lastName, formData.email, formData.bookingFee, event_id);
    console.log(artist);

    try {
        await postFetch(artist, event_id, 'event_id', 'artist');
        console.log('Artist added successfully');
    } catch (error) {
        alert('Error adding artist');
        console.error(error);
        throw error;
    }
};

const addLocation = async () => {
    let form = document.getElementById('addLocationForm');
    let locationName = form.elements['locationName'].value;
    let address = form.elements['address'].value;
    let address2 = form.elements['address2'].value;
    let city = form.elements['city'].value;
    let state = form.elements['state'].value;
    let zip = form.elements['zip'].value;
    let phoneNumber = form.elements['phoneNumber'].value;
    let website = form.elements['website'].value;
    let accessibility = form.elements['accessible'].checked ? 'true' : 'false';
    let eventId = form.elements['location-eventId'].value;

    let location = new Location(locationName, phoneNumber, address, address2, city, state, zip, website, accessibility, eventId);
    console.log(location);

    try {
        await postFetch(location, eventId, 'event_id', 'location');
        console.log('Location added successfully');
    } catch (error) {
        alert('Error adding location');
        console.error(error);
        throw error;
    }
};

window.onload = init;
