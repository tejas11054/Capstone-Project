using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.DTOs
{
    public class BankUsersPerBankDTO
    {
        public int BankId { get; set; }
        public string BankName { get; set; } = string.Empty;
        public List<BankUser> BankUsers { get; set; } = new List<BankUser>();
        public List<ClientUser> ClientUsers { get; set; } = new List<ClientUser>();
    }
}
