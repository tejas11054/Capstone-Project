using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.DTOs
{
    public class RegisterAccountDTO
    {
        public string? AccountNumber { get; set; }
        public int ClientId { get; set; }
        public double Balance { get; set; } = 0;
        public int AccountTypeId { get; set; }
        public int AccountStatusId { get; set; }
    }
}
