using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IPaymentRepository
    {
        public Task<IEnumerable<Payment>> GetAll();
        public Task<Payment> Add(Payment payment);
        public Task<Payment?> GetById(int id);
        public Task<Payment?> Update(Payment payment);
        public Task DeleteById(int id);
    }
}
