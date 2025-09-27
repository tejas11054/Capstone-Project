using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<Beneficiary>> GetAll(
            int? clientId,
            string? beneficiaryName,
            string? accountNumber,
            string? bankName,
            string? ifsc)
        {
            var query = _beneficiaryRepository.GetAll();

            if (clientId.HasValue)
                query = query.Where(b => b.ClientId == clientId.Value);

            if (!string.IsNullOrEmpty(beneficiaryName))
                query = query.Where(b => b.BeneficiaryName.Contains(beneficiaryName));

            if (!string.IsNullOrEmpty(accountNumber))
                query = query.Where(b => b.AccountNumber.Contains(accountNumber));

            if (!string.IsNullOrEmpty(bankName))
                query = query.Where(b => b.BankName.Contains(bankName));

            if (!string.IsNullOrEmpty(ifsc))
                query = query.Where(b => b.IFSC.Contains(ifsc));

            return await query.ToListAsync();
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