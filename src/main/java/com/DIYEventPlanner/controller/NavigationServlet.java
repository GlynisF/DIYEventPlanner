package com.DIYEventPlanner.controller;

import com.DIYEventPlanner.entities.Notebook;
import com.DIYEventPlanner.entities.User;
import com.DIYEventPlanner.persistence.GenericDao;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@WebServlet(urlPatterns = {"/my-events", "/plan-event"})
public class NavigationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getRequestURI().endsWith("/my-events")) {
            GenericDao<User> userDao = new GenericDao<>(User.class);
            User user = userDao.getById(1050);
            String json = mapper.writeValueAsString(user);
            HttpSession session = request.getSession();
            session.setAttribute("user", json);
            GenericDao<Notebook> notebookDao = new GenericDao<>(Notebook.class);
            List<Notebook> notebooks = notebookDao.getAll();
            request.setAttribute("notebooks", notebooks);
            RequestDispatcher dispatcher = request.getRequestDispatcher("/events.jsp");
            dispatcher.forward(request, response);
        } else if (request.getRequestURI().endsWith("/plan-event")) {

                HttpSession session = request.getSession();
                session.setAttribute("userId", 1050);
                GenericDao<User> userDao = new GenericDao<>(User.class);
                User user = (User) userDao.getById(1050);
                //String json = mapper.writeValueAsString(user);
                session.setAttribute("user", user);
                //System.out.println(json);

            RequestDispatcher dispatcher = request.getRequestDispatcher("/create-event.jsp");
            dispatcher.forward(request, response);
        }
    }
}
