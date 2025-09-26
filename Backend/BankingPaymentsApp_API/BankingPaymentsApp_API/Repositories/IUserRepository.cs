using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IUserRepository
    {
        //public Task<IEnumerable<User>> GetAll();
        public IQueryable<User> GetAll();
        public Task<User> Add(User user);
        public Task<User?> GetById(int id);
        public Task<User?> Update(User user);
        public Task DeleteById(int id);
    }
}
