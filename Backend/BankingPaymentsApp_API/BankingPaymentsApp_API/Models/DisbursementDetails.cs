using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.Models
{
    public class DisbursementDetails
    {
        [Key]
        public int DetailId {  get; set; }
        [ForeignKey("SalaryDisbursement")]
        public int SalaryDisburementId {  get; set; }
        public virtual SalaryDisbursement SalaryDisbursement { get; set; }
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
        [DataType(DataType.Currency)]
        public decimal Amount { get; set; }
        [ForeignKey("Transaction")]
        public int? TransactionId { get; set; }
        public virtual Transaction? Transaction { get; set; }
    }
}
