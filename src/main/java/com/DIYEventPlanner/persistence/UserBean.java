package com.DIYEventPlanner.persistence;

import lombok.Getter;
import lombok.Setter;

import javax.ws.rs.FormParam;
import javax.ws.rs.HeaderParam;
import java.time.LocalDate;

@Setter
@Getter
public class UserBean {

    @HeaderParam("user_id")
    private Integer userId;

    @FormParam("firstName")
    private String firstName;

    @FormParam("lastName")
    private String lastName;

    @FormParam("email")
    private String email;

    @FormParam("username")
    private String username;

    @FormParam("password")
    private String password;

    @FormParam("dateOfBirth")
    private LocalDate dateOfBirth;

    @FormParam("title")
    private String title;

}
