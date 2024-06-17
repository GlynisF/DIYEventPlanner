<%--
  Created by IntelliJ IDEA.
  User: GCADAGFISHER
  Date: 3/12/2024
  Time: 3:54 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<%@include file="includes/head.jsp" %>
<body class="container mx-auto">
<div class="row">
    <h1>Login / Signup</h1>
</div>

<div class="container mx-auto">
    <form action="login" class="row" method="post" autocomplete="off">
        <div class="col-md-6">
            <label class="visually-hidden" for="username">Username</label>
            <div class="input-group">
                <div class="input-group-text">@</div>
                <input type="text" class="form-control" name="username" id="username" placeholder="usernames" required>
            </div>
        </div>
        <div class="col-md-6">
            <label for="password" class="visually-hidden">Password</label>
            <input type="password" class="form-control" name="password" id="password" placeholder="password" required>
        </div>
        <button type="submit" class="btn btn-secondary">Login</button>
    </form>
</div>

</body>
</html>