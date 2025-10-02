using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public TransactionRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public IQueryable<Transaction> GetAll()
        {
            return _dbContext.Transactions
                .Include(t=>t.Account).ThenInclude(a=>a.ClientUser)
                .Include(t=>t.Payment).ThenInclude(p=>p.PayerAccount)
                .Include(t=>t.SalaryDisbursement).ThenInclude(s=>s.DisbursementDetails).ThenInclude(d=>d.Employee)
                .Include(t=>t.TransactionType)
                .AsQueryable();
        }

        public async Task<Transaction> Add(Transaction transaction)
        {
            await _dbContext.Transactions.AddAsync(transaction);
            await _dbContext.SaveChangesAsync();
            return transaction;
        }

        public async Task<IEnumerable<Transaction>> AddMany(IEnumerable<Transaction> transactions)
        {
            await _dbContext.Transactions.AddRangeAsync(transactions);
            await _dbContext.SaveChangesAsync();
            return transactions;
        }
        public async Task<Transaction?> GetById(int id)
        {
            return await _dbContext.Transactions.Include(t => t.Account).Include(t => t.Payment).Include(t => t.TransactionType).FirstOrDefaultAsync(t => t.TransactionId.Equals(id));
        }

        public async Task<Transaction?> Update(Transaction transaction)
        {
            Transaction? existingTransaction = await GetById(transaction.TransactionId);

            if (existingTransaction == null)
                return null;

            existingTransaction.TransactionTypeId = transaction.TransactionId;
            existingTransaction.AccountId = transaction.AccountId;
            existingTransaction.PaymentId = transaction.PaymentId;
            existingTransaction.Amount = transaction.Amount;
            existingTransaction.ToFrom = transaction.ToFrom;

            await _dbContext.SaveChangesAsync();
            return existingTransaction;
        }

        public async Task DeleteById(int id)
        {
            Transaction? existingTransaction = await GetById(id);
            if (existingTransaction == null) return;
            _dbContext.Transactions.Remove(existingTransaction);
            await _dbContext.SaveChangesAsync();
        }
    }
}
