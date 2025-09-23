using AutoMapper;
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
        private readonly IAccountService _accountService;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;

        public BankUserService(IBankUserRepository bankUserRepository, IAccountService accountService, IMapper mapper, IPasswordHasher<User> passwordHasher, IEmailService emailService)
        {
            _bankUserRepository = bankUserRepository;
            _accountService = accountService;
            _mapper = mapper;
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

        public async Task<BankUser> ApproveClient(BankUser bankUser)
        {
            bankUser.KycVierified = true;
            RegisterAccountDTO registerAccount = new RegisterAccountDTO
            {
                AccountNumber = await _accountService.GenerateAccountNumber(),
                AccountStatusId = 1,
                AccountTypeId = 1,
                ClientId = bankUser.UserId,
                Balance = 0,
            };

            Account newAccount = _mapper.Map<Account>(registerAccount);
            Account addedAccount = await _accountService.Add(newAccount);

            bankUser.AccountId = newAccount.AccountId;

            BankUser? updatedUser = await _bankUserRepository.Update(bankUser);

            if (updatedUser == null) throw new KeyNotFoundException($"Bank user with userId: {bankUser.UserId} was Not Found");

            string subject = "Your application is Verified!";
            string body =
                $"""
                Congratulations your application is sucessfully Verfied!
                You are now a KYC VERIFIED USER
                Your ACCOUNT CREDENTIALS ARE:
                Account Number : {addedAccount.AccountNumber}
                IFSC Code : BPS12345
                """;
            await _emailService.SendEmailToClientAsync(bankUser.UserId, subject, body);

            return updatedUser;
        }
    }
}
