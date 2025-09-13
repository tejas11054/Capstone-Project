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

        public IEnumerable<BankUser> GetAll()
        {
            return _bankUserRepository.GetAll();
        }

        public BankUser Add(BankUser bankUser)
        {
            return _bankUserRepository.Add(bankUser);
        }

        public BankUser? GetById(int id)
        {
            return _bankUserRepository.GetById(id);
        }

        public BankUser? Update(BankUser bankUser)
        {
            return _bankUserRepository.Update(bankUser);
        }

        public void DeleteById(int id)
        {
            _bankUserRepository.DeleteById(id);
        }
    }
}
