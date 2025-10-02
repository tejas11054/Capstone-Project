using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;

        public TransactionService(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

<<<<<<< HEAD
        public async Task<IEnumerable<Transaction>> GetAll(int? clientId, int? transactionId, int? transactionTypeId, DateTime? createdFrom, DateTime? createdTo, double? minAmount, double? maxAmount,string? toFrom)
=======
        public async Task<PagedResultDTO<Transaction>> GetAll(
            int? clientId,
            int? transactionId,
            int? transactionTypeId,
            DateTime? date,
            int pageNumber = 1,
            int pageSize = 10)
>>>>>>> f4fc12053d1e5693eea840165e1e862cd38ca36e
        {
            var query = _transactionRepository.GetAll();

            if (clientId.HasValue)
                query = query.Where(t => t.Account.ClientId == clientId.Value);

            if (transactionId.HasValue)
                query = query.Where(t => t.TransactionId == transactionId.Value);

            if (transactionTypeId.HasValue)
                query = query.Where(t => t.TransactionTypeId == transactionTypeId.Value);

<<<<<<< HEAD
            if (minAmount.HasValue)
                query = query.Where(p => p.Amount >= minAmount.Value);

            if (maxAmount.HasValue)
                query = query.Where(p => p.Amount <= maxAmount.Value);

            if (createdFrom.HasValue)
                query = query.Where(p => p.CreatedAt.Date >= createdFrom.Value.Date);

            if (createdTo.HasValue)
                query = query.Where(p => p.CreatedAt.Date <= createdTo.Value.Date);

            if (!string.IsNullOrEmpty(toFrom))
                query = query.Where(p => p.ToFrom.Contains(toFrom));
=======
            if (date.HasValue)
                query = query.Where(t => t.CreatedAt.Date == date.Value.Date);
>>>>>>> f4fc12053d1e5693eea840165e1e862cd38ca36e

            var totalRecords = await query.CountAsync();

            var data = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResultDTO<Transaction>
            {
                Data = data,
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
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
