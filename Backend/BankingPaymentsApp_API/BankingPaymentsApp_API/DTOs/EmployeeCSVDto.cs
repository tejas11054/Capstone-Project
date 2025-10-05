using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.DTOs
{
    public class EmployeeCSVDto
    {
        [Required(ErrorMessage = "Client Email is Required!")]
        [EmailAddress(ErrorMessage = "Invalid Email Format!")]
        public string ClientEmail { get; set; }

        [Required(ErrorMessage = "Employee Name is Required!")]
        public string EmployeeName { get; set; }

        [Required(ErrorMessage = "Account Number is Required!")]
        public string AccountNumber { get; set; }

        [Required(ErrorMessage = "Bank Name is Required!")]
        public string BankName { get; set; }

        [Required(ErrorMessage = "IFSC Code is Required!")]
        public string IFSC { get; set; }

        [Required(ErrorMessage = "Salary is Required!")]
        [Range(0, int.MaxValue, ErrorMessage = "Salary must be a positive number.")]
        public int Salary { get; set; }
    }
}
