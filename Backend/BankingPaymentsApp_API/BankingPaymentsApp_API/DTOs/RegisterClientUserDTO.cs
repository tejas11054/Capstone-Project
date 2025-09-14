using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.DTOs
{
    public class RegisterClientUserDTO
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
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Address { get; set; }
        public int? AccountId { get; set; }
    }
}
