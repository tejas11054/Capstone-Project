using BankingPaymentsApp_API.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.DTOs
{
    public class RegisterUserDTO
    {
        public string UserFullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public int UserRoleId { get; set; }
        public string UserEmail { get; set; } = null!;
        public string UserPhone { get; set; } = null!;
    }
}
