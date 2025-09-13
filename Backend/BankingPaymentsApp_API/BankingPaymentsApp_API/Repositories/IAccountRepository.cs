using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IAccountRepository
    {
        IEnumerable<Account> GetAll();
        Account Add(Account account);
        Account? GetById(int id);
        Account? Update(Account account);
        void DeleteById(int id);
    }
}
