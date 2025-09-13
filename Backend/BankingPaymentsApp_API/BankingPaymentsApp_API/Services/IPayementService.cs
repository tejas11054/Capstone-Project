using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IPayementService
    {
        public IEnumerable<Payment> GetAll();
        public Payment Add(Payment payment);
        public Payment? GetById(int id);
        public Payment? Update(Payment payment);
        public void DeleteById(int id);
    }
}
