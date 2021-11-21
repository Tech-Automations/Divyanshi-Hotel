using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Functions;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public static string FromEmail= "info@divanshifoodsnrooms.com";
        public static string AdminMail= "kmr.rishabh6190@gmail.com";
        public static string SubjectContactUs= "User Contact Us Mail";
        public static string SubjectForUserBooking = "User Booking Confimation Mail";
        public static string SubjectForSubscription = "User Subscription Mail";

        public static string BodyForContactUs= @"Hello Admin, <br />
                                        We&#8217;d like to confirm that user <user> has requested for Contacting . <br />
                                        User Details : <br />
                                         Name :<b><name><br /></b>
                                        Email : <b><email><br /></b>
                                        Mobile : <b><mobile> <br /></b>

                                        Thanks & Regards, <br />
                                        <b>Portal Admin</b>";

        public static string BodyForUserBooking = @"Hello Admin, <br />
                                        We&#8217;d like to confirm that user <user> has a booking Request. <br />
                                        User Details : <br />
                                        Name :<b><name><br /></b>
                                        Email : <b><email><br /></b>
                                        Mobile : <b><mobile> <br /></b>
                                        Date Booking From & To : <b><dateFrom> - <dateTo> <br /></b>
                                        <br />
                                        Thanks & Regards, <br />
                                        <b>Portal Admin</b>";

        public static string BodyForSubscription = @"Hello Admin, <br />
                                        We&#8217;d like to confirm that user <user> has a subscription request. <br />
                                        <br />
                                        Thanks & Regards, <br />
                                        <b>Portal Admin</b>";

        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// User Booking Form Data goes here
        /// </summary>
        /// <createdBy>Rees</createdBy>
        /// <returns>success or error</returns>
        /// 
        [HttpPost]
        public JsonResult SubmitForm(userClass data)
        {
            divanshifoodsnroomsEntities et = new divanshifoodsnroomsEntities();
            TBL_M_USER userObj = new TBL_M_USER();
            try
            {
                if (ModelState.IsValid)
                {
                    userObj.Name = data.txtname;
                    userObj.Email = data.txtemail;
                    userObj.Mobile = data.txtmobile;
                    userObj.CheckedIn = data.txtcheckin;
                    userObj.CheckedOut = data.txtcheckout;
                    userObj.Room = Convert.ToInt32(data.DropDownRoom);
                    userObj.Adult = Convert.ToInt32(data.DropDownAdult);
                    userObj.Children = Convert.ToInt32(data.DropDownChildren);
                    userObj.DateCreated = DateTime.Now;
                    et.TBL_M_USER.Add(userObj);
                    EmailModel eml = new EmailModel();
                    eml.From = FromEmail;
                    eml.Subject = SubjectForUserBooking;
                    eml.To = AdminMail;
                    eml.Body = BodyForUserBooking
                        .Replace("<user>", userObj.Name)
                        .Replace("<name>", userObj.Name)
                        .Replace("<email>", userObj.Email)
                        .Replace("<mobile>", userObj.Mobile)
                        .Replace("<dateFrom>", userObj.CheckedIn)
                        .Replace("<dateTo>", userObj.CheckedIn);

                    sendEmail(eml);
                    et.SaveChanges();
                    return Json(new { msg = "success", error = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {

                    return Json(new { msg = "error", error = ModelState.Keys }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception Ex)
            {

                throw Ex;
            }
        }
        [HttpPost]
        public JsonResult SubmitContactForm(userContactClass data)
        {
            divanshifoodsnroomsEntities et = new divanshifoodsnroomsEntities();
            TBL_M_CONTACTUS userObj = new TBL_M_CONTACTUS();
            try
            {
                if (ModelState.IsValid)
                {
                    userObj.Name = data.Name;
                    userObj.Email = data.Email;
                    userObj.Mobile = data.Mobile;
                    userObj.Message = data.Message;
                    userObj.DateCreated = DateTime.Now;
                    et.TBL_M_CONTACTUS.Add(userObj);
                    et.SaveChanges();
                    EmailModel eml = new EmailModel();
                    eml.From = FromEmail;
                    eml.Subject = SubjectContactUs;
                    eml.To = AdminMail;
                    eml.Body = BodyForContactUs
                    .Replace("<name>", userObj.Name)
                    .Replace("<email>", userObj.Email)
                    .Replace("<mobile>", userObj.Mobile);
                    sendEmail(eml);
                    return Json(new { msg = "success", error = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {

                    return Json(new { msg = "error", error = ModelState.Keys }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception Ex)
            {

                throw Ex;
            }
        }
        [HttpPost]
        public JsonResult SubmitSubscription(string Email)
        {
            divanshifoodsnroomsEntities et = new divanshifoodsnroomsEntities();
            TBL_M_SUBSCRIPTIONS userObj = new TBL_M_SUBSCRIPTIONS();
            try
            {
                if (ModelState.IsValid)
                {
                    userObj.Email = Email;
                    userObj.DateCreated = DateTime.Now;
                    et.TBL_M_SUBSCRIPTIONS.Add(userObj);
                    et.SaveChanges();
                    EmailModel eml = new EmailModel();
                    eml.From = FromEmail;
                    eml.Subject = SubjectForSubscription;
                    eml.To = AdminMail;
                    eml.Body = BodyForSubscription
                    .Replace("<email>", userObj.Email);

                    sendEmail(eml);
                    return Json(new { msg = "success", error = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {

                    return Json(new { msg = "error", error = ModelState.Keys }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception Ex)
            {

                throw Ex;
            }
        }

        public static void sendEmail(EmailModel _objModelMail)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.To.Add(_objModelMail.To);
                mail.From = new MailAddress(_objModelMail.From);
                mail.Subject = _objModelMail.Subject;
                string Body = _objModelMail.Body;
                mail.Body = Body;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtpout.secureserver.net";
                smtp.Port = 25;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new System.Net.NetworkCredential("info@divanshifoodsnrooms.com", "Divanshi@123"); // Enter seders User name and password  
                smtp.EnableSsl = false;
                smtp.Send(mail);
            }
            catch (Exception Ex)
            {

            }
        }

    }
}