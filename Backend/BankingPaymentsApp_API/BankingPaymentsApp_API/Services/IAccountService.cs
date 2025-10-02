using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IAccountService
    {
        Task<PagedResultDTO<Account>> GetAll(
            string? accountNumber,
            int? clientId,
            int? bankId,
            int? accountTypeId,
            int? accountStatusId,
            double? minBalance,
            double? maxBalance,
            DateTime? createdFrom,
            DateTime? createdTo,
            int pageNumber = 1,
            int pageSize = 10);
        Task<Account> Add(Account account);
        Task<Account?> GetById(int id);
        Task<Account?> Update(Account account);
        Task DeleteById(int id);
        public Task<Transaction> CreditAccount(int accountId, double amount, int? paymentId, int? disbursementId,string toFrom);
        public Task<Transaction> DebitAccount(int accountId, double amount, int? paymentId, int? disbursementId,string toFrom);
        Task<string> GenerateAccountNumber();
        public Task<Account?> AccountExistsWithAccountNumber(string accountNumber);
        public Task<bool?> CheckAccountBalance(int accountId, double amount);

    }
}

