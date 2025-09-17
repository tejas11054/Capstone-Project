using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        [ForeignKey("ClientUser")]
        public int ClientId {  get; set; }
        public virtual ClientUser? ClientUser { get; set; }
        [Required(ErrorMessage = "Employee Name is Required!")]
        public string EmployeeName {  get; set; }
        [Required(ErrorMessage = "Account Number is Required!")]
        public string AccountNumber {  get; set; }
        [Required(ErrorMessage = "Bank Name is Required!")]
        public string BankName {  get; set; }
        [Required(ErrorMessage = "IFSC Code is Required!")]
        public string IFSC {  get; set; }
        public int Salary { get; set; }
    }
}
