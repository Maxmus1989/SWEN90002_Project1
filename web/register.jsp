<%-- 
    Document   : register
    Created on : Sep 19, 2013, 12:50:45 PM
    Author     : Choong Teik Tan
--%>

<%@page import="java.net.URLDecoder"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<%
    String email = "";
    String token = "";

    Cookie cookie = null;
    Cookie[] cookies = null;
    cookies = request.getCookies();
    if( cookies != null ){
        for (int i = 0; i < cookies.length; i++){
            cookie = cookies[i];
            if(cookie.getName().equals("email"))
                email = URLDecoder.decode(cookie.getValue(), "UTF-8");
            else if(cookie.getName().equals("token")) {
                token = cookie.getValue();
            }
        }
    }

    if (!email.equals("") || !token.equals("")) {
        response.sendRedirect("./member.jsp");
    }
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
    <body id="body">
        <div id="outline">
            <img id="gradient_top" src="./img/gradient.jpg" alt="" class="roundedCorners" />
            <img id="gradient_bottom" class="rotated roundedCorners" src="./img/gradient.jpg" alt="" />

            <div id="header">
                <h3>SWEN90002 - Project 1</h3>
            </div>
            <div id="content">
                <div id="c_body">
                    <div id="wel">
                        <h2>Welcome to Registration Page</h2>
                    </div>
                    <div id="c_form" class="roundedCorners">
                        <div id="instruct">
                            <ul>Please Enter your email address to register.<br>
                               An email will be sent with instructions to activate your account.
                            </ul>
                        </div>
                        <div id="form" class="roundedCorners">
                            <div id="sub">
                                <label class="lable">Email: </label>
                            </div>
                            <div id="sub2">
                                <input id="emailField" type="text" name="email" class="emailStyle">
                            </div>
                            <div id="sub3">
                                <div id="sub4_2_1"><a href="login.jsp">Back To Login</a></div>
                            </div>
                            <div id="sub4"><p class="validateTips"></p></div>
                            <div id="sub_bottom">
                                <button id="register" title="Register">Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
