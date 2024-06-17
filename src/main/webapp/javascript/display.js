let date;
let startTime;
let endTime;

let tableData;
let tableRow;
let list;
let listItem;


const init = async () => {
    await createNotebookNav();

}

const getNotebooks = async () => {
    let user = document.querySelector('div.hidden');

    let id = user.getAttribute('data-user');
    const notebookRequest = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/event-details/${id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const notebookResponse = await notebookRequest.json();
    return await notebookResponse;
}

const createAccordionItem = (id, title) => {
    let div = document.createElement('div');
    div.setAttribute('class', 'accordion-item d-grid justify-content-start');


    let button = document.createElement('button');
    button.setAttribute('class', 'btn btn-md btn-dark dropdown-toggle mb-3');
    button.type = "button";
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', `#collapse-${id}`);
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `collapse-${id}`);
    button.textContent = title;


    div.appendChild(button);

    let collapse = document.createElement('div');
    collapse.setAttribute('id', `collapse-${id}`);
    collapse.setAttribute('class', 'accordion-collapse collapse');
    collapse.setAttribute('aria-labelledby', `heading-${id}`);
    collapse.setAttribute('data-bs-parent', '#accordion');

    let body = document.createElement('ul');
    body.setAttribute('class', 'accordion-body');

    collapse.appendChild(body);
    div.appendChild(collapse);

    return div;
}

const createDropdownList = (id, eventName) => {
    let li = document.createElement('li');
    li.style.listStyle = "none";

    let link = document.createElement('a');
    link.setAttribute("class", 'dropdown-item link-opacity-75-hover');
    link.href = '#';
    link.id = id;
    link.textContent = eventName;
    link.addEventListener("click", linkEventListener)
    li.appendChild(link);
    return li;
}

const createNotebookNav = async () => {
    let notebooks = await getNotebooks();
    let accordion = document.getElementById('accordion');

    notebooks.forEach(notebook => {
        let accordionItem = createAccordionItem(notebook.id, notebook.title);
        let body = accordionItem.querySelector('.accordion-body');

        if (notebook.events.length === 0) {
            body.appendChild(createDropdownList('No events'));
        } else {
            notebook.events.forEach(event => {
                body.appendChild(createDropdownList(event.id, event.eventName));
                accordion.appendChild(accordionItem);
            });
        }


    });
}

const linkEventListener = async (e) => {
    e.preventDefault();
    let id = e.target.getAttribute("id");
    let url = `/EventTracker_war_exploded/eventDetails?eventId=${id}`;
    let events = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/event-details/event=${id}`)
    let data = await events.json();

    await eventDetails(data);
    await artistDisplay(data);
    await locationTable(data);

    let hidden = document.querySelectorAll(".visually-hidden");

    hidden.forEach(element => {
        element.classList.remove("visually-hidden");
    })

    console.log(data)

}


const eventDetails = async (data) => {
    let tr = document.createElement('tr');
    tr.setAttribute('class', 'table-row');
    let body = document.getElementById('eventDetailsBody');
    body.innerHTML = '';
    let attr = 'form-control-plaintext';

    data.eventDetails.forEach(detail => {

        let startTime = createTableData(detail[0].formattedStartTime, `startTime-${detail[0].id}`,'time',  attr,'startTime', 'start time', true);

        let endTime = createTableData(detail[0].formattedEndTime, `endTime-${detail[0].id}`, 'time', attr, 'endTime', 'end time', true);

        let eventDate = createTableData(detail[0].formattedDate, `date-${detail[0].id}`, 'date', attr, 'date', 'event date', true);

        tr.appendChild(eventDate);
        tr.appendChild(startTime);
        tr.appendChild(endTime);
        tr.insertAdjacentHTML('beforeend', `<td><button class="btn btn-sm" type="button" id="editDetail-${detail[0].id}"><i class="bi bi-pen"></i></button></td>`)

    });

    body.appendChild(tr);

}

const createTableData = (data, id, type, attr, placeholder, readonly) => {
    tableData = document.createElement('td');

    let input = document.createElement('input');
    input.id = id;
    input.setAttribute('class', attr);
    input.type = type;
    input.value = data;
    input.placeholder = placeholder;
    input.readOnly = readonly;

    tableData.appendChild(input);

    return tableData;
}


const createTableDataInputGroup = (label, data, id, type, placeholder) => {
    tableData = document.createElement('td');
    tableData.setAttribute('class', 'col-sm');

    let div = document.createElement('div');
    div.setAttribute('class', 'input-group');

    let span = document.createElement('span');
    span.setAttribute('class', 'input-group-text');
    span.textContent = label;


    let input = document.createElement('input');
    input.id = id;
    input.type = type;
    input.value = data;
    input.placeholder = placeholder;
    input.readOnly = true;
    input.disabled = true;
    input.setAttribute('class', 'form-control');


    div.appendChild(span);
    div.appendChild(input);
    tableData.appendChild(div);

    return tableData;
}


window.onload = init;
