using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class SalaryDisbursementDetailsRepository : ISalaryDisbursementDetailsRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;

        public SalaryDisbursementDetailsRepository(BankingPaymentsDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<SalaryDisbursementDetails>> GetAll()
        {
            return await _dbContext.SalaryDisbursementDetails
                .Include(d => d.SalaryDisbursement)
                .Include(d => d.Employee)
                .Include(d => d.Transaction)
                .ToListAsync();
        }

        public async Task<SalaryDisbursementDetails?> GetById(int id)
        {
            return await _dbContext.SalaryDisbursementDetails
                .Include(d => d.SalaryDisbursement)
                .Include(d => d.Employee)
                .Include(d => d.Transaction)
                .FirstOrDefaultAsync(d => d.DetailId == id);
        }

        public async Task<SalaryDisbursementDetails> Add(SalaryDisbursementDetails detail)
        {
            await _dbContext.SalaryDisbursementDetails.AddAsync(detail);
            await _dbContext.SaveChangesAsync();
            return detail;
        }

        public async Task<SalaryDisbursementDetails?> Update(SalaryDisbursementDetails detail)
        {
            var existing = await GetById(detail.DetailId);
            if (existing == null) return null;

            existing.SalaryDisbursementId = detail.SalaryDisbursementId;
            existing.EmployeeId = detail.EmployeeId;
            existing.Amount = detail.Amount;
            existing.TransactionId = detail.TransactionId;
            existing.Success = detail.Success;

            await _dbContext.SaveChangesAsync();
            return existing;
        }

        public async Task DeleteById(int id)
        {
            var existing = await GetById(id);
            if (existing == null) return;

            _dbContext.SalaryDisbursementDetails.Remove(existing);
            await _dbContext.SaveChangesAsync();
        }
    }
}
