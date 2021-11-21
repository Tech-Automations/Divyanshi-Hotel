using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class userClass
    {
        [Required(ErrorMessage = "Please enter the Check in!")]
        public string txtcheckin { get; set; }
        [Required(ErrorMessage = "Please enter the Check out!")]
        public string txtcheckout { get; set; }
        [Required(ErrorMessage = "Please select the Room!")]
        public string DropDownRoom { get; set; }
        [Required]
        public string DropDownAdult { get; set; }
        public string DropDownChildren { get; set; }
        [Required(ErrorMessage ="Please Enter your name!")]
        public string txtname { get; set; }
        [CustomEmailValidator]
        [Required(ErrorMessage = "Please Enter your Email!")]
        public string txtemail { get; set; }
        [Required(ErrorMessage = "Please Enter your Contact No. !")]
        public string txtmobile { get; set; }

    }
    public class userContactClass
    {
        [Required(ErrorMessage = "Please Enter your Name !")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Please Enter your Email !")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Please Enter your Mobile No. !")]
        public string Mobile { get; set; }
        public string Message { get; set; }
    }
}