using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Models
{
    public enum AccType { SAVINGS, CURRENT, SALARY }
    public class AccountType
    {
        [Key]
        public int TypeId { get; set; }
        [Required(ErrorMessage = "Type is Required!")]
        public AccType Type { get; set; }
    }
}
