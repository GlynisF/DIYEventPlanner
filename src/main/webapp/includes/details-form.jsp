<div class="container mx-auto mb-3">
    <form id="addDetailsForm">
        <div class="row mb-3">
            <div class="form-floating col-sm w-50">
                <input class="form-control" type="text" id="eventName" name="eventName" placeholder="event name">
                <label for="eventName">Notebook Title</label>
                <input type="number" class="visually-hidden" placeholder="notebook id" id="addEventNotebook">
                <label class="visually-hidden" for="addEventNotebook"></label>
            </div>
        </div>
        <button type="submit" class="btn btn-outline-success" id="addEvent">Save</button>
    </form>
</div>