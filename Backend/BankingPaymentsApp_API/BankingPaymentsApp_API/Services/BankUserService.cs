using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.AspNetCore.Identity;

namespace BankingPaymentsApp_API.Services
{
    public class BankUserService : IBankUserService
    {
        private readonly IBankUserRepository _bankUserRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IEmailService _emailService;


        public BankUserService(IBankUserRepository bankUserRepository, IPasswordHasher<User> passwordHasher, IEmailService emailService)
        {
            _bankUserRepository = bankUserRepository;
            _passwordHasher = passwordHasher;
            _emailService = emailService;
        }

        public async Task<IEnumerable<BankUser>> GetAll()
        {
            return await _bankUserRepository.GetAll();
        }

        public async Task<BankUser> Add(BankUser bankUser)
        {
            bankUser.Password = _passwordHasher.HashPassword(bankUser, bankUser.Password);
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

        public async Task<BankUser?> GetRandomBankUser()
        {
            var bankUsers = await _bankUserRepository.GetAll();
            if (bankUsers == null || bankUsers.Count() == 0) return null;
            var random = new Random();
            int index = random.Next(bankUsers.Count());
            return bankUsers.ElementAt(index);
        }

        public async Task<BankUser> ApproveBankUser(int id)
        {
            BankUser? bankUser = await _bankUserRepository.GetById(id);

            if (bankUser == null) throw new NullReferenceException("No BankUser of id: "+id);

            bankUser.isActive = true;
            //string subject = "You are Now Active";
            //string body = "You are Now active you can now proceed with work!";
            //await _emailService.SendEmailToClientAsync(id,subject,body);
            return await _bankUserRepository.Update(bankUser);
        }

        public async Task<BankUser> RejectBankUser(int id,RejectDTO reject)
        {
            BankUser? bankUser = await _bankUserRepository.GetById(id);

            if (bankUser == null) throw new NullReferenceException("No BankUser of id: "+id);

            bankUser.isActive = false;
            string subject = "Your application has reverted back";
            await _emailService.SendEmailToClientAsync(id,subject,reject.reason);
            return await _bankUserRepository.Update(bankUser);
        }
    }
}
