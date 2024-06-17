package com.DIYEventPlanner.app;

import com.DIYEventPlanner.entities.Event;
import com.DIYEventPlanner.entities.Location;
import com.DIYEventPlanner.persistence.GenericDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

@Path("/location")
public class LocationCRUD {
    private final GenericDao<Location> locationDao = new GenericDao<>(Location.class);
    private final GenericDao<Event> eventDao = new GenericDao<>(Event.class);

    public LocationCRUD(){
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLocation(String data) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(data);


        String locationName = jsonNode.get("locationName").asText();
        String address = jsonNode.get("address").asText();
        String address2 = jsonNode.get("address2").asText();
        String city = jsonNode.get("city").asText();
        String state = jsonNode.get("state").asText();
        String zip = jsonNode.get("zip").asText();
        String phoneNumber = jsonNode.get("phoneNumber").asText();
        String website = jsonNode.get("website").asText();
        int eventId = jsonNode.get("event_id").asInt();
        Boolean accessibility = jsonNode.get("accessibility").asBoolean();

        Event event = eventDao.getById(eventId);

        if (event == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid event ID").build();
        }

        Location location = new Location(locationName, phoneNumber, address, address2, city, state, zip, website, accessibility, event);
        int id = locationDao.insert(location);

        return Response.status(Response.Status.CREATED).entity(location).build();
    }

}


