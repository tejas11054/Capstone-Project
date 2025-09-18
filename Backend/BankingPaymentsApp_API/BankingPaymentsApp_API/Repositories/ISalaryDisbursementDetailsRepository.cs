using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface ISalaryDisbursementDetailsRepository
    {
        Task<IEnumerable<SalaryDisbursementDetails>> GetAll();
        Task<SalaryDisbursementDetails?> GetById(int id);
        Task<SalaryDisbursementDetails> Add(SalaryDisbursementDetails detail);
        Task<SalaryDisbursementDetails?> Update(SalaryDisbursementDetails detail);
        Task DeleteById(int id);
    }
}
