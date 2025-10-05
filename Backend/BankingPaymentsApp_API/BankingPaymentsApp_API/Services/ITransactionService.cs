using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface ITransactionService
    {

        public Task<IEnumerable<Transaction>> GetAll(
            int? clientId,
            int? bankuserId,
            int? transactionId,
            int? transactionTypeId,
            DateTime? createdFrom,
            DateTime? createdTo,
            double? minAmount,
            double? maxAmount,
            string? toFrom,
            int? pageNumber,
            int? pageSize);
        public Task<Transaction> Add(Transaction transaction);
        public Task<IEnumerable<Transaction>> AddMany(IEnumerable<Transaction> transactions);
        public Task<Transaction?> GetById(int id);
        public Task<Transaction?> Update(Transaction transaction);
        public Task DeleteById(int id);
    }
}
