using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IBankRepository
    {
        public Task<IEnumerable<Bank>> GetAll();

        public Task<Bank?> GetById(int id);

        public Task<Bank> Add(Bank bank);

        public Task<Bank?> Update(Bank bank);

        public Task DeleteById(int id);
    }
}
