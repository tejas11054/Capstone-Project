using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IBeneficiaryRepository
    {
        public Task<IEnumerable<Beneficiary>> GetAll();
        public Task<Beneficiary> Add(Beneficiary beneficiary);
        public Task<Beneficiary?> GetById(int id);
        public Task<Beneficiary?> Update(Beneficiary beneficiary);
        public Task DeleteById(int id);
    }
}
