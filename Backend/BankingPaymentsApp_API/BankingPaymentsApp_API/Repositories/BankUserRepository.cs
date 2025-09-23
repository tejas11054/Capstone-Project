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

        public async Task<IEnumerable<BankUser>> GetAll()
        {
            return await _dbContext.BankUsers.Include(u => u.Role).Include(u => u.Clients).ToListAsync();
        }

        public async Task<BankUser> Add(BankUser user)
        {
            await _dbContext.BankUsers.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<BankUser?> GetById(int id)
        {
            return await _dbContext.BankUsers.Include(u => u.Role).Include(u=>u.Clients).FirstOrDefaultAsync(u => u.UserId.Equals(id));
        }
        public async Task<BankUser?> Update(BankUser user)
        {
            BankUser? existingUser = await GetById(user.UserId);

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

            await _dbContext.SaveChangesAsync();
            return existingUser;
        }

        public async Task DeleteById(int id)
        {
            BankUser? existingUser = await GetById(id);

            if (existingUser == null) return;

            _dbContext.BankUsers.Remove(existingUser);
            await _dbContext.SaveChangesAsync();
        }
    }
}
