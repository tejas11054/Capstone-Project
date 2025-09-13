using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IBeneficiaryService
    {
        public IEnumerable<Beneficiary> GetAll();
        public Beneficiary Add(Beneficiary beneficiary);
        public Beneficiary? GetById(int id);
        public Beneficiary? Update(Beneficiary beneficiary);
        public void DeleteById(int id);
    }
}
