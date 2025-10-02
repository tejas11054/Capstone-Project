using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IBankService
    {
        public Task<IEnumerable<Bank>> GetAll(
            string? bankName,
            string? ifsc,
            bool? isActive,
            DateTime? createdFrom,
            DateTime? createdTo,
            int? pageNumber,
            int? pageSize);

        public Task<Bank?> GetById(int id);

        public Task<Bank> Add(Bank bank);

        public Task<Bank?> Update(Bank bank);

        public Task DeleteById(int id);
        public Task<List<BankUsersPerBankDTO>> GetUsersByBank();
    }
}
