using BankingPaymentsApp_API.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.DTOs
{
    public class CreateSalaryDisbursmentDTO
    {
        public int ClientId { get; set; }
        public bool AllEmployees { get; set; } = true;
        public virtual ICollection<int>? EmployeeIds { get; set; } = new List<int>();   

    }
}
