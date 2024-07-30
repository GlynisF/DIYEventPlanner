class Events {
    constructor(eventName, notebook_id) {
        this.eventName = eventName;
        this.notebook_id = notebook_id;
    }

    displayEvent() {
        return `${this.eventName}, ${this.notebook_id}`;
    }

}

class EventDetails {
    constructor(date, startTime, endTime, event_id) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.event_id = event_id;

    }

    displayDetails() {
        return `${this.date}, ${this.startTime}, ${this.endTime}`;
    }
}

const eventDetails = async (data) => {
    data.events.forEach(detail => {
        let events = detail.eventDetails[0];
        console.table(events);
        let details = new EventDetails(events.formattedDate, events.formattedStartTime, events.formattedEndTime, detail.id)
        let form = document.getElementById('addDetailsForm');
        if (form) {
            form.elements['date'].value = events.formattedDate || '';
            form.elements['startTime'].value = events.formattedStartTime || '';
            form.elements['endTime'].value = events.formattedEndTime || '';
        }
        console.log(details)
    });
}