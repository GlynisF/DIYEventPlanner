<div class="container mx-auto mb-3">
        <form id="addEventForm">
            <div class="row mb-3 g-3">
            <div class="form-floating col-sm-6 mb-3">
                <input class="form-control" type="text" id="eventName" name="eventName" placeholder="event name">
                <label for="eventName">Notebook Title</label>
            <div class="form-floating col-sm-4 mb-3">
                <input type="number" class="visually-hidden" placeholder="notebook id" id="event-notebookId">
                <label class="visually-hidden" for="event-notebookId"></label>
            </div>
            </div>
            </div>
        </form>

        <form id="addDetailsForm">
            <div class="row mb-3 g-3">
            <div class="form-floating col-sm-4">
                <input class="form-control" type="date" id="date" placeholder="date">
                <label for="date">Date of Event</label>
                <input type="number" class="visually-hidden" placeholder="event id" id="details-eventId">
                <label class="visually-hidden" for="details-eventId"></label>
            </div>
            <div class="form-floating col-sm-4 mw-50">
                <input class="form-control" type="time" id="startTime" placeholder="start time">
                <label for="startTime">Start Time</label>
            </div>
            <div class="form-floating col-sm-4 mw-50">
                <input class="form-control" type="time" id="endTime" placeholder="end time">
                <label for="endTime">End Time</label>
            </div>
            </div>
        </form>
        <div class="row mb-3 g-3">
            <button type="button" class="btn btn-sm btn-outline-success col-sm-3" id="addEvent">Save</button>
        </div>
    </div>