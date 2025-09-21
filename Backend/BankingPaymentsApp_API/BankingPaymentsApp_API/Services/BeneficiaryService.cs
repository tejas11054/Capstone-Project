using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class BeneficiaryService : IBeneficiaryService
    {
        private readonly IBeneficiaryRepository _beneficiaryRepository;
        private readonly IClientUserRepository _clientUserRepository;

        public BeneficiaryService(IBeneficiaryRepository beneficiaryRepository, IClientUserRepository clientUserRepository)
        {
            _beneficiaryRepository = beneficiaryRepository;
            _clientUserRepository = clientUserRepository;
        }

        public async Task<IEnumerable<Beneficiary>> GetAll()
        {
            return await _beneficiaryRepository.GetAll();
        }

        public async Task<Beneficiary> Add(Beneficiary beneficiary)
        {
            ClientUser? client = await _clientUserRepository.GetById(beneficiary.ClientId);

            if (client == null) throw new NullReferenceException("No client User of id:" + beneficiary.ClientId);

            Beneficiary addedBeneficiary = await _beneficiaryRepository.Add(beneficiary);
            client.Beneficiaries?.Add(addedBeneficiary);
            await _clientUserRepository.Update(client);
            return addedBeneficiary;
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