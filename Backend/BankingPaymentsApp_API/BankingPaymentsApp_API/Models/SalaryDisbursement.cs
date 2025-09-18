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
        [ForeignKey("DisbursementStatus")]
        public int DisbursementStatusId { get; set; } = 3;
        public virtual PaymentStatus? DisbursementStatus { get; set; }
        [Required(ErrorMessage = "AllEmployee check is Mandatory")]
        public bool AllEmployees { get; set; } = true;
        public virtual ICollection<Employee>? Employees { get; set; } = new List<Employee>();
        public virtual ICollection<SalaryDisbursementDetails>? DisbursementDetails { get; set; } = new List<SalaryDisbursementDetails>();

    }
}
