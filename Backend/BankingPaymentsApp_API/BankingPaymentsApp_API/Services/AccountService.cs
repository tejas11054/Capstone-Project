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

        public async Task<IEnumerable<Account>> GetAll()
        {
            return await _accountRepository.GetAll();
        }

        public async Task<Account> Add(Account account)
        {
            return await _accountRepository.Add(account);
        }

        public async Task<Account?> GetById(int id)
        {
            return await _accountRepository.GetById(id);
        }

        public async Task<Account?> Update(Account account)
        {
            return await _accountRepository.Update(account);
        }

        public async Task DeleteById(int id)
        {
            await _accountRepository.DeleteById(id);
        }

        public async Task<string> GenerateAccountNumber()
        {
            return await _accountRepository.GenerateAccountNumber();
        }

        public async Task<bool> AccountExistsWithAccountNumber(string accountNumber)
        {
            var accounts = await _accountRepository.GetAll();
            //return true if any account has the given account Number 
            return accounts.Any(a => a.AccountNumber.Equals(accountNumber));
        }

        public async Task<bool?> CheckAccountBalance(int accountId ,double amount)
        {
            Account? account = await GetById(accountId);

            if (account == null) return null;

            if(account.Balance < amount) return false;
            return true;
        }
    }
}
