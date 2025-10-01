using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Services
{
    public class BankService : IBankService
    {
        private readonly IBankRepository _bankRepository;

        public BankService(IBankRepository bankRepository)
        {
            _bankRepository = bankRepository;
        }

        public async Task<PagedResultDTO<Bank>> GetAll(
            string? bankName,
            string? ifsc,
            bool? isActive,
            DateTime? createdFrom,
            DateTime? createdTo,
            int pageNumber = 1,
            int pageSize = 5)
        {
            var query = _bankRepository.GetAll();

            if (!string.IsNullOrEmpty(bankName))
                query = query.Where(b => b.BankName.Contains(bankName));

            if (!string.IsNullOrEmpty(ifsc))
                query = query.Where(b => b.IFSC.Contains(ifsc));

            if (isActive.HasValue)
                query = query.Where(b => b.IsActive == isActive.Value);

            if (createdFrom.HasValue)
                query = query.Where(b => b.CreatedAt >= createdFrom.Value);

            if (createdTo.HasValue)
                query = query.Where(b => b.CreatedAt <= createdTo.Value);

            var totalRecords = await query.CountAsync();

            var data = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResultDTO<Bank>
            {
                Data = data,
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }


        public async Task<Bank?> GetById(int id)
        {
            return await _bankRepository.GetById(id);
        }

        public async Task<Bank> Add(Bank bank)
        {
            return await _bankRepository.Add(bank);
        }

        public async Task<Bank?> Update(Bank bank)
        {
            return await _bankRepository.Update(bank);
        }

        public async Task DeleteById(int id)
        {
            await _bankRepository.DeleteById(id);
        }
    }
}
