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
    console.log(`${id}`)
    const notebookRequest = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/event-details/1050`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await notebookRequest.json();
}

const createAccordionItem = (id, title) => {
    let div = document.createElement('div');
    div.setAttribute('class', 'accordion-item');

    let header = document.createElement('h2');
    header.setAttribute('class', 'accordion-header');
    header.id = `heading-${id}`;

    let button = document.createElement('button');
    button.setAttribute('class', 'accordion-button collapsed');
    button.type = "button";
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', `#collapse-${id}`);
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `collapse-${id}`);
    button.textContent = title;

    header.appendChild(button);
    div.appendChild(header);

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
    li.appendChild(link);
    return li;
}

// retrieves accordion container
const getAccordionContainer = () => {
    return document.getElementById('accordion');
};

const getUser = () => {
    let user = document.querySelector('div.hidden');
    return user.getAttribute('data-user');
}

// Creates and appends the accordion item for each notebook
const createNotebookAccordionItem = (notebook, index, accordion) => {
    let accordionItem = createAccordionItem(notebook.id, notebook.title);
    let body = accordionItem.querySelector('.accordion-body');
    let noteObj = new Notebook(notebook.title, getUser().substring(4, getUser().length));
    console.log(noteObj);

    if (notebook.events.length === 0) {
        createEmptyNotebookList(body, index);
    } else {
        handleNotebookEvents(notebook, body, index);
    }

    accordion.appendChild(accordionItem);
};

// Handles the event list within each notebook
const handleNotebookEvents = (notebook, body, index) => {
    notebook.events.forEach(event => {
        let events = new Event(event.eventName, notebook.id);
        let li = createDropdownList(events.id, events.eventName);
        li.addEventListener("click", detailsFetch);
        body.appendChild(li);
    });

    let li = document.createElement('li');
    li.style.listStyle = 'none';
    li.appendChild(createAddButton(`add-${index + 1}`));
    body.appendChild(li);

    let deleteLi = document.createElement('li');
    let btn = createDeleteButton(notebook.id);
    btn.addEventListener('click', deleteEventListener);
    deleteLi.insertAdjacentElement('afterbegin', btn);
    body.appendChild(deleteLi);
};

// Handles the case when a notebook has no events
const createEmptyNotebookList = (body, index) => {
    body.appendChild(createDropdownList('No events'));

    let li = document.createElement('li');
    li.style.listStyle = 'none';
    li.appendChild(createAddButton(`add-${index + 1}`));
    body.appendChild(li);
};

// Main function to create the notebook navigation
const createNotebookNav = async () => {
    try {
        let notebooks = await getNotebooks();
        let accordion = getAccordionContainer();
        let user = document.querySelector('div.hidden');

        notebooks.forEach((notebook, i) => {
            createNotebookAccordionItem(notebook, i, accordion);
        });
    } catch (error) {
        console.error('Error creating notebook navigation:', error);
    }
};

const deleteEventListener = async (e) => {
    e.preventDefault();

    let confirm = window.confirm(`Are you sure you want to delete this notebook and its associated events?`);

    if (confirm) {
        let notebookId = e.target.closest('button').getAttribute('id');
        console.log(notebookId)
        let deletedResponse = await deleteFetch(`delete-${notebookId}`, 'com.DIYEventPlanner.entities.Notebook');
        if (deletedResponse === 200 || deletedResponse === 204) {
            alert('Notebook was removed.');
            document.remove(document.getElementById(notebookId));
            console.log(await deletedResponse.text())
        } else if (deletedResponse === 400) {
            alert('error deleting notebook');
            console.log(await deletedResponse.text());
        }
    } else {
        console.log('notebook was not removed. try again.');
    }
}

const deleteFetch = async (id, className) => {
    let deleteEntity = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/notebooks/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'text/plain, text/html',
            'Content-Type': 'application/json',
            'class': className
        }
    });

    let resp = await deleteEntity.text();
    console.log(resp);
    return resp;
}

const detailsFetch = async (e) => {
    e.preventDefault();
    let eventId = e.target.getAttribute("id");
    let url = `/EventTracker_war_exploded/eventDetails?eventId=${eventId}`;
    let events = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/event-details/event=${eventId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let data = await events.json();
    let d = document.getElementById('eventName');
    d.value = e.target.textContent;
    await eventDetails(data)
    await locationDetails(data)
    await artistDisplay(data);

}

const createDeleteButton = (id) => {
    let btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('class', 'btn btn-outline-danger');
    btn.id = id;
    btn.textContent = 'Delete';
    return btn;
}

const createAddButton = (id) => {
    let btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('class', 'btn btn-outline-success-subtle');
    btn.id = id;
    btn.textContent = 'Create Event';
    return btn;
}



window.onload = init;
