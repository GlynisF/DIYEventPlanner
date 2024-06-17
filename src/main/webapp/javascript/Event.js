class Event {
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