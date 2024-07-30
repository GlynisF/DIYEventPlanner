<div class="container mx-auto mb-3">
    <h5 class="card-title mb-3 g-3">Event Details</h5>
        <form id="addEventForm">
            <div class="row mb-3 g-3">
            <div class="form-floating col-sm-6 mb-3">
                <input class="form-control" type="text" id="eventName" name="eventName" placeholder="event name">
                <label for="eventName">Event Name</label>
            </div>
            <div class="form-floating col-sm-4 mb-3">
                <input type="number" class="visually-hidden" placeholder="notebook id" id="event-notebookId">
                <label class="visually-hidden" for="event-notebookId"></label>
            </div>
            </div>
        </form>

        <form id="addDetailsForm">
            <div class="row mb-3 g-3">
            <div class="form-floating col-sm-4 mb-3">
                <input class="form-control" type="date" id="date" placeholder="date">
                <label for="date">Date of Event</label>
                <input type="number" class="visually-hidden" placeholder="event id" id="details-eventId">
                <label class="visually-hidden" for="details-eventId"></label>
            </div>
            <div class="form-floating col-sm-4 mw-25 mb-3">
                <input class="form-control" type="time" id="startTime" placeholder="start time">
                <label for="startTime">Start Time</label>
            </div>
            <div class="form-floating col-sm-4 mw-25 mb-3">
                <input class="form-control" type="time" id="endTime" placeholder="end time">
                <label for="endTime">End Time</label>
            </div>
            </div>
        </form>
    </div>