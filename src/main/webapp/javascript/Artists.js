class Artist {
    constructor(moniker, firstName, lastName, email, bookingFee, event_id) {
        this.moniker = moniker;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.bookingFee = bookingFee;
        this.event_id = event_id;
    }

    displayArtist() {
        return `${this}`;
    }
}