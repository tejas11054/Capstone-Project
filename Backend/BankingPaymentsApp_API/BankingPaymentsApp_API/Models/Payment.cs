using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId {  get; set; }
        [ForeignKey("PayerAccount")]
        public int PayerAccountId {  get; set; }
        public virtual Account? PayerAccount {  get; set; }
        [ForeignKey("PayeeAccount")]
        public int PayeeAccountId {  get; set; }
        public virtual Account? PayeeAccount { get; set; }
        [Required(ErrorMessage = "Amount is Required!")]
        [DataType(DataType.Currency)]
        public double Amount {  get; set; }
        [Required(ErrorMessage = "CreatedAt is Required!")]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [ForeignKey("PaymentStatus")]
        public int PaymentStatusId { get; set; } = 3;
        public virtual PaymentStatus? PaymentStatus { get; set; }
        [Required(ErrorMessage = "ActionAt is Required!")]
        [DataType(DataType.DateTime)]
        public DateTime ActionAt { get; set; } = DateTime.Now;
        public List<Transaction>? Transactions { get; set; } = new List<Transaction>();
    }
}
