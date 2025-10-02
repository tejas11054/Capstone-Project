using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using System.Linq.Dynamic.Core;

namespace BankingPaymentsApp_API.Services
{
    public interface IPaymentService
    {
        public Task<IEnumerable<Payment>> GetAll(
            int? clientId,
            int? payerAccountId,
            string? payerName,
            string? payeeAccountNumber,
            double? minAmount,
            double? maxAmount,
            DateTime? createdFrom,
            DateTime? createdTo,
            int? paymentStatusId,
            DateTime? actionFrom,
            DateTime? actionTo,
            int? pageNumber,
            int? pageSize);

        public Task<Payment> Add(Payment payment);
        public Task<Payment?> GetById(int id);
        public Task<Payment?> Update(Payment payment);
        public Task DeleteById(int id);
        public Task<Payment?> ApprovePayment(Payment payment);
        public Task<Payment> RejectPayment(int paymentId, string reason);
        public Task<List<Payment>> GetPaymentsByAccountId(int accountId);

    }
}
