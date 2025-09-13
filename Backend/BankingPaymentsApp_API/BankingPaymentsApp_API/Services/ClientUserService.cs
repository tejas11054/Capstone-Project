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

        public IEnumerable<ClientUser> GetAll()
        {
            return _clientUserRepository.GetAll();
        }

        public ClientUser Add(ClientUser user)
        {
            return _clientUserRepository.Add(user);
        }

        public ClientUser? GetById(int id)
        {
            return _clientUserRepository.GetById(id);
        }

        public ClientUser? Update(ClientUser user)
        {
            return _clientUserRepository.Update(user);
        }

        public void DeleteById(int id)
        {
            _clientUserRepository.DeleteById(id);
        }
    }
}
