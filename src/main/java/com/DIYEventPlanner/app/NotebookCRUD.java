package com.DIYEventPlanner.app;

import com.DIYEventPlanner.entities.Notebook;
import com.DIYEventPlanner.entities.User;
import com.DIYEventPlanner.persistence.GenericDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.sql.SQLException;

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
        System.out.println(notebook);
        return Response.status(Response.Status.CREATED).entity(notebook).build();
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/{id}")
    public Response deleteNotebook(@PathParam("id") int id) throws IOException, SQLException {
        try {
            Notebook notebook = notebookDao.getById(id);
            if (notebook == null) {
                return Response.status(400).entity("Notebook not found.").build();
            } else {
                String title = notebook.getTitle();
                notebookDao.delete(notebook);
                return Response.ok(204, MediaType.TEXT_PLAIN).entity("Notebook, '" + title + "' was deleted successfully").build();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @SneakyThrows
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/{id}")
    public <T> Response deleteEntity(@PathParam("id") int id, @HeaderParam("class") String className) throws IOException, SQLException {
        try {
            Class<?> entityClass = Class.forName(className);
            GenericDao<T> genericDao = new GenericDao<T>((Class<T>) entityClass);
            T type = (T) genericDao.getById(id);
            if (type == null) {
                return Response.status(400).entity(entityClass.getName() + " not found.").build();
            } else {
                genericDao.delete(type);
                return Response.ok(204, MediaType.TEXT_PLAIN).entity(type.getClass().getSimpleName() + " was deleted successfully").build();
            }

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }


    }
}
