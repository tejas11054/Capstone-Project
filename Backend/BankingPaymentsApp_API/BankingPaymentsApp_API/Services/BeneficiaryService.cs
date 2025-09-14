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

        public async Task<IEnumerable<Beneficiary>> GetAll()
        {
            return await _beneficiaryRepository.GetAll();
        }

        public async Task<Beneficiary> Add(Beneficiary beneficiary)
        {
            return await _beneficiaryRepository.Add(beneficiary);
        }

        public async Task<Beneficiary?> GetById(int id)
        {
            return await _beneficiaryRepository.GetById(id);
        }

        public async Task<Beneficiary?> Update(Beneficiary beneficiary)
        {
            return await _beneficiaryRepository.Update(beneficiary);
        }

        public async Task DeleteById(int id)
        {
            await _beneficiaryRepository.DeleteById(id);
        }
    }
}