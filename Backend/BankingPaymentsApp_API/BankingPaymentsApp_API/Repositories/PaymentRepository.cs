using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class PaymentRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public PaymentRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public IEnumerable<Payment> GetAll()
        {
            return _dbContext.Payments.ToList();
        }

        public Payment Add(Payment payment)
        {
            _dbContext.Payments.Add(payment);
            _dbContext.SaveChanges();
            return payment;
        }

        public Payment? getById(int id)
        {
            return _dbContext.Payments.Include(p=>p.PayerAccount).Include(p=>p.PayeeAccount).Include(p=>p.PaymentStatus).FirstOrDefault(p => p.PaymentId.Equals(id));
        }

        public Payment? Update(Payment payment)
        {
            Payment? existingPayment = getById(payment.PaymentId);

            if (existingPayment == null)
                return null;

            existingPayment.PayerAccountId = payment.PayerAccountId;
            existingPayment.PayeeAccountId = payment.PayeeAccountId;
            existingPayment.Amount = payment.Amount;
            existingPayment.PaymentStatusId = payment.PaymentStatusId;

            _dbContext.SaveChanges();
            return existingPayment;
        }

        public void DeleteById(int id)
        {
            Payment? exisitngPayment = getById(id);
            if (exisitngPayment == null) return;
            _dbContext.Payments.Remove(exisitngPayment);
        }
    }
}
