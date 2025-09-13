using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.DTOs
{
    public class UserResponseDTO
    {
        public int UserId {  get; set; }
        public string UserFullName { get; set; }
        public string UserName { get; set; }
        public int UserRoleId {  get; set; }
        public string UserEmail { get; set; } = null!;
        public string UserPhone { get; set; } = null!;
        public DateTime UserJoiningDate { get; set; }
    }
}
