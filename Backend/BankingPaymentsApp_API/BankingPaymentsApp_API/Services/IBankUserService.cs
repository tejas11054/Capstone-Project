using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IBankUserService
    {
        Task<PagedResultDTO<BankUser>> GetAll(
            string? fullName,
            string? userName,
            string? email,
            string? phone,
            int? roleId,
            int? bankId,
            string? branch,
            DateTime? joiningFrom,
            DateTime? joiningTo,
            int pageNumber = 1,
            int pageSize = 10);
        Task<BankUser> Add(BankUser bankUser);
        Task<BankUser?> GetById(int id);
        Task<BankUser?> Update(BankUser bankUser);
        Task DeleteById(int id);
        public Task<BankUser?> GetRandomBankUser();
        public Task<BankUser> ApproveBankUser(int id);
        public Task<BankUser> RejectBankUser(int id,RejectDTO reject);
    }
}
