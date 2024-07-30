package com.DIYEventPlanner.controller;

import com.DIYEventPlanner.entities.User;
import com.DIYEventPlanner.persistence.GenericDao;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;


@WebServlet(
        urlPatterns = {"/login", "/user"}
)
public class UserLogin extends HttpServlet {
    List<User> userList;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        GenericDao<User> userDao = new GenericDao<>(User.class);

        HttpSession session = request.getSession();

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        userList = userDao.findByPropertyEqual("username", username);
        User user = null;
        String message = "";

        if (userList != null && !userList.isEmpty()) {
            user = getUser();
            if (password.equals(user != null ? user.getPassword() : null)) {
                int userId = user.getId();
                session.setAttribute("user", user);
                session.setAttribute("userId", 1050);
                RequestDispatcher dispatcher = request.getRequestDispatcher("homepage.jsp");
                dispatcher.forward(request, response);
            } else {
                message = "Invalid password. Please try again.";
                session.setAttribute("errorMessage", message);
                response.sendRedirect("error.jsp?error=invalid-password");
            }
        } else {
            message = "User not found. Please try again.";
            session.setAttribute("errorMessage", message);
            response.sendRedirect("error.jsp?error=user-not-found");
        }
    }

    private User getUser() {
        for (User user : userList) {
            return user;
        }
        return null;
    }


    private boolean passwordValidation(String enteredPassword, String userPassword) {
        return enteredPassword.equals(userPassword);
    }
}