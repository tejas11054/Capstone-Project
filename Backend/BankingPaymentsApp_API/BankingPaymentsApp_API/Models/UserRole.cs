using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Models
{
    public enum Role { ADMIN, BANK_USER, CLIENT_USER }
    public class UserRole
    {
        [Key]
        public int RoleId { get; set; }
        [Required(ErrorMessage = "Role is Required!")]
        public Role Role { get; set; }
    }
}
