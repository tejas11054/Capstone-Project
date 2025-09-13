using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class UserRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public UserRepository(BankingPaymentsDBContext dBContext) 
        {
            _dbContext = dBContext;
        }

        public IEnumerable<User> GetAll()
        {
            return _dbContext.Users.ToList();
        }

        public User Add(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user;
        }

        public User? getById(int id)
        {
            return _dbContext.Users.Include(u=>u.Role).FirstOrDefault(u => u.UserId.Equals(id));
        }
    }
}
