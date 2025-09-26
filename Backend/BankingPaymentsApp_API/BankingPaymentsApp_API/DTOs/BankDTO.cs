using BankingPaymentsApp_API.Models;
using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.DTOs
{
    public class BankDTO
    {
        public string BankName { get; set; } = string.Empty;
        public string IFSC { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}
