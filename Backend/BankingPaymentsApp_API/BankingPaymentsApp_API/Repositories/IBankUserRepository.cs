using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IBankUserRepository
    {
        Task<IEnumerable<BankUser>> GetAll();
        Task<BankUser> Add(BankUser bankUser);
        Task<BankUser?> GetById(int id);
        Task<BankUser?> Update(BankUser bankUser);
        Task DeleteById(int id);
    }
}
