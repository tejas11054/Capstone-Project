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

        public async Task<IEnumerable<Bank>> GetAll(
            string? bankName,
            string? ifsc,
            bool? isActive,
            DateTime? createdFrom,
            DateTime? createdTo,
            int? pageNumber,
            int? pageSize)
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

            return query;
        }


        public async Task<Bank?> GetById(int id)
        {
            return await _bankRepository.GetById(id);
        }

        public async Task<Bank> Add(Bank bank)
        {
            var existing = await _bankRepository.GetAll()
                        .FirstOrDefaultAsync(b => b.IFSC == bank.IFSC);

            if (existing != null)
            {
                throw new InvalidOperationException($"Bank with IFSC '{bank.IFSC}' already exists.");
            }

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

        public async Task<List<BankUsersPerBankDTO>> GetUsersByBank()
        {
            var banks = _bankRepository.GetAll();
            var result = banks.Select(b => new BankUsersPerBankDTO
            {
                BankId = b.BankId,
                BankName = b.BankName,
                BankUsers = b.Users.OfType<BankUser>().ToList(),
                ClientUsers = b.Users.OfType<ClientUser>().ToList()
            }).ToList();

            return result;

        }
    }
}
