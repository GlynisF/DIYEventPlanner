<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<%@include file="/includes/head.jsp" %>

<div class="container">

    <%@include file="/includes/nav.jsp" %>

    <body class="container">
    ${user}
    <div class="row mt-5">
        <header class="home_header">
            <!-- This div is  intentionally blank. It creates the transparent black overlay over the video which you can modify in the CSS -->
            <div class="overlay"></div>
            <!-- The HTML5 video element that will create the background video on the header -->
            <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                <source src="images/TV.mp4" type="video/mp4">
            </video>

            <!-- The header content -->
            <div class="container h-100">
                <div class="d-flex h-100 text-center align-items-center">
                    <div class="w-100 text-white">
                        <h1 class="display-3">Event Tracker</h1>
                    </div>
                </div>
            </div>

        </header>
    </div>


    </body>
</div>
</html>