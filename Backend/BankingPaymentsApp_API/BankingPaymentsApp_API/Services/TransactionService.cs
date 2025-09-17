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

        public async Task<IEnumerable<Transaction>> GetAll()
        {
            return await _transactionRepository.GetAll();
        }

        public async Task<Transaction> Add(Transaction transaction)
        {
            return await _transactionRepository.Add(transaction);
        }

        public async Task<IEnumerable<Transaction>> AddMany(IEnumerable<Transaction> transactions)
        {
            return await _transactionRepository.AddMany(transactions);
        }

        public async Task<Transaction?> GetById(int id)
        {
            return await _transactionRepository.GetById(id);
        }

        public async Task<Transaction?> Update(Transaction transaction)
        {
            return await _transactionRepository.Update(transaction);
        }

        public async Task DeleteById(int id)
        {
            await _transactionRepository.DeleteById(id);
        }
    }
}
