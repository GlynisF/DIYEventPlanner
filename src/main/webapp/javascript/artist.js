let moniker;
let firstName;
let lastName;
let artistName;
let email;
let fee;

const artistDisplay = async (data) => {
    data = data.artist[0];
    let td = '<tr>';

    data.forEach((artist, i) => {
        td += `<td class="fw-bold">${i + 1}</td>`
        td += createArtistRow(artist.moniker, `moniker-${artist.id}`, 'text', 'moniker');
        td += createArtistRow(`${artist.firstName} ${artist.lastName}`, `name-${artist.id}`, 'text', 'name');
        td += createArtistRow(artist.email, `email-${artist.id}`, 'text', 'email');
        td += createArtistRow(`$${artist.bookingFeeFormatted}`, `fee-${artist.id}`, 'text', 'fee');
        td += `<td><button class="btn btn-sm border-1" type="button" id="editArtist-${artist.id}"><i class="bi bi-pen"></i></button>`;
        td += `</tr>`;
    })

    let body = document.getElementById("artistBody");
    body.innerHTML = '';
    body.innerHTML += td;


}

const createArtistRow = (artist, id, type, value, placeholder) => {
    return `<td><input class="form-control" id="${id}" type="${type}" value="${artist}" placeholder="${placeholder}" style="background-color: white;" readonly disabled></td>`
}
