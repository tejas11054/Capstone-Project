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

        //public async Task<IEnumerable<User>> GetAll()
        //{
        //    return await _dbContext.Users.Include(u => u.Role).ToListAsync();
        //}
        public IQueryable<User> GetAll()
        {
            return _dbContext.Users.Include(u=>u.Role).Include(u=>u.Bank).AsQueryable();
        }

        public async Task<User> Add(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetById(int id)
        {
            return await _dbContext.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.UserId.Equals(id));
        }

        public async Task<User?> Update(User user)
        {
            User? existingUser = await GetById(user.UserId);

            if (existingUser == null)
                return null;

            existingUser.UserEmail = user.UserEmail;
            existingUser.UserPhone = user.UserPhone;
            existingUser.UserFullName = user.UserFullName;
            existingUser.UserName = user.UserName;
            existingUser.Password = user.Password;
            existingUser.UserRoleId = user.UserRoleId;

            await _dbContext.SaveChangesAsync();
            return existingUser;
        }

        public async Task DeleteById(int id)
        {
            User? existingUser = await GetById(id);

            if (existingUser == null) return;

            _dbContext.Users.Remove(existingUser);
            await _dbContext.SaveChangesAsync();
        }
    }
}
