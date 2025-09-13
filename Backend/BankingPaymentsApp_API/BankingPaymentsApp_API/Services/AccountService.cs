using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;

        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public IEnumerable<Account> GetAll()
        {
            return _accountRepository.GetAll();
        }

        public Account Add(Account account)
        {
            return _accountRepository.Add(account);
        }

        public Account? GetById(int id)
        {
            return _accountRepository.GetById(id);
        }

        public Account? Update(Account account)
        {
            return _accountRepository.Update(account);
        }

        public void DeleteById(int id)
        {
            _accountRepository.DeleteById(id);
        }
    }
}
