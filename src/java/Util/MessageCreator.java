/**********************************************************
* Student Name: Choong Teik Tan                           *
* Student Number: 568701                                  *
* Student Email: choongt@student.unimelb.edu.au           *
* File: MessageCreator.java <Util> (SWEN90002 Project 1)  *
**********************************************************/

package Util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MessageCreator {

    final static private String confirmationSubjectTitle = "SWEN90002-03 Project 1 (Registration Confirmation)";
    final static private String confirmation_msg_first = "Hi There!<br><br>"
            + "Somebody, probably you, has registered your email address.<br>"
            + "Click the following link to confirm registration:<br><br>";
    final  static private String confirmation_msg_last ="<br><br>"
                    + "Best!<br>"
                    + "Choong Teik Tan";

    final static private String confirmation_msg_first_text = "Hi There!\n\n"
            + "Somebody, probably you, has registered your email address.\n"
            + "Click the following link to confirm registration:\n\n";
    final  static private String confirmation_msg_last_text ="\n\n"
                    + "Best!\n"
                    + "Choong Teik Tan";

    final static private String successRegistrationSubjectTitle = "SWEN90002-03 Project 1 (Success Registration)";
    final static private String successReg_msg_first = "Hi There!<br><br>Your login ID for proj1 account is: ";
    final static private String successReg_msg_second = "<br>The password for your proj1 account is: ";
    final static private String successReg_msg_last = "<br>Keep it secret, keep it safe.<br><br>"
                    + "http://swen90002-03.cis.unimelb.edu.au:8080/proj1/login.jsp<br><br>"
                    + "Best!<br>"
                    + "Choong Teik Tan";

    final static private String successReg_msg_first_text = "Hi There!\n\nYour login ID for proj1 account is: ";
    final static private String successReg_msg_second_text = "\nThe password for your proj1 account is: ";
    final static private String successReg_msg_last_text = "\nKeep it secret, keep it safe.\n\n"
                    + "http://swen90002-03.cis.unimelb.edu.au:8080/proj1/login.jsp\n\n"
                    + "Best!\n"
                    + "Choong Teik Tan";

    final static private String reminderSubjectTitle = "SWEN90002-03 Project 1 (Password Reminder)";
    final static private String resetPasswordSubjectTitle = "SWEN90002-03 Project 1 (New Password)";

    public MessageCreator() {}

    // Get title for Confirmation Email
    public static String getConfirmationSubjectTitle() {
        return confirmationSubjectTitle;
    }

    // Create conformation message (HTML)
    public static String createConfirmationMessage_HTML(String token, String email) {

        //String URL = "http://192.168.1.6:8082/proj1/confirm?token="+token+"&email=";
        String URL = "http://swen90002-03.cis.unimelb.edu.au:8080/proj1/confirm?token="+token+"&email=";
        
        try {
            URL += URLEncoder.encode(email, "ISO-8859-1"); // Or "UTF-8".
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(MessageCreator.class.getName()).log(Level.SEVERE, null, ex);
            return "";
        }

        return (confirmation_msg_first + URL + confirmation_msg_last);
    }

    // Create conformation message (TEXT)
    public static String createConfirmationMessage_TEXT(String token, String email) {

        //String URL = "http://192.168.1.6:8082/proj1/confirm?token="+token+"&email=";
        String URL = "http://swen90002-03.cis.unimelb.edu.au:8080/proj1/confirm?token="+token+"&email=";

        try {
            URL += URLEncoder.encode(email, "ISO-8859-1"); // Or "UTF-8".
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(MessageCreator.class.getName()).log(Level.SEVERE, null, ex);
            return "";
        }

        return (confirmation_msg_first_text + URL + confirmation_msg_last_text);
    }

    // Get title for Confirmation Email
    public static String getSuccessRegistrationSubjectTitle() {
        return successRegistrationSubjectTitle;
    }

    // Create conformation message (HTML)
    public static String createSuccessRegistrationMessage_HTML(String password, String email) {
        return (successReg_msg_first + email + successReg_msg_second + password + successReg_msg_last);
    }

    // Create conformation message (TEXT)
    public static String createSuccessRegistrationMessage_TEXT(String password, String email) {
        return (successReg_msg_first_text + email + successReg_msg_second_text + password + successReg_msg_last_text);
    }

    // Get title for Password Reminder Email
    public static String getReminderSubjectTitle() {
        return reminderSubjectTitle;
    }

    // Get title for Password Reminder Email
    public static String getResetPasswordSubjectTitle() {
        return resetPasswordSubjectTitle;
    }
}
