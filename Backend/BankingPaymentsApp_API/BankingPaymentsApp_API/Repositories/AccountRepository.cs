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

        public async Task<IEnumerable<Account>> GetAll()
        {
            return await _dbContext.Accounts.ToListAsync();
        }

        public async Task<Account> Add(Account account)
        {
            await _dbContext.Accounts.AddAsync(account);
            await _dbContext.SaveChangesAsync();
            return account;
        }

        public async Task<Account?> GetById(int id)
        {
            return await _dbContext.Accounts.Include(a => a.ClientUser).Include(a => a.AccountStatus).Include(a => a.AccountType).FirstOrDefaultAsync(u => u.AccountId.Equals(id));
        }

        public async Task<Account?> Update(Account account)
        {
            Account? existingAccount = await GetById(account.AccountId);

            if (existingAccount == null)
                return null;

            existingAccount.Balance = account.Balance;
            existingAccount.AccountStatusId = account.AccountStatusId;
            existingAccount.AccountNumber = account.AccountNumber;
            existingAccount.AccountTypeId = account.AccountTypeId;
            existingAccount.ClientId = account.ClientId;

            await _dbContext.SaveChangesAsync();
            return existingAccount;
        }

        public async Task DeleteById(int id)
        {
            Account? existingAccount = await GetById(id);

            if (existingAccount == null) return;

            _dbContext.Accounts.Remove(existingAccount);
            await _dbContext.SaveChangesAsync();
        }
    }
}
