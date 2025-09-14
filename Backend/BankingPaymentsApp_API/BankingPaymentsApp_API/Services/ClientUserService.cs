using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class ClientUserService : IClientUserService
    {
        private readonly IClientUserRepository _clientUserRepository;

        public ClientUserService(IClientUserRepository clientUserRepository)
        {
            _clientUserRepository = clientUserRepository;
        }

        public async Task<IEnumerable<ClientUser>> GetAll()
        {
            return await _clientUserRepository.GetAll();
        }

        public async Task<ClientUser> Add(ClientUser user)
        {
            return await _clientUserRepository.Add(user);
        }

        public async Task<ClientUser?> GetById(int id)
        {
            return await _clientUserRepository.GetById(id);
        }

        public async Task<ClientUser?> Update(ClientUser user)
        {
            return await _clientUserRepository.Update(user);
        }

        public async Task DeleteById(int id)
        {
            await _clientUserRepository.DeleteById(id);
        }
    }
}
