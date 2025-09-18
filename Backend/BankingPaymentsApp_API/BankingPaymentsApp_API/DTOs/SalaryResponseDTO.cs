using BankingPaymentsApp_API.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.DTOs
{
    public class SalaryResponseDTO
    {
        public int SalaryDisbursementId { get; set; }
        public int ClientId { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime DisbursementDate { get; set; } = DateTime.UtcNow;
        public int DisbursementStatusId { get; set; } = 3;
        public bool AllEmployees { get; set; } = true;
        public virtual ICollection<SalaryDisbursementDetails>? DisbursementDetails { get; set; } = new List<SalaryDisbursementDetails>();
    }
}
