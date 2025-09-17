using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.Models
{
    public class SalaryDisbursement
    {
        [Key]
        public int SalaryDisbursementId { get; set; }
        [ForeignKey("ClientUser")]
        public int ClientId {  get; set; }
        public virtual ClientUser? ClientUser { get; set; }
        [Required(ErrorMessage = "Total Amount is Required!")]
        [DataType(DataType.Currency)]
        public decimal TotalAmount { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime DisbursementDate { get; set; } = DateTime.UtcNow;
        public virtual ICollection<DisbursementDetails> DisbursementDetailId { get; set; } = new List<DisbursementDetails>();

    }
}
