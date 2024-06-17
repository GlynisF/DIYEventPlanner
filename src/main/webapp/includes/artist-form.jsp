<div class="container mx-auto mb-3">
    <form id="addArtistForm">
        <div class="row mb-3 g-3">
            <div class="form-floating col-sm-9 mb-3">
                <input class="form-control" type="text" id="moniker" name="moniker" placeholder="moniker">
                <label for="moniker">Moniker</label>
            </div>
            <div class="row mb-3 g-3">
                <div class="form-floating col-sm-4 mb-3">
                    <input class="form-control" type="text" id="firstName" name="firstName" placeholder="first name">
                    <label for="firstName">First Name</label>
                    <input type="number" class="visually-hidden" name="artist-eventId"  id="artist-eventId">
                    <label class="visually-hidden" for="artist-eventId"></label>
                </div>
                <div class="form-floating col-sm-4 mb-3">
                    <input class="form-control" type="text" id="lastName" name="lastName" placeholder="last name">
                    <label for="lastName">Last Name</label>
                </div>
            </div>
            <div class="row mb-3 g-3">
                <div class="form-floating col-sm-4 mb-3">
                    <input class="form-control" type="email" id="email" name="email" placeholder="email address">
                    <label for="email">Email</label>
                </div>
                <div class="form-floating col-sm-4 mb-3">
                    <input class="form-control" type="text" id="bookingFee" name="bookingFee" placeholder="Fee">
                    <label for="bookingFee">Booking Fee</label>
                </div>
            </div>
        </div>
    </form>
</div>