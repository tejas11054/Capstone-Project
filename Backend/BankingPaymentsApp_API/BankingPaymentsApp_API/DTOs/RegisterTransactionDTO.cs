using BankingPaymentsApp_API.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.DTOs
{
    public class RegisterTransactionDTO
    {
        public int AccountId { get; set; }
        public int PayementId { get; set; }
        public int TransactionTypeId { get; set; }
        [Required(ErrorMessage = "Transaction Amount is Required!")]
        [DataType(DataType.Currency)]
        public double Amount { get; set; }
    }
}
