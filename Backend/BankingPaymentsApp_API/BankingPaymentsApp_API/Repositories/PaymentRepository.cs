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
            return await _dbContext.Payments.ToListAsync();
        }

        public async Task<Payment> Add(Payment payment)
        {
            // whenever a Payment is created 1 or 2 transactions are created 
            // if both payer and payee have accounts in the system 2 transactions (DEBIT and CREDIT)
            // if only payer has then only one (DEBIT)

            //new payment has been provided
            //it has no transaction yet before saving
            //hence we will create transaction
            await _dbContext.Payments.AddAsync(payment);
            await _dbContext.SaveChangesAsync();
            return payment;
        }

        public async Task<Payment?> GetById(int id)
        {
            return await _dbContext.Payments.Include(p=>p.PayerAccount).Include(p=>p.PayeeAccount).Include(p=>p.PaymentStatus).FirstOrDefaultAsync(p => p.PaymentId.Equals(id));
        }

        public async Task<Payment?> Update(Payment payment)
        {
            Payment? existingPayment = await GetById(payment.PaymentId);

            if (existingPayment == null)
                return null;

            existingPayment.PayerAccountId = payment.PayerAccountId;
            existingPayment.PayeeAccountId = payment.PayeeAccountId;
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
