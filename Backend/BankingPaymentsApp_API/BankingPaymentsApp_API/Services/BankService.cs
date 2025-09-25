using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Services
{
    public class BankService : IBankService
    {
        private readonly IBankRepository _bankRepository;

        public BankService(IBankRepository bankRepository)
        {
            _bankRepository = bankRepository;
        }

        public async Task<IEnumerable<Bank>> GetAll()
        {
            return await _bankRepository.GetAll();
        }

        public async Task<Bank?> GetById(int id)
        {
            return await _bankRepository.GetById(id);
        }

        public async Task<Bank> Add(Bank bank)
        {
            return await _bankRepository.Add(bank);
        }

        public async Task<Bank?> Update(Bank bank)
        {
            return await _bankRepository.Update(bank);
        }

        public async Task DeleteById(int id)
        {
            await _bankRepository.DeleteById(id);
        }
    }
}
