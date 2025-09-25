using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class BankRepository : IBankRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;

        public BankRepository(BankingPaymentsDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Bank>> GetAll()
        {
            return await _dbContext.Banks.Include(b=>b.Accounts).Include(b=>b.Users).ToListAsync();
        }

        public async Task<Bank?> GetById(int id)
        {
            return await _dbContext.Banks.Include(b=>b.Accounts).Include(b=>b.Users).FirstOrDefaultAsync(b=>b.BankId.Equals(id));
        }

        public async Task<Bank> Add(Bank bank)
        {
            await _dbContext.Banks.AddAsync(bank);
            await _dbContext.SaveChangesAsync();
            return bank;
        }

        public async Task<Bank?> Update(Bank bank)
        {
            Bank? existingBank = await GetById(bank.BankId);
            if(existingBank == null) return null;
            existingBank.BankName = bank.BankName;
            existingBank.IFSC = bank.IFSC;
            existingBank.IsActive = bank.IsActive;
            await _dbContext.SaveChangesAsync();
            return existingBank;
        }

        public async Task DeleteById(int id)
        {
            Bank? existingBank = await GetById(id);
            if (existingBank == null) return;

            _dbContext.Banks.Remove(existingBank);
            await _dbContext.SaveChangesAsync();
        }
    }
}
