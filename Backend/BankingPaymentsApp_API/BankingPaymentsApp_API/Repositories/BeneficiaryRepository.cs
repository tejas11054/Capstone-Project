using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class BeneficiaryRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public BeneficiaryRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public IEnumerable<Beneficiary> GetAll()
        {
            return _dbContext.Beneficiaries.ToList();
        }

        public Beneficiary Add(Beneficiary beneficiary)
        {
            _dbContext.Beneficiaries.Add(beneficiary);
            _dbContext.SaveChanges();
            return beneficiary;
        }

        public Beneficiary? getById(int id)
        {
            return _dbContext.Beneficiaries.FirstOrDefault(u => u.BeneficiaryId.Equals(id));
        }

        public Beneficiary? Update(Beneficiary beneficiary)
        {
            Beneficiary? existingBeneficiary = getById(beneficiary.BeneficiaryId);

            if (existingBeneficiary == null)
                return null;

            existingBeneficiary.ClientId = beneficiary.ClientId;
            existingBeneficiary.BeneficiaryName = beneficiary.BeneficiaryName;
            existingBeneficiary.AccountNumber = beneficiary.AccountNumber;
            existingBeneficiary.BankName = beneficiary.BankName;
            existingBeneficiary.IFSC = beneficiary.IFSC;

            _dbContext.SaveChanges();
            return existingBeneficiary;
        }

        public void DeleteById(int id)
        {
            Beneficiary? exisitngBeneficiary = getById(id);
            if (exisitngBeneficiary == null) return;
            _dbContext.Beneficiaries.Remove(exisitngBeneficiary);
        }
    }
}
