using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class SalaryDisbursementService : ISalaryDisbursementService
    {
        private readonly ISalaryDisbursementRepository _salaryDisbursementRepository;

        public SalaryDisbursementService(ISalaryDisbursementRepository salaryDisbursementRepository)
        {
            _salaryDisbursementRepository = salaryDisbursementRepository;
        }

        public async Task<IEnumerable<SalaryDisbursement>> GetAll()
        {
            return await _salaryDisbursementRepository.GetAll();
        }
        public async Task<SalaryDisbursement?> GetById(int id)
        {
            return await _salaryDisbursementRepository.GetById(id);
        }
        public async Task<SalaryDisbursement> Add(SalaryDisbursement disbursement)
        {
            return await _salaryDisbursementRepository.Add(disbursement);
        }
        public async Task<SalaryDisbursement?> Update(SalaryDisbursement disbursement)
        {
            return await _salaryDisbursementRepository.Update(disbursement);
        }
        public async Task DeleteById(int id)
        {
            await _salaryDisbursementRepository.DeleteById(id);
        }
    }
}
