using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IBankUserService
    {
        IEnumerable<BankUser> GetAll();
        BankUser Add(BankUser bankUser);
        BankUser? GetById(int id);
        BankUser? Update(BankUser bankUser);
        void DeleteById(int id);
    }
}
