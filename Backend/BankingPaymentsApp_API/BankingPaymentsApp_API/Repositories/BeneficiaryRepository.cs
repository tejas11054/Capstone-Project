using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class BeneficiaryRepository : IBeneficiaryRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public BeneficiaryRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<IEnumerable<Beneficiary>> GetAll()
        {
            return await _dbContext.Beneficiaries.ToListAsync();
        }

        public async Task<Beneficiary> Add(Beneficiary beneficiary)
        {
            await _dbContext.Beneficiaries.AddAsync(beneficiary);
            await _dbContext.SaveChangesAsync();
            return beneficiary;
        }

        public async Task<Beneficiary?> GetById(int id)
        {
            return await _dbContext.Beneficiaries.FirstOrDefaultAsync(u => u.BeneficiaryId.Equals(id));
        }

        public async Task<Beneficiary?> Update(Beneficiary beneficiary)
        {
            Beneficiary? existingBeneficiary = await GetById(beneficiary.BeneficiaryId);

            if (existingBeneficiary == null)
                return null;

            existingBeneficiary.ClientId = beneficiary.ClientId;
            existingBeneficiary.BeneficiaryName = beneficiary.BeneficiaryName;
            existingBeneficiary.AccountNumber = beneficiary.AccountNumber;
            existingBeneficiary.BankName = beneficiary.BankName;
            existingBeneficiary.IFSC = beneficiary.IFSC;

            await _dbContext.SaveChangesAsync();
            return existingBeneficiary;
        }

        public async Task DeleteById(int id)
        {
            Beneficiary? exisitngBeneficiary = await GetById(id);
            if (exisitngBeneficiary == null) return;
            _dbContext.Beneficiaries.Remove(exisitngBeneficiary);
            await _dbContext.SaveChangesAsync();
        }
    }
}
