using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> Add(User user);
        Task<User?> GetById(int id);
        public Task<User?> Update(User user);
        public Task DeleteById(int id);
    }
}
