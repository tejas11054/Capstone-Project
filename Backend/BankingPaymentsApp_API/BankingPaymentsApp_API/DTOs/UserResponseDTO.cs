using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.DTOs
{
    public class UserResponseDTO
    {
        public string UserFullName { get; set; }
        public string UserName { get; set; }
        public Role UserRole { get; set; }
        public string UserEmail { get; set; } = null!;
        public string UserPhone { get; set; } = null!;
        public DateTime UserJoiningDate { get; set; }
    }
}
