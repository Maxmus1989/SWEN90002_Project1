<%-- 
    Document   : confirmation
    Created on : Sep 17, 2013, 9:58:23 PM
    Author     : Choong Teik Tan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<%
    // expired || incorrectToken || success || notInQueue || AlreadyMEMBER || emailFail
    String status = (String) request.getAttribute("status");
    String email = request.getParameter("email");
%>

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
                            if(status.equals("success"))
                                out.print("<h2>Registration Complete!!</h2>");
                            else
                                out.print("<h2>Confirmation Error</h2>");
                        %>
                    </div>
                    <div id="c_form" class="roundedCorners">
                        <div id="sub3">
                            <%
                                out.print("<center>");
                                if(status.equals("AlreadyMEMBER")) {
                                    out.print("<h3>Server detected email already registered.</h3>");
                                    out.print("<h2>"+email+"</h2>");
                                    out.print("<br><h2>");
                                    out.print("If you forgot your password,<br><br>Please click ");
                                    out.print("<a href=\"remind.jsp\">HERE</a>");
                                    out.print("</h2>");
                                }
                                else if(status.equals("expired")) {
                                    out.print("<h3>Sorry session expired for</h3>");
                                    out.print("<h2>"+email+"</h2>");
                                    out.print("<p>(Server enforced to confirm within 5 minutes)</p><br>");
                                    out.print("<h2>");
                                    out.print("Please try to register again,<br><br> ");
                                    out.print("<a href=\"index.jsp\">Click ME</a>");
                                    out.print("</h2>");
                                }
                                else if(status.equals("success")) {
                                    out.print("<h3>An Email with Password had just sent to</h3>");
                                    out.print("<h2>"+email+"</h2>");
                                    out.print("<br>Thanks For Joining Us! :)");
                                    out.print("<h2>");
                                    out.print("Login to your account via ..<br>");
                                    out.print("<a href=\"login.jsp\">Login Page</a>");
                                    out.print("</h2>");
                                }
                                else if(status.equals("incorrectToken")) {
                                    out.print("<h3>Incorrect token detected for</h3>");
                                    out.print("<h2>"+email+"</h2>");
                                    out.print("<h2>");
                                    out.print("Please recheck your email and try again.<br><br> ");
                                    out.print("</h2>");
                                    out.print("<p>(Note: Server enforced to confirm within 5 minutes)</p>");
                                }
                                else if(status.equals("notInQueue")) {
                                    out.print("<h3>Incorrect Link Detected</h3>");
                                    out.print("<p>Server did not receive registration request from</p>");
                                    out.print("<h2>"+email+"</h2><br>");
                                    out.print("<h2>");
                                    out.print("Please recheck your email!<br>");
                                    out.print("Or try to register again.<br><br>");
                                    out.print("<a href=\"index.jsp\">To Register</a>");
                                    out.print("</h2>");
                                }
                                else if(status.equals("emailFail")) {
                                    out.print("<h3>Server encounter error sending Email to</h3>");
                                    out.print("<h2>"+email+"</h2>");
                                    out.print("<br><h2>");
                                    out.print("Please try again..");
                                    out.print("</h2>");
                                    out.print("<p>(Note: Server enforced to confirm within 5 minutes)</p>");
                                    out.print("<p>If you unable to confirm within 5 minutes,<br>please try to register again.</p>");
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

