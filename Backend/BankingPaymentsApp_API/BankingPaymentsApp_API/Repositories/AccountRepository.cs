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
            return await _dbContext.Accounts.Include(a => a.ClientUser).Include(a => a.AccountStatus).Include(a => a.AccountType).Include(a => a.Bank).FirstOrDefaultAsync(u => u.AccountId.Equals(id));
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

        public async Task<string> GenerateAccountNumber()
        {
            
            string prefix = "BPA";
            string datePart = DateTime.Now.ToString("yyyyMMdd");

            // Generate random 6-character alphanumeric string
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            string randomPart = new string(Enumerable.Repeat(chars, 6)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            string accountNumber = $"{prefix}{datePart}{randomPart}";

            bool exists = await _dbContext.Accounts.AnyAsync(a => a.AccountNumber == accountNumber);
            if (exists)
            {
                // Regenerate if already exists
                return await GenerateAccountNumber();
            }

            return accountNumber;

        }
    }
}
