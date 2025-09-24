using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public PaymentRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<IEnumerable<Payment>> GetAll()
        {
            return await _dbContext.Payments.Include(p => p.PayerAccount).ThenInclude(a=>a.ClientUser).Include(p => p.PaymentStatus).ToListAsync();
        }

        public async Task<Payment> Add(Payment payment)
        {
            await _dbContext.Payments.AddAsync(payment);
            await _dbContext.SaveChangesAsync();
            return payment;
        }

        public async Task<Payment?> GetById(int id)
        {
            return await _dbContext.Payments.Include(p=>p.PayerAccount).Include(p=>p.PaymentStatus).FirstOrDefaultAsync(p => p.PaymentId.Equals(id));
        }

        public async Task<Payment?> Update(Payment payment)
        {
            Payment? existingPayment = await GetById(payment.PaymentId);

            if (existingPayment == null)
                return null;

            existingPayment.PayerAccountId = payment.PayerAccountId;
            existingPayment.PayeeAccountNumber = payment.PayeeAccountNumber;
            existingPayment.Amount = payment.Amount;
            existingPayment.PaymentStatusId = payment.PaymentStatusId;

            await _dbContext.SaveChangesAsync();
            return existingPayment;
        }

        public async Task DeleteById(int id)
        {
            Payment? exisitngPayment = await GetById(id);
            if (exisitngPayment == null) return;
            _dbContext.Payments.Remove(exisitngPayment);
            await _dbContext.SaveChangesAsync();
        }
    }
}
