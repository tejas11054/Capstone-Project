using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IPaymentRepository
    {
        public IEnumerable<Payment> GetAll();
        public Payment Add(Payment payment);
        public Payment? GetById(int id);
        public Payment? Update(Payment payment);
        public void DeleteById(int id);
    }
}
