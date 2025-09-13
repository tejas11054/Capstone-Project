using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.DTOs
{
    public class LoginResponseDTO
    {
        public bool IsSuccess { get; set; }
        public User? User { get; set; }
        public string? Token {  get; set; }

    }
}
