using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.Models
{
    public class Account
    {
        [Key]
        public int AccountId {  get; set; }
        [Required(ErrorMessage = "Account Number is Required!")]
        [RegularExpression(@"^BPA\d{8}[A-Z0-9]{6}$", ErrorMessage ="Account Number is Not Valid")]
        public string AccountNumber {  get; set; }
        [ForeignKey("ClientUser")]
        public int? ClientId {  get; set; }
        public virtual ClientUser? ClientUser { get; set; }
        [Required(ErrorMessage = "Balance in Required!")]
        [DataType(DataType.Currency)]
        public double Balance { get; set; } = 0;
        [Required(ErrorMessage = "Account Type is Required!")]
        [ForeignKey("AccountType")]
        public int AccountTypeId { get; set; }
        public virtual AccountType? AccountType { get; set; }
        [Required(ErrorMessage = "Account Status is Required!")]
        [ForeignKey("AccountStatus")]
        public int AccountStatusId { get; set; }
        public virtual AccountStatus? AccountStatus { get; set; } 
        [Required(ErrorMessage = "Account Creation Date is Required!")]
        [DataType(DataType.Date)]
        public DateTime CreatedAt {  get; set; } = DateTime.Now.Date;
        public virtual List<int>? TransactionIds { get; set; } = new List<int>();
    }
}
