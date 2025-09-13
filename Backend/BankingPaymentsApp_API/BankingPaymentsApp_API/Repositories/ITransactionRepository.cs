using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface ITransactionRepository
    {
        public Task<IEnumerable<Transaction>> GetAll();
        public Task<Transaction> Add(Transaction transaction);
        public Task<Transaction?> GetById(int id);
        public Task<Transaction?> Update(Transaction transaction);
        public Task DeleteById(int id);

    }
}
