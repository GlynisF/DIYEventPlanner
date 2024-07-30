package com.DIYEventPlanner.app;

import com.DIYEventPlanner.entities.*;
import com.DIYEventPlanner.persistence.GenericDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.StringWriter;
import java.io.Writer;
import java.util.*;

@Path("/event-details")
public class Events {

    @SneakyThrows
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getEvents(@PathParam("id") int id) {
       GenericDao<User> userDao = new GenericDao<>(User.class);
       User user = userDao.getById(id);
       Set<Notebook> notebookSet = user.getNotebooks();
        if (!notebookSet.isEmpty()) {

            try {
                ObjectMapper mapper = new ObjectMapper();
                Writer writer = new StringWriter();
                mapper.writeValue(writer, notebookSet);
                String json = writer.toString();
                return Response.ok(json).build();
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        } else {
            return Response.status(404).build();
        }
    }

    @SneakyThrows
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/event={eventId}")
    public Response getEventDetails(@PathParam("eventId") int eventId) {
        GenericDao<EventDetails> detailsDao = new GenericDao<>(EventDetails.class);
        GenericDao<Location> locationDao = new GenericDao<>(Location.class);
        GenericDao<Artist> artistDao = new GenericDao<>(Artist.class);
        GenericDao<Event> eventDao = new GenericDao<>(Event.class);

        Map<String, List<Object>> map = new HashMap<>();
        Event event = eventDao.getById(eventId);
        List<EventDetails> eventDetailsList = detailsDao.findByPropertyEqual("event", eventId);
        List<Location> locationList = locationDao.findByPropertyEqual("event", eventId);
        List<Artist> artistList = artistDao.findByPropertyEqual("event", eventId);

        if (event != null && eventDetailsList != null && locationList != null && artistList != null) {
            map.put("events", Collections.singletonList(event));
            map.put("eventDetails", Collections.singletonList(eventDetailsList));
            map.put("location", Collections.singletonList(locationList));
            map.put("artist", Collections.singletonList(artistList));

            try {
                ObjectMapper mapper = new ObjectMapper();
                String json = mapper.writeValueAsString(map);
                System.out.println(json); // Optional: Print JSON for debugging
                return Response.ok(json).build();
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Error processing JSON", e);
            }
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }


}

