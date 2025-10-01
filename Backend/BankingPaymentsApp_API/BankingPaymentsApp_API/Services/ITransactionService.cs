using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface ITransactionService
    {
        public Task<PagedResultDTO<Transaction>> GetAll(
            int? clientId,
            int? transactionId,
            int? transactionTypeId,
            DateTime? date,
            int pageNumber = 1,
            int pageSize = 10);
        public Task<Transaction> Add(Transaction transaction);
        public Task<IEnumerable<Transaction>> AddMany(IEnumerable<Transaction> transactions);
        public Task<Transaction?> GetById(int id);
        public Task<Transaction?> Update(Transaction transaction);
        public Task DeleteById(int id);
    }
}
