using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.Models
{
    public class BankUser : User
    {
        public int? AccountId { get; set; }

        [Required(ErrorMessage = "Refferal code is Required!")]
        public string RefferalCode { get; set; }
        [Required(ErrorMessage = "branch is Required!")]
        public string Branch {  get; set; }
        public bool KycVierified { get; set; } = false;
        public List<int> ClientIds { get; set; } = new List<int>();
    }
}
