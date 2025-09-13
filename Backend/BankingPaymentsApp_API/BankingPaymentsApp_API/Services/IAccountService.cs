using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IAccountService
    {
        IEnumerable<Account> GetAll();
        Account Add(Account account);
        Account? GetById(int id);
        Account? Update(Account account);
        void DeleteById(int id);
    }
}

