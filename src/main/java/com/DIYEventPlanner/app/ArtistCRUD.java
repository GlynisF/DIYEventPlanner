package com.DIYEventPlanner.app;

import com.DIYEventPlanner.entities.Artist;
import com.DIYEventPlanner.entities.Event;
import com.DIYEventPlanner.entities.Notebook;
import com.DIYEventPlanner.persistence.GenericDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.faces.convert.BigDecimalConverter;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.math.BigDecimal;


@Path("/artist")
public class ArtistCRUD {
    private final GenericDao<Artist> artistDao = new GenericDao<Artist>(Artist.class);
    private final GenericDao<Event> eventDao = new GenericDao<>(Event.class);

    @Context
    private HttpHeaders headers;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addEvent(String data) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(data);

        String moniker = jsonNode.get("moniker").asText();
        String firstName = jsonNode.get("firstName").asText();
        String lastName = jsonNode.get("lastName").asText();
        String email = jsonNode.get("email").asText();
        String fee = jsonNode.get("bookingFee").asText();
        int id = jsonNode.get("event_id").asInt();

        System.out.println(data);

        BigDecimal decimal = new BigDecimal(fee);

        Event event = eventDao.getById(id);
        if (event == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid notebook ID").build();
        }

        Artist artist = new Artist(moniker, firstName, lastName, email, decimal , event);
        int insertId = artistDao.insert(artist);

        return Response.status(Response.Status.CREATED).entity(artist).build();
    }
}
