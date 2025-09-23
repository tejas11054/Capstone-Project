using BankingPaymentsApp_API.Models;
using System.Threading.Tasks;

namespace BankingPaymentsApp_API.Services
{
    public interface IBankUserService
    {
        Task<IEnumerable<BankUser>> GetAll();
        Task<BankUser> Add(BankUser bankUser);
        Task<BankUser?> GetById(int id);
        Task<BankUser?> Update(BankUser bankUser);
        Task DeleteById(int id);
        Task<BankUser> ApproveClient(BankUser bankUser);
    }
}
