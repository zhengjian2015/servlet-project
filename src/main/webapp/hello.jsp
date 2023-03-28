<html>
<head>
    <%@ page import="java.io.*" %>
    <%@ page import="java.util.*" %>
    <%@ page import="java.time.*" %>
    <title>Hello World - JSP</title>
</head>
<body>
    <%-- JSP Comment --%>
    <h1>Hello World!</h1>
    <p>
    <%
         out.println("Your IP address is ");
    %>
    <span style="color:red">
        <%= request.getRemoteAddr() %>
    </span>
    </p>

    <p>  <%    out.println("Time is ");  %>
     <span style="color:red">
         <% LocalDateTime s =LocalDateTime.now(); %>
         <%= s %>
         <%= s.toLocalDate() %>
         <%= s.toLocalTime() %>
     </span>
  </p>
</body>
</html>
