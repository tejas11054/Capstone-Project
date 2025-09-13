using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentService(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        public IEnumerable<Payment> GetAll()
        {
            return _paymentRepository.GetAll();
        }

        public Payment Add(Payment payment)
        {
            return _paymentRepository.Add(payment);
        }

        public Payment? GetById(int id)
        {
            return _paymentRepository.GetById(id);
        }

        public Payment? Update(Payment payment)
        {
            return _paymentRepository.Update(payment);
        }

        public void DeleteById(int id)
        {
            _paymentRepository.DeleteById(id);
        }
    }
}
