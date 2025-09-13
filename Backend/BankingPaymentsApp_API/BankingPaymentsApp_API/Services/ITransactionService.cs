using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface ITransactionService
    {
        public IEnumerable<Transaction> GetAll();
        public Transaction Add(Transaction transaction);
        public Transaction? GetById(int id);
        public Transaction? Update(Transaction transaction);
        public void DeleteById(int id);
    }
}
