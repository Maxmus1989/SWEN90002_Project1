<%-- 
    Document   : sent
    Created on : Sep 16, 2013, 3:19:22 PM
    Author     : Choong Teik Tan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<%
    String email = request.getParameter("email");
    String serverreply = request.getParameter("serverreply");
    String status = request.getParameter("status");
    boolean alreadyMember = status.equals("AlreadyMEMBER");
    if (alreadyMember)
        response.setHeader("Refresh", "3;url=index.jsp");
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
                            if(status.equals("error")) {
                                out.print("<h2>Invalid Email Address!</h2>");
                            }
                            else if(alreadyMember)
                                out.print("<h2>Email Been Registered</h2>");
                            else
                                out.print("<h2>Registration Instruction Sent</h2>");
                        %>
                    </div>
                    <div id="c_form" class="roundedCorners">
                        <div id="sub3">
                            <%
                                out.print("<center>");
                                if(status.equals("error")) {
                                    out.print("<h3>Invalid Email Address Detected!</h3>");
                                    out.print("<h2>"+email+"</h2><br><br>");
                                    out.print("<A HREF=\"javascript:history.go(0)\">Try Again</A>");
                                }
                                else if(alreadyMember) {
                                    out.print("<h3>Server detected email already registered.</h3>");
                                    out.print("<h2>"+email+"</h2>");
                                    out.print("<br><h2>");
                                    out.print("If you forgot your password,<br><br>Please click ");
                                    out.print("<a href=\"remind.jsp\">HERE</a>");
                                    out.print("</h2>");
                                }
                                else {
                                   out.print("<h3>Please check your email to complete registration.</h3>");
                                   out.print("<h2>"+serverreply+"</h2>");
                                }
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
