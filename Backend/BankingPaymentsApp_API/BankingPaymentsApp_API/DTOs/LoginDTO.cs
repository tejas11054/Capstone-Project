using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "UserName is Required!")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is Required!")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
