const baseURL = `http://localhost:8080/DIYEventPlanner_war/app/`;

const init = async (e) => {
    let locationField = document.getElementById('locationName');

    locationField.addEventListener('keyup', async (e) => {
        let predictions = await autocompleteFetch(e);
        console.log(predictions)

        let div = document.getElementById('places');
        div.innerHTML = '';

        let ul = document.createElement('ul');

        predictions.forEach(prediction => {
            let li = createListItem(prediction);
            li.addEventListener('click', async(e) => {
                let id = e.target.getAttribute('id');
                let selectedLi = await autocompleteSelectedLocationListener(e);
                await predictionsList(selectedLi);

            })
            ul.appendChild(li);

        })

        div.appendChild(ul);
    })

    document.getElementById('addNotebook').addEventListener('click', submitNotebook);
    document.getElementById('addEvent').addEventListener('click', runPostAjax);

}

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
}

const submitNotebook = async (e) => {
    e.preventDefault();
    alert('clicked');

    let form = document.getElementById('addNotebookForm');
    let title = form.elements['title'].value;
    let userId = document.getElementById('addNotebookUser').value;

    const notebook = new Notebook(title, userId);
    console.log(notebook);

    try {
        let response = await sendNotebookData(notebook, userId);
        console.log(response);
        console.log(response.id);
        document.getElementById('event-notebookId').value = `${response.id}`;
        alert('Notebook added successfully!');

    } catch (error) {
        alert('Error adding notebook. Please try again.');
        console.error('Error:', error);
    }
}

const sendNotebookData = async (notebook, userId) => {
    let response = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/notebooks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user_id': userId
        },
        body: JSON.stringify(notebook)
    });

    if (!response.ok) {
        throw new Error('Failed to add notebook');
    }

    return response.json();
}

const runPostAjax = async e => {
    e.preventDefault();
    await addEvent(e);
    await addDetails(e);
    await addLocation(e);
    await addArtist(e);
}


const postFetch = async (entity, entityId, entityIdValue, entityType) => {
    let postEntity = await fetch(`${baseURL}${entityType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            entityIdValue: entityId
        },
        body: JSON.stringify(entity)
    });

    if (!postEntity.ok) {
        throw new Error(`failed to add ${entityType}`);
    }
    return postEntity.json();
}

const addEvent = async (e) => {
    e.preventDefault();
    alert('clicked');

    let form = document.getElementById('addEventForm');
    let eventName = form.elements['eventName'].value;
    let notebookId = form.elements['event-notebookId'].value;

    const event = new Event(eventName, notebookId);
    console.log(event);

    try {
        let addEvent = await postFetch(event, notebookId, 'notebook_id', 'events');
        document.getElementById('details-eventId').value = addEvent.id;
        document.getElementById('location-eventId').value = addEvent.id;
        document.getElementById('artist-eventId').value = addEvent.id;
    } catch (error) {
        alert('Error adding event');
        console.error(error);
    }

}

const addDetails = async (e) => {
    e.preventDefault();

    let form = document.getElementById('addDetailsForm');

    let date = form.elements['date'].value;
    let startTime = form.elements['startTime'].value + ':00';
    let endTime = form.elements['endTime'].value + ':00';
    let eventId = form.elements['details-eventId'].value;

    const eventDetails = new EventDetails(date, startTime, endTime, eventId);
    console.log(eventDetails);

    try {
        let addDetails = await postFetch(eventDetails, eventId, 'event_id', 'details');
        console.log(addDetails);
    }
    catch (err) {
        alert('error adding event');
        console.log(err, addDetails.responseText);
    }
}

const addArtist = async e => {
    e.preventDefault();

    let form = document.getElementById('addArtistForm');
    let formData = {};

    for (let element of form.elements) {
        if (element.name) {
            formData[element.name] = element.value;
        }
    }
    console.log('formData: ' + JSON.stringify(formData))

    let event_id = form.elements['artist-eventId'].value


    let artist = new Artist(formData.moniker, formData.firstName, formData.lastName, formData.email, formData.bookingFee, event_id);
    console.log(artist);

    try {
        let addDetails = await postFetch(artist, event_id, 'event_id', 'artist');
        console.log(addDetails);
    }
    catch (err) {
        alert('error adding artist');
        console.log(err, addDetails.responseText);
    }
}

const addLocation = async e => {
    e.preventDefault();

    let form = document.getElementById('addLocationForm');

    let locationName = form.elements['locationName'].value;
    let address = form.elements['address'].value;
    let address2 = form.elements['address2'].value;
    let city = form.elements['city'].value;
    let state = form.elements['state'].value;
    let zip = form.elements['zip'].value;
    let phoneNumber = form.elements['phoneNumber'].value;
    let website = form.elements['website'].value;
    let accessibility;
    let checkedInput = document.getElementsByName(`accessible`);

    checkedInput.forEach(checkedBox => {
      accessibility = (checkedBox.getAttribute('checked') === 'true' ? checkedBox.value : 'false');
    })
    let eventId = form.elements['location-eventId'].value;

    let location = new Location(locationName, phoneNumber, address, address2, city, state, zip, website, accessibility, eventId)
    console.log(location)
    try {
        let locationPost = await postFetch(location, eventId, 'event_id', 'location');
        console.log(locationPost);
        alert('success');
    } catch (err) {
        alert('error adding location');
        console.log(err);
    }


}

window.onload = init;



