using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IAccountRepository 
    {
        Task<IEnumerable<Account>> GetAll();
        Task<Account> Add(Account account);
        Task<Account?> GetById(int id);
        Task<Account?> Update(Account account);
        Task DeleteById(int id);
        Task<string> GenerateAccountNumber();
    }
}
