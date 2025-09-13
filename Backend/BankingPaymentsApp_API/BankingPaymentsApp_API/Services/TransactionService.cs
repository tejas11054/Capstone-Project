using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;

        public TransactionService(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        public IEnumerable<Transaction> GetAll()
        {
            return _transactionRepository.GetAll();
        }

        public Transaction Add(Transaction transaction)
        {
            return _transactionRepository.Add(transaction);
        }

        public Transaction? GetById(int id)
        {
            return _transactionRepository.GetById(id);
        }

        public Transaction? Update(Transaction transaction)
        {
            return _transactionRepository.Update(transaction);
        }

        public void DeleteById(int id)
        {
            _transactionRepository.DeleteById(id);
        }
    }
}
