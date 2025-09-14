using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.DTOs
{
    public class RegisterBankUserDTO
    {
        [Required]
        public string UserFullName { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserEmail { get; set; }
        [Required]
        public string UserPhone { get; set; }
        [Required]
        public int UserRoleId { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string ConfirmPassword { get; set; }

        [Required]
        public string RefferalCode { get; set; }
        [Required]
        public string Branch { get; set; }
    }
}
