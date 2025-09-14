using BankingPaymentsApp_API.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.DTOs
{
    public class PaymentDTO
    {
        public int PayerAccountId { get; set; }
        public int PayeeAccountId { get; set; }
        [Required(ErrorMessage = "Amount is Required!")]
        [DataType(DataType.Currency)]
        public double Amount { get; set; }
    }
}
