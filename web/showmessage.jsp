<%-- 
    Document   : showmessage
    Created on : Sep 18, 2013, 1:59:20 PM
    Author     : maxmus
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<%
    String email = request.getParameter("email");
    String status = request.getParameter("status");
    String title = request.getParameter("title");
    String serverreply = request.getParameter("serverreply");
%>

<!--% response.setHeader("Refresh", "3;url=index.jsp"); %-->

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <link href="http://www.choongteik-tan.info/SWEN90002/lab2/sol/jquery/jquery-ui-1.10.3.custom/css/ui-lightness/jquery-ui-1.10.3.custom.css" rel="stylesheet">
        <script type="text/javascript"  src="http://www.choongteik-tan.info/SWEN90002/lab2/sol/jquery/jquery-ui-1.10.3.custom/js/jquery-1.9.1.js"></script>
        <script type="text/javascript" src="http://www.choongteik-tan.info/SWEN90002/lab2/sol/jquery/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
        <script type="text/javascript" src="http://www.choongteik-tan.info/SWEN90002/lab2/sol/jquery/jquery-1.10.2.min.js"></script>

        <link rel="stylesheet" type="text/css" href="./css/proj1-style.css">
        <script type="text/javascript"  src="./js/proj1-jscript.js"></script>
        <script type="text/javascript" src="./jquery/bpopup-0.9.4.min.js"></script>
        <script type="text/javascript" src="./jquery/jquery.blockUI.js"></script>
        <title>SWEN90002 Project 1 (Registration System)</title>
    </head>
    <body>
        <div id="outline">
            <img id="gradient_top" src="./img/gradient.jpg" alt="" class="roundedCorners" />
            <img id="gradient_bottom" class="rotated roundedCorners" src="./img/gradient.jpg" alt="" />

            <div id="header">
                <h3>SWEN90002 - Project 1</h3>
            </div>
            <div id="content">
                <div id="c_body">
                    <div id="wel">
                        <%
                            out.print("<h2>"+title+"</h2>");
                        %>
                    </div>
                    <div id="c_form" class="roundedCorners">
                        <div id="sub3">
                            <%
                                out.print("<center>");
                                    out.print("<h3>"+serverreply+"</h3>");
                                    out.print("<br><h2>");
                                    out.print(email);
                                    out.print("</h2>");
                                out.print("</center>");
                            %>
                        </div>
                        <div id="sub_bottom">
                            <a href="login.jsp">Back To Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
