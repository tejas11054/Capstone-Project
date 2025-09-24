using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.Models
{
    public class BankUser : User
    {
<<<<<<< HEAD
=======

>>>>>>> 09f07286fd58509e36d83ca6bdea2ddca0c9ef52
        [Required(ErrorMessage = "Refferal code is Required!")]
        public string RefferalCode { get; set; }
        [Required(ErrorMessage = "branch is Required!")]
        public string Branch {  get; set; }
        public bool isActive { get; set; } = false;
        public IEnumerable<ClientUser> Clients { get; set; } = new List<ClientUser>();
    }
}
