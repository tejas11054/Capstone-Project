using BankingPaymentsApp_API.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.DTOs
{
    public class EmployeeDTO
    {
        [Required(ErrorMessage = "Client Id is Required!")]
        public int ClientId { get; set; }
        [Required(ErrorMessage = "Employee Name is Required!")]
        public string EmployeeName { get; set; }
        [Required(ErrorMessage = "Account Number is Required!")]
        public string AccountNumber { get; set; }
        [Required(ErrorMessage = "Bank Name is Required!")]
        public string BankName { get; set; }
        [Required(ErrorMessage = "IFSC Code is Required!")]
        public string IFSC { get; set; }
    }
}
