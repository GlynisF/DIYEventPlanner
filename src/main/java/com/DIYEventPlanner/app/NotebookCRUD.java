package com.DIYEventPlanner.app;

import com.DIYEventPlanner.entities.Notebook;
import com.DIYEventPlanner.entities.User;
import com.DIYEventPlanner.persistence.GenericDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

@Path("/notebooks")
public class NotebookCRUD {
    private final GenericDao<Notebook> notebookDao = new GenericDao<>(Notebook.class);
    private final GenericDao<User> userDao = new GenericDao<>(User.class);

    public User getUser(int id) {
        return userDao.getById(id);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addNotebook(String data, @HeaderParam("user_id") int userId) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(data);

        String title = jsonNode.get("title").asText();

        User user = getUser(userId);
        if (user == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid user ID").build();
        }

        Notebook notebook = new Notebook(title, user);
        int id = notebookDao.insert(notebook);

        user.addNotebook(notebook);
        notebook.setUser(user);

        return Response.status(Response.Status.CREATED).entity(notebook).build();
    }
}
