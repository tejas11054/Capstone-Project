using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IBeneficiaryService
    {
        Task<PagedResultDTO<Beneficiary>> GetAll(
            int? clientId,
            string? beneficiaryName,
            string? accountNumber,
            string? bankName,
            string? ifsc,
            int pageNumber = 1,
            int pageSize = 10);
        public Task<Beneficiary> Add(Beneficiary beneficiary);
        public Task<Beneficiary?> GetById(int id);
        public Task<Beneficiary?> Update(Beneficiary beneficiary);
        public Task DeleteById(int id);
    }
}
