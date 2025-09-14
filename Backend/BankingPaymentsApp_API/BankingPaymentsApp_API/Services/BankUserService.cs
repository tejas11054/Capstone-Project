using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class BankUserService : IBankUserService
    {
        private readonly IBankUserRepository _bankUserRepository;

        public BankUserService(IBankUserRepository bankUserRepository)
        {
            _bankUserRepository = bankUserRepository;
        }

        public async Task<IEnumerable<BankUser>> GetAll()
        {
            return await _bankUserRepository.GetAll();
        }

        public async Task<BankUser> Add(BankUser bankUser)
        {
            return await _bankUserRepository.Add(bankUser);
        }

        public async Task<BankUser?> GetById(int id)
        {
            return await _bankUserRepository.GetById(id);
        }

        public async Task<BankUser?> Update(BankUser bankUser)
        {
            return await _bankUserRepository.Update(bankUser);
        }

        public async Task DeleteById(int id)
        {
            await _bankUserRepository.DeleteById(id);
        }
    }
}
