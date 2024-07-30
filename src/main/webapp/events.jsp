<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: GCADAGFISHER
  Date: 5/13/2024
  Time: 2:29 AM
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@ include file="./includes/head.jsp" %>
    <script src="./javascript/artist.js"></script>
    <script src="./javascript/locations.js"></script>
    <script src="./javascript/Location.js"></script>
    <script src="./javascript/Notebook.js"></script>
    <script src="./javascript/User.js"></script>
    <script src="./javascript/Artists.js"></script>
    <script src="javascript/Events.js"></script>
    <script src="./javascript/display.js"></script>

    <title>Title</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./css/details.css">
</head>

<body class="container-fluid">

    <%@ include file="./includes/nav.jsp" %>


<c:set var="user" value="${sessionScope.user}" scope="application"/>
<div class="hidden" data-user="${user}"></div>

<div class="row mt-5 mx-auto justify-content-evenly">
    <div class="col-sm-3 w-50 mb-3">
        <div class="card">
            <div class="card-body">
                <div class="accordion accordion-flush" id="accordion"></div>
            </div>
        </div>
    </div>

    <div class="col-sm-9">
        <div class="card mw-100">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="true" href="#">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
            </div>
            <div class="card-body" id="detailsCard">
                <h5 class="card-title">Special title treatment</h5>
                <div class="container mx-auto mb-5" id="eventContainer"></div>
                <c:import url="./includes/event-form.jsp"/>
                <div class="container mx-auto mb-3" id="artistContainer"></div>
                <c:import url="./includes/location-form.html"/>
                <div class="row mb-3 g-3">
                    <button type="button" class="btn btn-sm btn-outline-success col-sm-3" id="addEvent">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>
</html>
