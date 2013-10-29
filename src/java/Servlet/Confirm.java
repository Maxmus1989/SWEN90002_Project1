/********************************************************
* Student Name: Choong Teik Tan                         *
* Student Number: 568701                                *
* Student Email: choongt@student.unimelb.edu.au         *
* File: Confirm.java <servlet> (SWEN90002 Project 1)    *
********************************************************/

package Servlet;

import Entity.BindingsUserDB;
import Entity.Registration;
import Entity.User;
import SendEmail.SendEmail;
import SendEmail.SentInternalMail;
import Util.EmailValidator;
import Util.MessageCreator;
import Util.RandomGenerator;
import java.io.IOException;
import java.util.Iterator;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Confirm extends HttpServlet {

    private static final String jspReporter = "confirmation.jsp";

    private static BindingsUserDB userDB = null;

    // This Happens Once and is Reused
    @Override
    public void init(ServletConfig config) throws ServletException
    {
               super.init(config);

               try {
                   // create new database binding class
                   userDB = new BindingsUserDB();
               }
               catch(Exception e) {
                    System.out.println(e.getMessage());
               }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        String email = request.getParameter("email").toLowerCase();
        String token = request.getParameter("token");
        String status = new String();

        // validate email if pass, generate token then create email.
        EmailValidator emailValidator = new EmailValidator();
        if (emailValidator.isValidate(email)) {
            // check if already register!! (database check)
            if(userDB.find(email)) {
                status = "AlreadyMEMBER";
            }
            else {
                Registration previousRecord = null;
                if (!Register.registrationQueue.isEmpty()) {
                    Iterator x = Register.registrationQueue.listIterator();
                    while(x.hasNext() && previousRecord == null) {
                        Registration a = (Registration)(x.next());
                        if(a.getEmail().equals(email)) {
                            previousRecord = a;
                        }
                    }
                }

                if(previousRecord != null) {
                    // it take more then 5 minutes to click on the link.
                    if(previousRecord.compareTime() > Register.FIVE_MINUTES) {
                        status = "expired";
                        Register.registrationQueue.remove(previousRecord);
                    }
                    // wrong token case
                    else if (!previousRecord.getToken().equals(token)) {
                        status = "incorrectToken";
                    }
                    // else then create (add to database & remove from queue)
                    else {
                        String password = RandomGenerator.generateSessionKey(6);
                        User newUser = new User(email, password);
                        if(userDB.save(newUser)) { // success added to database
                            String subject = MessageCreator.getSuccessRegistrationSubjectTitle();
                            // Use _HTML for SendMail, Use _TEXT for SendInternalMail
                            String message = MessageCreator.createSuccessRegistrationMessage_TEXT(password, email);
                            //String message = MessageCreator.createSuccessRegistrationMessage_HTML(password, email);
                            // Send Internal Mail (SendMail working in VM via my account)
                            if (new SentInternalMail().sendEmail(subject, message, email)) {
                            //if (new SendEmail().sendEmail(subject, message, email)) {
                                // success send email then remove from queue.
                                status = "success";
                                Register.registrationQueue.remove(previousRecord);
                            }
                            else {
                                // delete from database (rollback)
                                userDB.delete(email);
                                status = "emailFail";
                            }
                        }
                    }
                }
                else { // no email record in queue. (modified link)
                    status = "notInQueue";
                }
            }
        }
        else {
            status = "notInQueue";
        }
        

        request.setAttribute("status", status);
        
        RequestDispatcher dispatch = request.getRequestDispatcher(jspReporter);
        dispatch.forward(request, response);
    } 

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
    }

}
