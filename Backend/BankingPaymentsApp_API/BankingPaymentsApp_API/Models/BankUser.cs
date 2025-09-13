using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Models
{
    public class BankUser : User
    {
        [Required(ErrorMessage = "Refferal code is Required!")]
        public string RefferalCode { get; set; }
        [Required(ErrorMessage = "branch is Required!")]
        public string Branch {  get; set; }
    }
}
