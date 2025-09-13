using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public AccountRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public IEnumerable<Account> GetAll()
        {
            return _dbContext.Accounts.ToList();
        }

        public Account Add(Account account)
        {
            _dbContext.Accounts.Add(account);
            _dbContext.SaveChanges();
            return account;
        }

        public Account? GetById(int id)
        {
            return _dbContext.Accounts.Include(a=>a.ClientUser).Include(a=>a.AccountStatus).Include(a=>a.AccountType).FirstOrDefault(u => u.AccountId.Equals(id));
        }

        public Account? Update(Account account)
        {
            Account? existingAccount = GetById(account.AccountId);

            if (existingAccount == null)
                return null;

            existingAccount.Balance = account.Balance;
            existingAccount.AccountStatusId = account.AccountStatusId;
            existingAccount.AccountNumber = account.AccountNumber;
            existingAccount.AccountTypeId = account.AccountTypeId;
            existingAccount.ClientId = account.ClientId;

            _dbContext.SaveChanges();
            return existingAccount;
        }

        public void DeleteById(int id)
        {
            Account? existingAccount = GetById(id);

            if (existingAccount == null) return;

            _dbContext.Accounts.Remove(existingAccount);
        }
    }
}
