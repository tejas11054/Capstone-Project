using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();
        User Add(User user);
        User? GetById(int id);
        public User? Update(User user);
        public void DeleteById(int id);
    }
}
