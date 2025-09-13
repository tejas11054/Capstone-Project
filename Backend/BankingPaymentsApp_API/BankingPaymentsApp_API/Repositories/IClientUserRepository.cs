using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IClientUserRepository
    {
        public IEnumerable<ClientUser> GetAll();
        public ClientUser Add(ClientUser user);
        public ClientUser? GetById(int id);
        public ClientUser? Update(ClientUser user);
        public void DeleteById(int id);
    }
}
