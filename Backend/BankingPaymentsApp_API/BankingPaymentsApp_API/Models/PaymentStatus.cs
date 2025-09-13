using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Models
{
    public enum PayStatus { APPROVED, DECLINED, PENDING }
    public class PaymentStatus
    {
        [Key]
        public int StatusId { get; set; }
        [Required(ErrorMessage = "Status is Required!")]
        public PayStatus Status { get; set; }
    }
}
