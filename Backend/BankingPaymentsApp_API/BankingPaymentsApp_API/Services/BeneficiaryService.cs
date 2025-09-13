using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class BeneficiaryService : IBeneficiaryService
    {
        private readonly IBeneficiaryRepository _beneficiaryRepository;

        public BeneficiaryService(IBeneficiaryRepository beneficiaryRepository)
        {
            _beneficiaryRepository = beneficiaryRepository;
        }

        public IEnumerable<Beneficiary> GetAll()
        {
            return _beneficiaryRepository.GetAll();
        }

        public Beneficiary Add(Beneficiary beneficiary)
        {
            return _beneficiaryRepository.Add(beneficiary);
        }

        public Beneficiary? GetById(int id)
        {
            return _beneficiaryRepository.GetById(id);
        }

        public Beneficiary? Update(Beneficiary beneficiary)
        {
            return _beneficiaryRepository.Update(beneficiary);
        }

        public void DeleteById(int id)
        {
            _beneficiaryRepository.DeleteById(id);
        }
    }
}