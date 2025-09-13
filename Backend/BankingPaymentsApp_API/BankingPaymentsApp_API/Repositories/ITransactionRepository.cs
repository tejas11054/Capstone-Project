using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface ITransactionRepository
    {
        public IEnumerable<Transaction> GetAll();
        public Transaction Add(Transaction transaction);
        public Transaction? GetById(int id);
        public Transaction? Update(Transaction transaction);
        public void DeleteById(int id);

    }
}
