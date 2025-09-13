using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class UserRepository : IUserRepository
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

        public User? GetById(int id)
        {
            return _dbContext.Users.Include(u=>u.Role).FirstOrDefault(u => u.UserId.Equals(id));
        }

        public User? Update(User user)
        {
            User? existingUser = GetById(user.UserId);

            if (existingUser == null)
                return null;

            existingUser.UserEmail = user.UserEmail;
            existingUser.UserPhone = user.UserPhone;
            existingUser.UserFullName = user.UserFullName;
            existingUser.UserName = user.UserName;
            existingUser.Password = user.Password;
            existingUser.UserRoleId = user.UserRoleId;

            _dbContext.SaveChanges();
            return existingUser;
        }

        public void DeleteById(int id)
        {
            User? existingUser = GetById(id);

            if (existingUser == null) return;

            _dbContext.Users.Remove(existingUser);
        }
    }
}
