using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface ISalaryDisbursementService
    {
        Task<IEnumerable<SalaryDisbursement>> GetAll(
            int? clientId,
            decimal? minAmount,
            decimal? maxAmount,
            DateTime? disbursementFrom,
            DateTime? disbursementTo,
            int? disbursementStatusId,
            bool? allEmployees,
            int? pageNumber,
            int? pageSize);
        Task<SalaryDisbursement?> GetById(int id);
        Task<SalaryDisbursement> Add(SalaryDisbursement disbursement, ICollection<int> ids);
        Task<SalaryDisbursement?> Update(SalaryDisbursement disbursement);
        Task DeleteById(int id);
        public Task<SalaryDisbursement> ApproveSalaryDisbursement(int disbursementId);
        public Task<SalaryDisbursement> RejectSalaryDisbursement(int Id, string reason);
    }
}
