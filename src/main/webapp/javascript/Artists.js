class Artist {
    constructor(moniker, firstName, lastName, email, bookingFee, event_id) {
        this.moniker = moniker;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.bookingFee = bookingFee;
        this.event_id = event_id;
    }

    getId() {
        return this.id;
    }

    createArtist(moniker, firstName, lastName, email, bookingFee, event) {
        this.moniker = moniker;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.bookingFee = bookingFee;
        this.event = event;
    }

    displayArtist() {
        return `${this}`;
    }
}

const artistDisplay = async (data) => {
    let artists = [];
    let art2 = [];
   data = data.artist[0];
   console.log(data);
   artists.push(await [...data]);
   console.log(artists)

  let dataMap = data.map(artists => {
     let art = new Artist(artists.moniker, artists.firstName, artists.lastName, artists.email, artists.bookingFee, 6);
     console.log(art)
      art2.push(art)
      console.log(art2)
     let form = artistForm(artists);
      document.getElementById('artistContainer').innerHTML += form;
  })
    console.log(art2)

  await dataMap


};


const createMoniker = (id, value) => {
    let row = createArtistFormRow();
    let div = createArtistInputFieldRow('col-sm');
    let input = createArtistInputField(`${id}`, value);
    input.placeholder = 'artist moniker';
    let label = createArtistInputLabel(`${id}`, 'Moniker');

    div.appendChild(input);
    div.appendChild(label);
    row.appendChild(div);
    document.getElementById('artistContainer').appendChild(row);

    return row;
}

const createArtistFormRow = () => {
    let div = document.createElement('div');
    div.setAttribute('class', 'row mb-3 g-3');
    return div;
}

const createArtistInputFieldRow = (colSize) => {
    let div = document.createElement('div');
    div.setAttribute('class', `form-floating ${colSize} mb-3`);
    return div;
}

const createArtistInputField = (id, value) => {
    let input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('class', 'form-control');
    input.id = `${id}`;
    input.value = `${value}`;
    return input;
}

const createArtistInputLabel = (forAttr, textContent) => {
    let label = document.createElement('label');
    label.setAttribute('for', `${forAttr}`);
    label.textContent = textContent;
    return label;
}

const artistForm = (artist, i) => {
    return `
        <h5 class="card-titl">Artist Info</h5>
        <form id="artistForm-${i}">
        <div class="row mb-3 g-3">
            <div class="form-floating col-sm-6 mb-3">
                <input class="form-control" type="text" id="firstName-${i}" value="${artist.firstName}" placeholder="first name">
                <label for="firstName-${i}">First Name</label>
            </div>
            <div class="form-floating col-sm-6 mb-3">
                <input class="form-control" type="text" id="lastName-${i}" name="lastName" value="${artist.lastName}" placeholder="last name">
                <label for="lastName-${i}">Last Name</label>
            </div>
        </div>
        <div class="row mb-3 g-3">
            <div class="form-floating col-sm-9 mb-3">
                <input class="form-control" type="text" id="moniker-${i}" name="moniker" value="${artist.moniker}" placeholder="moniker">
                <label for="moniker-${i}">Moniker</label>
            </div>
        </div>
        <div class="row mb-3 g-3">
            <div class="form-floating col-sm-7 mb-3">
                <input class="form-control" type="email" id="email-${i}" name="email" value="${artist.email}" placeholder="email address">
                <label for="email-${i}">Email</label>
            </div>
            <div class="form-floating col-sm-5 mb-3">
                <input class="form-control" type="text" id="bookingFee-${i}" name="bookingFee" value="${artist.bookingFee}" placeholder="Fee">
                <label for="bookingFee-${i}">Booking Fee</label>
            </div>
        </div>
    </form>`;
}

// Example data structure
const data = {
    artist: [
        [
            {
                firstName: 'John',
                lastName: 'Doe',
                moniker: 'JD',
                email: 'john.doe@example.com',
                bookingFee: '1000'
            }
        ],
        [
            {
                firstName: 'Jane',
                lastName: 'Smith',
                moniker: 'JS',
                email: 'jane.smith@example.com',
                bookingFee: '2000'
            }
        ],
        [
            {
                firstName: 'Alice',
                lastName: 'Johnson',
                moniker: 'AJ',
                email: 'alice.johnson@example.com',
                bookingFee: '1500'
            }
        ]
    ]
};


