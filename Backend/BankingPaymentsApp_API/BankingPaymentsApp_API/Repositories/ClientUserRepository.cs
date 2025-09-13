using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class ClientUserRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public ClientUserRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public IEnumerable<ClientUser> GetAll()
        {
            return _dbContext.ClientUsers.ToList();
        }

        public ClientUser Add(ClientUser user)
        {
            _dbContext.ClientUsers.Add(user);
            _dbContext.SaveChanges();
            return user;
        }

        public ClientUser? getById(int id)
        {
            return _dbContext.ClientUsers.Include(u => u.Role).Include(u=> u.Account).FirstOrDefault(d => d.UserId.Equals(id));
        }

        public ClientUser? Update(ClientUser user)
        {
            ClientUser? existingClientUser = getById(user.UserId);

            if (existingClientUser == null)
                return null;

            existingClientUser.UserEmail = user.UserEmail;
            existingClientUser.UserPhone = user.UserPhone;
            existingClientUser.UserFullName = user.UserFullName;
            existingClientUser.UserName = user.UserName;
            existingClientUser.Password = user.Password;
            existingClientUser.UserRoleId = user.UserRoleId;
            existingClientUser.Address = user.Address;
            existingClientUser.DateOfBirth = user.DateOfBirth;
            existingClientUser.KycVierified = user.KycVierified;
            existingClientUser.AccountId = user.AccountId;

            _dbContext.SaveChanges();
            return existingClientUser;
        }

        public void DeleteById(int id)
        {
            ClientUser? exisitngClientUser = getById(id);
            if (exisitngClientUser == null) return;
            _dbContext.ClientUsers.Remove(exisitngClientUser);
        }
    }
}
