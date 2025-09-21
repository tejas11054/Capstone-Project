using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IClientUserService
    {
        public Task<IEnumerable<ClientUser>> GetAll();
        public Task<ClientUser> Add(ClientUser user);
        public Task<ClientUser?> GetById(int id);
        public  Task<ClientUser?> Update(ClientUser user);
        public Task DeleteById(int id);
        public Task<ClientUser> ApproveClient(ClientUser clientUser);
        public Task RejectClient(ClientUser clientUser, string reason);
    }
}
