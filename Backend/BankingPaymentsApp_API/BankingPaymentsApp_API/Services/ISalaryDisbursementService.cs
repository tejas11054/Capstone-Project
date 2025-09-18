using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface ISalaryDisbursementService
    {
        Task<IEnumerable<SalaryDisbursement>> GetAll();
        Task<SalaryDisbursement?> GetById(int id);
        Task<SalaryDisbursement> Add(SalaryDisbursement disbursement);
        Task<SalaryDisbursement?> Update(SalaryDisbursement disbursement);
        Task DeleteById(int id);
        public Task<SalaryDisbursement> ApproveSalaryDisbursement(int disbursementId);
    }
}
