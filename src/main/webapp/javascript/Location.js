class Location {
    constructor(locationName, phoneNumber, address, address2, city, state, zip, website, accessibility, event_id) {
        this.locationName = locationName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.website = website;
        this.accessibility = accessibility;
        this.event_id = event_id;
    }

    displayLocation() {
        return `${this.locationName}, ${this.address}, ${this.address2}, ${this.city}, ${this.state}, ${this.zip}, ${this.phoneNumber}, ${this.website}, ${this.accessibility}`;
    }

    static newLocation(formId) {
        const form = document.getElementById(formId);

        let checkboxes = document.querySelectorAll('.accessible');
        let accessibleValue = false;

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                accessibleValue = checkbox.value;
            }
        });

        return new Location(
            form.elements['locationName'].value || '',
            form.elements['phoneNumber'].value || '',
            form.elements['address'].value || '',
            form.elements['address2'].value || '',
            form.elements['city'].value || '',
            form.elements['state'].value || '',
            form.elements['zip'].value || '',
            form.elements['website'].value || '',
            accessibleValue,
            form.elements['location-eventId'].value
        );
    }

}

const locationDetails = async (data) => {
    let form = document.getElementById('addLocationForm');

    data.location.forEach(location => {
        location = location[0];

        form.elements.values = '';

        if(form) {

            form.elements['locationName'].value = location.locationName || '';
            form.elements['phoneNumber'].value = location.phoneNumber || '';
            form.elements['address'].value = location.address || '';
            form.elements['address2'].value = location.address2 || '';
            form.elements['city'].value = location.city || '';
            form.elements['state'].value = location.state || '';
            form.elements['zip'].value = location.zip || '';
            form.elements['website'].value = location.website || '';
        }

    })

}