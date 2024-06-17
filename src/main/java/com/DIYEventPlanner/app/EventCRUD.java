package com.DIYEventPlanner.app;

import com.DIYEventPlanner.entities.Event;
import com.DIYEventPlanner.entities.Notebook;
import com.DIYEventPlanner.persistence.GenericDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

@Path("/events")
public class EventCRUD {
    private final GenericDao<Event> eventDao = new GenericDao<>(Event.class);
    private final GenericDao<Notebook> notebookDao = new GenericDao<>(Notebook.class);

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addEvent(String data) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(data);

        String title = jsonNode.get("eventName").asText();
        int id = jsonNode.get("notebook_id").asInt();


        Notebook notebook = notebookDao.getById(id);
        if (notebook == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid notebook ID").build();
        }

        Event event = new Event(title, notebook);
        int insertId = eventDao.insert(event);

        return Response.status(Response.Status.CREATED).entity(event).build();
    }
}

