<%--
  Created by IntelliJ IDEA.
  User: GCADAGFISHER
  Date: 6/9/2024
  Time: 5:42 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <%@ include file="./includes/head.jsp"%>
  <script src="./javascript/addEvent.js"></script>
  <script src="./javascript/locations.js"></script>
  <script src="./javascript/Location.js"></script>
  <script src="./javascript/Notebook.js"></script>
  <script src="./javascript/User.js"></script>
  <script src="./javascript/Event.js"></script>
  <script src="./javascript/Artists.js"></script>
  <title>Title</title>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="./css/details.css">
</head>

  <div class="container">
    <%@include file="./includes/nav.jsp"%>
  </div>

<body class="container-fluid">
<div class="hidden" id="user">${sessionScope.user}</div>

<div class="row">
  <div class="card justify-content-evenly">
    <div class="card-body align-items-center">
      <c:import url="includes/notebook-form.jsp"/>
      <c:import url="./includes/event-form.jsp"/>
      <c:import url="./includes/location-form.html"/>
      <c:import url="./includes/artist-form.jsp"/>
    </div>
  </div>
</div>
  <div class="row">
    <div class="card">
      <div class="card-body">

      </div>
    </div>
  </div>
<div class="row">
  <div class="card">
    <div class="card-body">

    </div>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html>
