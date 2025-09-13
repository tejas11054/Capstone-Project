using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IUserRepository
    {
        public IEnumerable<User> GetAll();
        public User Add(User user);
        public User? GetById(int id);
        public User? Update(User user);
        public void DeleteById(int id);
    }
}
