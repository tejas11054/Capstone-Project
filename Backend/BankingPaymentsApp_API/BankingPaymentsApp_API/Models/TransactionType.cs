using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Models
{
    public enum TxnType { CREDIT, DEBIT}
    public class TransactionType    
    {
        [Key]
        public int TypeId { get; set; }
        [Required(ErrorMessage = "Type is Required!")]
        public TxnType Type { get; set; }
    }
}
