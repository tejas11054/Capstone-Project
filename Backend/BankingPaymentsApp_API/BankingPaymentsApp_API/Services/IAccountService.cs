using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IAccountService
    {
        Task<IEnumerable<Account>> GetAll();
        Task<Account> Add(Account account);
        Task<Account?> GetById(int id);
        Task<Account?> Update(Account account);
        Task DeleteById(int id);
        Task<string> GenerateAccountNumber();
        public Task<Account?> AccountExistsWithAccountNumber(string accountNumber);
        public Task<bool?> CheckAccountBalance(int accountId, double amount);

    }
}

