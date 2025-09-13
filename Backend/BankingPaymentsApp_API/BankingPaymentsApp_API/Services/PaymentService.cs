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

        public async Task<IEnumerable<Payment>> GetAll()
        {
            return await _paymentRepository.GetAll();
        }

        public async Task<Payment> Add(Payment payment)
        {
            return await _paymentRepository.Add(payment);
        }

        public async Task<Payment?> GetById(int id)
        {
            return await _paymentRepository.GetById(id);
        }

        public async Task<Payment?> Update(Payment payment)
        {
            return await _paymentRepository.Update(payment);
        }

        public async Task DeleteById(int id)
        {
            await _paymentRepository.DeleteById(id);
        }
    }
}
