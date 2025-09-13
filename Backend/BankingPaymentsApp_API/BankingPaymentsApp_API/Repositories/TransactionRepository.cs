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

        public IEnumerable<Transaction> GetAll()
        {
            return _dbContext.Transactions.ToList();
        }

        public Transaction Add(Transaction transaction)
        {
            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();
            return transaction;
        }

        public Transaction? GetById(int id)
        {
            return _dbContext.Transactions.Include(t=>t.Account).Include(t=>t.Payment).Include(t=>t.TransactionType).FirstOrDefault(t=>t.TransactionId.Equals(id));
        }

        public Transaction? Update(Transaction transaction)
        {
            Transaction? existingTransaction = GetById(transaction.TransactionId);

            if (existingTransaction == null)
                return null;

            existingTransaction.TransactionTypeId = transaction.TransactionId;
            existingTransaction.AccountId = transaction.AccountId;
            existingTransaction.PayementId = transaction.PayementId;
            existingTransaction.Amount = transaction.Amount;

            _dbContext.SaveChanges();
            return existingTransaction;
        }

        public void DeleteById(int id)
        {
            Transaction? existingTransaction = GetById(id);
            if (existingTransaction == null) return;
            _dbContext.Transactions.Remove(existingTransaction);
        }
    }
}
