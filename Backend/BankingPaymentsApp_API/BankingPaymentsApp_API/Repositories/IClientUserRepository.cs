using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IClientUserRepository
    {
        //public Task<IEnumerable<ClientUser>> GetAll();
        public IQueryable<ClientUser> GetAll();
        public Task<ClientUser> Add(ClientUser user);
        public Task<ClientUser?> GetById(int id);
        public Task<ClientUser?> Update(ClientUser user);
        public Task DeleteById(int id);
    }
}
