using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId {  get; set; }
        [ForeignKey("Account")]
        public int AccountId {  get; set; }
        public virtual Account? Account { get; set; }
        [ForeignKey("Payment")]
        public int PayementId {  get; set; }
        public virtual Payment? Payment { get; set; }
        [Required(ErrorMessage ="Transaction Type is Required!")]
        [ForeignKey("TransactionType")]
        public int TransactionTypeId { get; set; }
        public virtual TransactionType? TransactionType { get; set; } 
        [Required(ErrorMessage = "Transaction Amount is Required!")]
        [DataType(DataType.Currency)]
        public int Amount {  get; set; }
        [Required(ErrorMessage = "Transaction Date is Required!")]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
