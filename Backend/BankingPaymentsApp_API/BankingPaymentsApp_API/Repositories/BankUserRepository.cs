using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class BankUserRepository : IBankUserRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public BankUserRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public IEnumerable<BankUser> GetAll()
        {
            return _dbContext.BankUsers.ToList();
        }

        public BankUser Add(BankUser user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user;
        }

        public BankUser? GetById(int id)
        {
            return _dbContext.BankUsers.Include(u => u.Role).FirstOrDefault(u => u.UserId.Equals(id));
        }
        public BankUser? Update(BankUser user)
        {
            BankUser? existingUser = GetById(user.UserId);

            if (existingUser == null)
                return null;

            existingUser.UserEmail = user.UserEmail;
            existingUser.UserPhone = user.UserPhone;
            existingUser.UserFullName = user.UserFullName;
            existingUser.UserName = user.UserName;
            existingUser.Password = user.Password;
            existingUser.UserRoleId = user.UserRoleId;
            existingUser.Branch = user.Branch;
            existingUser.RefferalCode = user.RefferalCode;

            _dbContext.SaveChanges();
            return existingUser;
        }

        public void DeleteById(int id)
        {
            BankUser? existingUser = GetById(id);

            if (existingUser == null) return;

            _dbContext.Users.Remove(existingUser);
        }
    }
}
