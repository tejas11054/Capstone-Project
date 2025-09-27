using AutoMapper;
using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace BankingPaymentsApp_API.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly ITransactionService _transactionService;
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly BankingPaymentsDBContext _dbContext;

        public PaymentService(IPaymentRepository paymentRepository, ITransactionService transactionService, IAccountService accountService, IMapper mapper, BankingPaymentsDBContext dBContext, IEmailService emailService)
        {
            _paymentRepository = paymentRepository;
            _transactionService = transactionService;
            _accountService = accountService;
            _mapper = mapper;
            _dbContext = dBContext;
            _emailService = emailService;
        }

        public async Task<IEnumerable<Payment>> GetAll(
            int? payerAccountId,
            string?payerName,
            string? payeeAccountNumber,
            double? minAmount,
            double? maxAmount,
            DateTime? createdFrom,
            DateTime? createdTo,
            int? paymentStatusId,
            DateTime? actionFrom,
            DateTime? actionTo)
        {
            var query = _paymentRepository.GetAll();

            if (payerAccountId.HasValue)
                query = query.Where(p => p.PayerAccountId == payerAccountId.Value);

            if (!string.IsNullOrEmpty(payerName))
                query = query.Where(p => p.PayerAccount.ClientUser.UserName.Contains(payerName));

            if (!string.IsNullOrEmpty(payeeAccountNumber))
                query = query.Where(p => p.PayeeAccountNumber.Contains(payeeAccountNumber));

            if (minAmount.HasValue)
                query = query.Where(p => p.Amount >= minAmount.Value);

            if (maxAmount.HasValue)
                query = query.Where(p => p.Amount <= maxAmount.Value);

            if (createdFrom.HasValue)
                query = query.Where(p => p.CreatedAt.Date >= createdFrom.Value.Date);

            if (createdTo.HasValue)
                query = query.Where(p => p.CreatedAt.Date <= createdTo.Value.Date);

            if (paymentStatusId.HasValue)
                query = query.Where(p => p.PaymentStatusId == paymentStatusId.Value);

            if (actionFrom.HasValue)
                query = query.Where(p => p.ActionAt >= actionFrom.Value);

            if (actionTo.HasValue)
                query = query.Where(p => p.ActionAt <= actionTo.Value);

            return await query.ToListAsync();
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

        public async Task<Payment?> ApprovePayment(Payment payment)
        {
            await using var dbTransaction = await _dbContext.Database.BeginTransactionAsync();

            try
            {
                var payerAccount = await _accountService.GetById(payment.PayerAccountId);
                if (payerAccount == null) return null;

                // Check balance of the Payer Account
                bool? hasBalance = await _accountService.CheckAccountBalance(payment.PayerAccountId, payment.Amount);
                if (hasBalance == null) return null;

                if (hasBalance == false)
                {
                    payment.PaymentStatusId = 2; // Declined payment
                    var declinedPayment = await _paymentRepository.Update(payment);
                    await dbTransaction.CommitAsync();
                    return declinedPayment;
                }

                // create debit transaction for payer
                var debitTxn = new Transaction
                {
                    PaymentId = payment.PaymentId,
                    Amount = payment.Amount,
                    AccountId = payment.PayerAccountId,
                    TransactionTypeId = 2 // debit
                };

                var transactions = new List<Transaction> { debitTxn };

                // If payee has account, create credit transaction
                Account? payeeAccount = await _accountService.AccountExistsWithAccountNumber(payment.PayeeAccountNumber);
                if (payeeAccount != null)
                {
                    var creditTxn = new Transaction
                    {
                        PaymentId = payment.PaymentId,
                        Amount = payment.Amount,
                        AccountId = payeeAccount.AccountId,
                        TransactionTypeId = 1 // credit
                    };

                    transactions.Add(creditTxn);

                    string subject1 = "Your Account got credited!";
                    string body1 =
                        $"""
                        Your Account ({payeeAccount.AccountNumber}) got credited with Rs {payment.Amount}.
                        """;
                    await _emailService.SendEmailToClientAsync((int)payeeAccount.ClientId, subject1, body1);
                }

                // adding transactions in the database 
                var addedTransactions = await _transactionService.AddMany(transactions);
                payment.Transactions?.AddRange(addedTransactions);

                // updating the balance
                payerAccount.Balance -= payment.Amount;
                int id = addedTransactions.FirstOrDefault(t => t.TransactionTypeId == 2).TransactionId;
                payerAccount.TransactionIds.Add(id);
                if (payeeAccount != null)
                { 
                    if (payeeAccount != null)
                    {
                        payeeAccount.Balance += payment.Amount;
                        id = addedTransactions.FirstOrDefault(t => t.TransactionTypeId == 1).TransactionId;
                        payeeAccount.TransactionIds.Add(id);
                    }
                }

                // Aproving the payment
                payment.PaymentStatusId = 1;
                payment.ActionAt = DateTime.Now;
                var updatedPayment = await _paymentRepository.Update(payment);

                string subject = $"Your Payment ID {payment.PaymentId} is Approved!";
                string body =
                    $"""
                    Your Payment ({payment.PaymentId}) has been approved at {payment.ActionAt}
                    Your Account ({payerAccount.AccountNumber}) is Debited with Rs {payment.Amount} 
                    """;
                await _emailService.SendEmailToClientAsync((int)payerAccount.ClientId, subject, body);

                // commiting
                await dbTransaction.CommitAsync();
                return updatedPayment;
            }
            catch (Exception)
            {
                await dbTransaction.RollbackAsync();
                return null;
            }
            //return null;
        }


        public async Task<Payment> RejectPayment(int paymentId,string reason)
        {
            Payment? payment = await _paymentRepository.GetById(paymentId);
            if (payment == null) throw new NullReferenceException("No Payment of id :" + paymentId);

            payment.PaymentStatusId = 2;
            payment.ActionAt = DateTime.Now;

            string subject = $"Payment ID {paymentId} was Rejected!";
            string body = reason;

            int clientId = (int)payment.PayerAccount.ClientId;

            await _emailService.SendEmailToClientAsync(clientId,subject,body);

            Payment? updatedPayment = await _paymentRepository.Update(payment);
            return updatedPayment;
        }

    }
}
