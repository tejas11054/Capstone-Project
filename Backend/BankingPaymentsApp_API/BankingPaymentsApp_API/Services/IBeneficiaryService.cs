using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IBeneficiaryService
    {
        public Task<IEnumerable<Beneficiary>> GetAll(int? clientId,
        string? beneficiaryName,
        string? accountNumber,
        string? bankName,
        string? ifsc);
        public Task<Beneficiary> Add(Beneficiary beneficiary);
        public Task<Beneficiary?> GetById(int id);
        public Task<Beneficiary?> Update(Beneficiary beneficiary);
        public Task DeleteById(int id);
    }
}
