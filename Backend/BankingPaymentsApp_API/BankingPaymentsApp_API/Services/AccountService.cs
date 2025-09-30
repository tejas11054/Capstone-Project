using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly ITransactionRepository _transactionRepository;

        public AccountService(IAccountRepository accountRepository, ITransactionRepository transactionRepository)
        {
            _accountRepository = accountRepository;
            _transactionRepository = transactionRepository;
        }

        //public async Task<IEnumerable<Account>> GetAll()
        //{
        //    return await _accountRepository.GetAll();
        //}
        public async Task<IEnumerable<Account>> GetAll(
            string? accountNumber,
            int? clientId,
            int? bankId,
            int? accountTypeId,
            int? accountStatusId,
            double? minBalance,
            double? maxBalance,
            DateTime? createdFrom,
            DateTime? createdTo)
        {
            var query = _accountRepository.GetAll();
            if (!string.IsNullOrEmpty(accountNumber))
                query = query.Where(a => a.AccountNumber.Contains(accountNumber));

            if (clientId.HasValue)
                query = query.Where(a => a.ClientId == clientId.Value);

            if (bankId.HasValue)
                query = query.Where(a => a.BankId == bankId.Value);

            if (accountTypeId.HasValue)
                query = query.Where(a => a.AccountTypeId == accountTypeId.Value);

            if (accountStatusId.HasValue)
                query = query.Where(a => a.AccountStatusId == accountStatusId.Value);

            if (minBalance.HasValue)
                query = query.Where(a => a.Balance >= minBalance.Value);

            if (maxBalance.HasValue)
                query = query.Where(a => a.Balance <= maxBalance.Value);

            if (createdFrom.HasValue)
                query = query.Where(a => a.CreatedAt >= createdFrom.Value);

            if (createdTo.HasValue)
                query = query.Where(a => a.CreatedAt <= createdTo.Value);

            return await query.ToListAsync();
        }

        public async Task<Account> Add(Account account)
        {
            return await _accountRepository.Add(account);
        }

        public async Task<Account?> GetById(int id)
        {
            return await _accountRepository.GetById(id);
        }

        public async Task<Account?> Update(Account account)
        {
            return await _accountRepository.Update(account);
        }

        public async Task DeleteById(int id)
        {
            await _accountRepository.DeleteById(id);
        }

        public async Task<string> GenerateAccountNumber()
        {
            return await _accountRepository.GenerateAccountNumber();
        }

        public async Task<Transaction> CreditAccount(int accountId, double amount, int? paymentId, int? disbursementId)
        {
            Account? account = await _accountRepository.GetById(accountId);
            if (account == null) throw new NullReferenceException("No account of id: " + accountId);

            account.Balance += amount;
            Transaction creditTransaction = new Transaction
            {
                TransactionTypeId = 1,
                AccountId = accountId,
                Amount = amount,
                PaymentId = paymentId ?? null,
                SalaryDisbursementId = disbursementId ?? null,
                CreatedAt = DateTime.UtcNow
            };
            Transaction addedTransaction = await _transactionRepository.Add(creditTransaction);
            await _accountRepository.Update(account);
            return addedTransaction;
        }
        public async Task<Transaction> DebitAccount(int accountId, double amount, int? paymentId, int? disbursementId)
        {
            Account? account = await _accountRepository.GetById(accountId);
            if (account == null) throw new NullReferenceException("No account of id: " + accountId);

            if (account.Balance < amount) throw new InvalidOperationException("Insufficient balance!");

            account.Balance -= amount;
            Transaction debitTransaction = new Transaction
            {
                TransactionTypeId = 2,
                AccountId = accountId,
                Amount = amount,
                PaymentId = paymentId,
                SalaryDisbursementId = disbursementId,
                CreatedAt = DateTime.UtcNow
            };
            Transaction addedTransaction = await _transactionRepository.Add(debitTransaction);
            await _accountRepository.Update(account);
            //string subject = $"Your SalaryDisbursement ID {disbursementId} is Approved!";
            //string body =
            //    $"""
            //            Your SalaryDisbursement ({disbursementId}) has been approved at {DateTime.UtcNow}
            //            Your Account ({ClientAccount.AccountNumber}) is Debited with Rs {salaryDisbursement.TotalAmount} 
            //            """;
            //await _emailService.SendEmailToClientAsync((int)salaryDisbursement.ClientId, subject, body);
            //return updatedDisbursement;
            return addedTransaction;
        }
        public async Task<Account?> AccountExistsWithAccountNumber(string accountNumber)
        {
            var accounts = _accountRepository.GetAll();
            //return true if any account has the given account Number 
            Account? account = accounts.FirstOrDefault(a => a.AccountNumber.Equals(accountNumber));
            if (account == null) return null;
            return account;
        }

        public async Task<bool?> CheckAccountBalance(int accountId, double amount)
        {
            Account? account = await GetById(accountId);

            if (account == null) return null;

            if (account.Balance < amount) return false;
            return true;
        }
    }
}
