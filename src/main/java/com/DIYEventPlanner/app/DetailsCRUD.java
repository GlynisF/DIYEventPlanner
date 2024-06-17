package com.DIYEventPlanner.app;

import com.DIYEventPlanner.entities.Event;
import com.DIYEventPlanner.entities.EventDetails;
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
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Path("/details")
public class DetailsCRUD {
    private final GenericDao<Event> eventDao = new GenericDao<>(Event.class);
    private final GenericDao<EventDetails> detailsDao = new GenericDao<>(EventDetails.class);

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addDetails(String data) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(data);

        String eventDateStr = jsonNode.get("date").asText();
        String startTimeStr = jsonNode.get("startTime").asText();
        String endTimeStr = jsonNode.get("endTime").asText();
        int id = jsonNode.get("event_id").asInt();

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

        LocalDate eventDate = LocalDate.parse(eventDateStr, dateFormatter);
        LocalTime startTime = LocalTime.parse(startTimeStr, timeFormatter);
        LocalTime endTime = LocalTime.parse(endTimeStr, timeFormatter);

        Event event = eventDao.getById(id);
        if (event == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid event ID").build();
        }

        EventDetails details = new EventDetails(eventDate, startTime, endTime, event);
        int insertId = detailsDao.insert(details);

        return Response.status(Response.Status.CREATED).entity(details).build();
    }

}
