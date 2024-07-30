const init = async () => {
    await createNotebookNav();
}

const getNotebooks = async () => {
    let user = document.querySelector('div.hidden');
    let id = user.getAttribute('data-user');
    const notebookRequest = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/event-details/1050`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await notebookRequest.json();
}

const createAccordionItem = (id, title) => {
    let div = document.createElement('div');
    div.setAttribute('class', 'accordion-item d-grid align-items-stretch mw-100');

    let button = document.createElement('button');
    button.setAttribute('class', 'btn btn-lg btn-dark dropdown-toggle mb-3 w-100');
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
    link.addEventListener("click", linkEventListener);
    li.appendChild(link);

    return li;
}

const createNotebookNav = async () => {
    let notebooks = await getNotebooks();
    let accordion = document.getElementById('accordion');

    notebooks.forEach((notebook, i) => {
        let accordionItem = createAccordionItem(notebook.id, notebook.title);
        let body = accordionItem.querySelector('.accordion-body');

        if (notebook.events.length === 0) {
            let li = document.createElement('li');
            li.style.listStyle = 'none';
            li.textContent = 'No events';
            body.appendChild(li);
            li = document.createElement('li');
            li.style.listStyle = 'none';
            li.appendChild(createAddButton(`add-${i + 1}`));
            body.appendChild(li);
        } else {
            notebook.events.forEach(event => {
                let li = createDropdownList(event.id, event.eventName);
                let btn = createDeleteButton(event.id);
                btn.addEventListener("click", deleteEventListener);
                li.insertAdjacentElement('afterbegin', btn);
                body.appendChild(li);
            });
            let li = document.createElement('li');
            li.style.listStyle = 'none';
            li.appendChild(createAddButton(`add-${i + 1}`));
            body.appendChild(li);
        }
        accordion.appendChild(accordionItem);
    });
}

const eventDetails = async (data) => {
    data.eventDetails.forEach(detail => {
        console.log(detail);
    });
}

const linkEventListener = async (e) => {
    e.preventDefault();
    let id = e.target.getAttribute("id");
    let url = `/EventTracker_war_exploded/eventDetails?eventId=${id}`;
    let events = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/event-details/event=${id}`);
    let data = await events.json();

    await eventDetails(data);

    let hidden = document.querySelectorAll(".visually-hidden");
    hidden.forEach(element => {
        element.classList.remove("visually-hidden");
    });

    console.log(data);
}

const deleteEventListener = async (e) => {
    e.preventDefault();

    let confirm = window.confirm(`Are you sure you want to delete this event?`);

    if (confirm) {
        let eventId = e.target.closest('button').getAttribute('id');
        console.log(eventId);
        let deletedResponse = await deleteFetch(eventId, 'com.DIYEventPlanner.entities.Event');
        if (deletedResponse === 200 || deletedResponse === 204) {
            alert('Event was removed.');
            e.target.closest('li').remove();
        } else if (deletedResponse === 400) {
            alert('Error deleting event');
        }
    } else {
        console.log('Event was not removed. Try again.');
    }
}

const deleteFetch = async (id, className) => {
    let deleteEntity = await fetch(`http://localhost:8080/DIYEventPlanner_war/app/events/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'text/plain, text/html',
            'class': className
        }
    });

    let resp = await deleteEntity.text();
    console.log(resp);
    return deleteEntity.status;
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
