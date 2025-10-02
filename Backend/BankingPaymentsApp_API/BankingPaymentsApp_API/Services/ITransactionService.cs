using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface ITransactionService
    {
<<<<<<< HEAD
        public Task<IEnumerable<Transaction>> GetAll(int? clientId,int? transactionId, int? transactionTypeId, DateTime? createdFrom,DateTime? createdTo, double? minAmount, double? maxAmount, string? toFrom);
=======
        public Task<PagedResultDTO<Transaction>> GetAll(
            int? clientId,
            int? transactionId,
            int? transactionTypeId,
            DateTime? date,
            int pageNumber = 1,
            int pageSize = 10);
>>>>>>> f4fc12053d1e5693eea840165e1e862cd38ca36e
        public Task<Transaction> Add(Transaction transaction);
        public Task<IEnumerable<Transaction>> AddMany(IEnumerable<Transaction> transactions);
        public Task<Transaction?> GetById(int id);
        public Task<Transaction?> Update(Transaction transaction);
        public Task DeleteById(int id);
    }
}
