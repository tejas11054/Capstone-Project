using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class SalaryDisbursementService : ISalaryDisbursementService
    {
        private readonly ISalaryDisbursementRepository _salaryDisbursementRepository;
        private readonly IClientUserRepository _clientUserRepository;

        public SalaryDisbursementService(ISalaryDisbursementRepository salaryDisbursementRepository, IClientUserRepository clientUserRepository)
        {
            _salaryDisbursementRepository = salaryDisbursementRepository;
            _clientUserRepository = clientUserRepository;
        }

        public async Task<IEnumerable<SalaryDisbursement>> GetAll()
        {
            return await _salaryDisbursementRepository.GetAll();
        }
        public async Task<SalaryDisbursement?> GetById(int id)
        {
            return await _salaryDisbursementRepository.GetById(id);
        }
        public async Task<SalaryDisbursement> Add(SalaryDisbursement disbursement)
        {
            //if (disbursement.AllEmployees)
            //{
            //    ClientUser? clientUser = await _clientUserRepository.GetById(disbursement.ClientId);
            //    if (clientUser == null) throw new InvalidOperationException($"No client of id: {disbursement.ClientId}");
            //}
            return await _salaryDisbursementRepository.Add(disbursement);
        }
        public async Task<SalaryDisbursement?> Update(SalaryDisbursement disbursement)
        {
            return await _salaryDisbursementRepository.Update(disbursement);
        }
        public async Task DeleteById(int id)
        {
            await _salaryDisbursementRepository.DeleteById(id);
        }
    }
}
