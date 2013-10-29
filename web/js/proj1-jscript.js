/****************************************************
* Student Name: Choong Teik Tan                     *
* Student Number: 568701                            *
* Student Email: choongt@student.unimelb.edu.au     *
* File: proj1-jscript.js (SWEN90002 Project 1)      *
****************************************************/


$(document).ready(function(){
    // unblock when ajax activity stops
    //$(document).ajaxStop($.unblockUI);
    var email = $('#emailField');
    var remind = $('#remindField');
    var login = $('#loginField');
    var passW = $('#passwordField');

    $("#delete").click(function(e){
        e.preventDefault();
        
        $('#confirm').bPopup({
            modalClose: false,
            opacity: 0.6,
            positionStyle: 'fixed' //'fixed' or 'absolute'
        });
        
    });

    $('#yes').click(function() {
        // update the block message
        $.blockUI({ message: "<h1>Delete In Processes...</h1>" });

        if($.cookie("email") == null || $.cookie("token") == null) {
            $.unblockUI();  // unblocking UI
            $('#confirm').bPopup().close();
            $.blockUI({
                theme:     true,
                title:    "Error Occur",
                message:  "No Security Token Found!<br>You Are Forced to Logout..<br>Please Relogin and Try Again..",
                timeout:   5000,
                onOverlayClick: $.unblockUI,
                onUnblock: function(){
                    $.removeCookie('email');
                    $.removeCookie('token');
                    window.location.replace("login.jsp");
                }
            });
        }
        else {
            $.ajax({
                type: "POST",
                data: {email: $.cookie("email"), token: $.cookie("token")},
                url: "Delete",
                success: function(data){
                    $('#confirm').bPopup().close();

                    var deleted = data.deleted;
                    var status = data.status;
                    var title = "Delete Registration Complete";
                    var message = "You Are Now Successfully Delete Registration..<br>You Will Need to Register To Use Our Service..<br>BYE!";

                    if(!deleted) {
                        title = 'Invalid Security Token';
                        message = 'Security Token Is Not Valid!<br>Sorry You Are Now Forced To Logout..<br>Please Re-login And Try Again..';
                    }

                    $.unblockUI();

                    $.blockUI({
                        theme:     true,
                        title:    title,
                        message:  message,
                        timeout:   5000,
                        onOverlayClick: $.unblockUI,
                        onUnblock: function(){
                            $.removeCookie('email');
                            $.removeCookie('token');
                            window.location.replace("login.jsp");
                        }
                    });
                },
                error: function () {
                    //alert("Error accour.\nPlease try again..");
                    $.unblockUI();  // unblocking UI
                    $('#confirm').bPopup().close();
                    $.blockUI({
                        theme:     true,
                        title:    "Error Occur",
                        message:  "No Security Token Found!<br>You Are Forced to Logout..<br>Please Relogin and Try Again..",
                        timeout:   5000,
                        onOverlayClick: $.unblockUI,
                        onUnblock: function(){
                            $.removeCookie('email');
                            $.removeCookie('token');
                            window.location.replace("login.jsp");
                        }
                    });
                }
            });
        }
    });

    $('#no').click(function() {
        $('#confirm').bPopup().close();
        $.unblockUI();
        return false;
    });

    $("#reset").click(function(){
        $.blockUI({css: {  // blocking UI
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }});

        if($.cookie("email") == null || $.cookie("token") == null) {
            $.unblockUI();  // unblocking UI
            $('#confirm').bPopup().close();
            $.blockUI({
                theme:     true,
                title:    "Error Occur",
                message:  "No Security Token Found!<br>You Are Forced to Logout..<br>Please Relogin and Try Again..",
                timeout:   5000,
                onOverlayClick: $.unblockUI,
                onUnblock: function(){
                    $.removeCookie('email');
                    $.removeCookie('token');
                    window.location.replace("login.jsp");
                }
            });
        }
        else {
            $.ajax({
                type: "POST",
                data: {email: $.cookie("email"), token: $.cookie("token")},
                url: "Reset",
                success: function(data){
                    var reset = data.reset;
                    var status = data.status;
                    $.unblockUI();  // unblocking UI

                    if(reset) {
                        $.growlUI('Password Reset Success!', 'A NEW Password had sent to your Email!');
                    }
                    else {
                        var title = 'Server Error!';
                        var message = 'Sorry, Could\'t Processes Your Request At The Moment..<br>Please Try Again Later..';

                        if(status === "incorrectToken" || status === "notAMember") {
                            title = 'Invalid Security Token';
                            message = 'Security Token Is Not Valid!<br>Sorry You Are Now Forced To Logout..<br>Please Re-login And Try Again..';
                            $.blockUI({
                                theme:     true,
                                title:    title,
                                message:  message,
                                timeout:   5000,
                                onOverlayClick: $.unblockUI,
                                onUnblock: function(){
                                    $.removeCookie('email');
                                    $.removeCookie('token');
                                    window.location.replace("login.jsp");
                                }
                            });
                        }
                        else {
                            $.blockUI({
                                theme:     true,
                                title:    title,
                                message:  message,
                                timeout:   5000,
                                onOverlayClick: $.unblockUI
                            });
                        }
                    }
                },
                error: function () {
                    //alert("Error accour.\nPlease try again..");
                    $.unblockUI();  // unblocking UI
                    $.blockUI({
                        theme:     true,
                        title:    "Error Occur",
                        message:  "No Security Token Found!<br>You Are Forced to Logout..<br>Please Relogin and Try Again..",
                        timeout:   5000,
                        onOverlayClick: $.unblockUI,
                        onUnblock: function(){
                            $.removeCookie('email');
                            $.removeCookie('token');
                            window.location.replace("login.jsp");
                        }
                    });
                }
            });
        }
    });

    $("#logout").click(function(){
        //alert ($.cookie("email")+"\n"+$.cookie("token"));
        if($.cookie("email") == null || $.cookie("token") == null) {
            $.unblockUI();  // unblocking UI
            $('#confirm').bPopup().close();
            $.blockUI({
                theme:     true,
                title:    "Error Occur",
                message:  "No Security Token Found!<br>You Are Forced to Logout..<br>Please Relogin and Try Again..",
                timeout:   5000,
                onOverlayClick: $.unblockUI,
                onUnblock: function(){
                    $.removeCookie('email');
                    $.removeCookie('token');
                    window.location.replace("login.jsp");
                }
            });
        }
        else {
            $.ajax({
                type: "POST",
                data: {email: $.cookie("email"), token: $.cookie("token")},
                url: "Logout",
                success: function(data){
                    var logout = data.logout;
                    var status = data.status;
                    if(logout) {
                        $.removeCookie('email');
                        $.removeCookie('token');
                        window.location.replace("login.jsp");
                    }
                    else {
                        var title = '';
                        var message = '';

                        if(status === "incorrectToken") {
                            title = 'Invalid Security Token';
                            message = 'Security Token Is Not Valid!<br>Sorry You Are Now Forced To Logout..<br>Please Re-login And Try Again..';
                        }
                        else {
                            title = "Error Accour!";
                            message = "Sorry You Are Now Forced To Logout..<br>Please Try Re-login And Proceed Request Again..";
                        }

                        $.blockUI({
                            theme:     true,
                            title:    title,
                            message:  message,
                            timeout:   5000,
                            onOverlayClick: $.unblockUI,
                            onUnblock: function(){
                                $.removeCookie('email');
                                $.removeCookie('token');
                                window.location.replace("login.jsp");
                            }
                        });
                    }
                },
                error: function () {
                    //alert("Error accour.\nPlease try again..");
                    $.unblockUI();  // unblocking UI
                    $.blockUI({
                        theme:     true,
                        title:    "Error Occur",
                        message:  "No Security Token Found!<br>You Are Forced to Logout..<br>Please Relogin and Try Again..",
                        timeout:   5000,
                        onOverlayClick: $.unblockUI,
                        onUnblock: function(){
                            $.removeCookie('email');
                            $.removeCookie('token');
                            window.location.replace("login.jsp");
                        }
                    });
                }
            });
        }
    });

    $("#login").click(function(){
        var emailAdd = $('#loginField').val();
        var password = $('#passwordField').val();

        var isValid = true;
        isValid = isValid && checkLength( login, "email", 6, 80 );
        isValid = isValid && checkRegexp( login, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. xxx@student.unimelb.edu.au" );

        var EmptyPasswordCheck = password.replace(/^\s+|\s+$/, '');

        
        if(isValid) {
            // check NOT  EMPTY password
            if (EmptyPasswordCheck.length == 0) {
                $('#passwordField').addClass( "ui-state-error" );
                updateTips("Password Must Not Be Empty!");
            }
            else {
                $(".validateTips" ).text("");
                $('#passwordField').val("");

                $.blockUI({css: {  // blocking UI
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }});

                callLogin(emailAdd, password);
            }
        }

    });

    function callLogin (emailAdd, password) {
        //alert(localStorage['email']+"\n"+localStorage['login']+"\n"+localStorage['token'])
        $.ajax({
            type: "POST",
            data: {email: emailAdd, password: password},
            url: "Login",
            success: function(data){
                var success = data.success;
                var status = data.status;
                var token = data.token;
                var repliedEmail = data.email;
                
                $.unblockUI();  // unblocking UI
                // invalidEmail || notAMember || incorrectPassword || login
                if (success) {
                    // use cookie to store email and token (expire 1 hours later)
                    $.cookie("email", repliedEmail, { expires: 1 });
                    $.cookie("token", token, { expires: 1 });
                    window.location.replace("member.jsp");
                }
                else {
                    var title = '';
                    var message = '';
                    
                    if (status === "invalidEmail") {
                        title = 'Invalid Email';
                        message = '<p>Invalid Email Detedted!<br>Please Recheck Your Email Field.</p>';
                    }
                    else if(status === "Error") {
                        title = 'Unknow Error Occur';
                        message = '<p>Please Try Again Later..<br>If it happen again please Report to choongt@student.unimelb.edu.au</p>';
                    }
                    else if ((status === "notAMember") || (status === "incorrectPassword")) {
                        title = 'Incorrect Data Detected!';
                        message = '<p>Server Detected You Are Trying To Login<br>To Account: ('+repliedEmail+')!<br>If Not Please Recheck Your Email Field AND Makesure You Enter Correct Password.</p>';
                    }
                    // Too Details Information will lead to easy break the system. (So I decide not to specify which details is incorrect)
                    /*
                    else if(status === "notAMember") {
                        title = 'No Such User';
                        message = '<p>Email ('+repliedEmail+') Not Yet Register As Member!<br>Please Recheck Your Email Field Or Register As Member.</p>';
                    }
                    else if(status === "incorrectPassword") {
                        title = 'Incorrect Password';
                        message = '<p>Incorrect Password Detedted for ('+repliedEmail+')<br>Please Try Again Or Request For Password Reminder.</p>';
                    }
                    */
                    
                    $.blockUI({
                        theme:     true,
                        title:    title,
                        message:  message,
                        timeout:   5000,
                        onOverlayClick: $.unblockUI
                    });
                }
            },
            error: function () {
                alert("Error accour.\nPlease try again..");
                $.unblockUI();  // unblocking UI
            }
        });
    }
    
    // trigger "#login" button when 'Enter' key is pressed inside "#passwordField"
    $("#passwordField").keyup(function(event){
        if(event.keyCode == 13){
            $("#login").click();
        }
    });

    // check valid email address before send
    $("#remind").click(function(){
        var emailAdd = $('#remindField').val();
        var isValid = true;
        isValid = isValid && checkLength( remind, "email", 6, 80 );
        isValid = isValid && checkRegexp( remind, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. xxx@student.unimelb.edu.au" );
        if(isValid) {
            $(".validateTips" ).text("");
            $('#remindField').val("");

            $.blockUI({css: {  // blocking UI
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }});

            reminder(emailAdd);
        }
        else {}
    });

    // trigger "#login" button when 'Enter' key is pressed inside "#loginField"
    $("#loginField").keyup(function(event){
        if(event.keyCode == 13){
            $("#login").click();
        }
    });

    // trigger "#remind" button when 'Enter' key is pressed inside "#remindField"
    $("#remindField").keyup(function(event){
        if(event.keyCode == 13){
            $("#remind").click();
        }
    });

    // check valid email address before send
    $("#register").click(function(){
        var emailAdd = $('#emailField').val();
        var isValid = true;
        isValid = isValid && checkLength( email, "email", 6, 80 );
        isValid = isValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. xxx@student.unimelb.edu.au" );
        if(isValid) {
            $(".validateTips" ).text("");
            $('#emailField').val("");
            
            $.blockUI({css: {  // blocking UI
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }});
            
            register(emailAdd);
        }
        else {}
    });

    // trigger "#register" button when 'Enter' key is pressed inside "#emailField"
    $("#emailField").keyup(function(event){
        if(event.keyCode == 13){
            $("#register").click();
        }
    });

    function updateTips( t ) {
        $( ".validateTips" ).text( t ).addClass( "ui-state-highlight" );

        setTimeout(function() {
            $( ".validateTips" ).removeClass( "ui-state-highlight", 1500 );
            email.removeClass( "ui-state-error");
            remind.removeClass( "ui-state-error");
            login.removeClass( "ui-state-error");
            passW.removeClass( "ui-state-error");
            //$( ".validateTips" ).text("")
        }, 1000 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " + min + " and " + max + "." );
            return false;
        } else {
            email.removeClass( "ui-state-error" );
            remind.removeClass( "ui-state-error");
            login.removeClass( "ui-state-error");
            passW.removeClass( "ui-state-error");
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        email.removeClass( "ui-state-error" );
        remind.removeClass( "ui-state-error");
        login.removeClass( "ui-state-error");
        passW.removeClass( "ui-state-error");
        return true;
      }
    }

    function reminder (emailAdd) {
        $.ajax({
            type: "POST",
            data: {email: emailAdd},
            url: "Reminder",
            success: function(data){
                $.unblockUI();  // unblocking UI
                showConfirmationResult (data);
            },
            error: function () {
                alert("Error accour.\nPlease try again..");
                $.unblockUI();  // unblocking UI
            }
        });
    }

    function showConfirmationResult (dataToSend) {
        $.ajax({
            type: "POST",
            data: dataToSend,
            url: "showmessage.jsp",
            success: function(data){
               $('#r_body').html(data);
            }
        });
    }

    function showRegistrationResult (data) {
        $.ajax({
            type: "POST",
            data: data,
            url: "showregister.jsp",
            success: function(data){
                $('#body').html(data);
            }
        });
    }

    function register (emailAdd) {
        $.ajax({
           type: "POST",
            data: {email: emailAdd},
            url: "Register",
            success: function(data){
                
                $.unblockUI();  // unblocking UI
                var dataString ={"serverreply":data.serverreply, "email":data.email, "status":data.status};

                if (data.status === "reregister") {
                    $.blockUI({
                        theme:     true,
                        title:    'Sorry',
                        message:  '<p>Server encountered an error processing registration.<br>Please try again later.</p>',
                        timeout:   5000,
                        onOverlayClick: $.unblockUI
                    });
                }
                else {
                    showRegistrationResult(dataString);
                }
            },
            error: function () {
                alert("Error accour.\nPlease try again..");
            }
        });
    }

    // resize to fit display to browser.
    jQuery.fn.WindowResizer = function() {
        if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
            $(".emailStyle").width($("#sub2").width()*0.95);
        }
        else {
            $(".emailStyle").width($("#sub2").width());
        }
    }

    // call update content and resize window when first load of index.jsp
    $(window).load(function(){
        $(this).WindowResizer();
    });

    //  call when detected user change the size of browser.
    $(window).resize(function(){
        $(this).WindowResizer();
    });
});

// cookie expire
function getExpiresMinutes (minutes) {
    var date = new Date();
    //var minutes = 30; // 30 minutes
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    return date;
}
