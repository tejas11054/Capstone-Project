using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.AspNetCore.Identity;

namespace BankingPaymentsApp_API.Services
{
    public class ClientUserService : IClientUserService
    {
        private readonly IClientUserRepository _clientUserRepository;
        private readonly IAccountService _accountService;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;

        public ClientUserService(IClientUserRepository clientUserRepository, IAccountService accountService, IMapper mapper,IPasswordHasher<User> passwordHasher, IEmailService emailService)
        {
            _clientUserRepository = clientUserRepository;
            _accountService = accountService;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _emailService = emailService;
        }

        public async Task<IEnumerable<ClientUser>> GetAll()
        {
            return await _clientUserRepository.GetAll();
        }

        public async Task<ClientUser> Add(ClientUser user)
        {
            user.Password = _passwordHasher.HashPassword(user, user.Password);
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

        public async Task<ClientUser> ApproveClient(ClientUser clientUser)
        {
            clientUser.KycVierified = true;
            RegisterAccountDTO registerAccount = new RegisterAccountDTO
            {
                AccountNumber = await _accountService.GenerateAccountNumber(),
                AccountStatusId = 1,
                AccountTypeId = 1,
                ClientId = clientUser.UserId,
                Balance = 0,
            };

            Account newAccount = _mapper.Map<Account>(registerAccount);
            Account addedAccount = await _accountService.Add(newAccount);

            clientUser.AccountId = newAccount.AccountId;

            ClientUser? updatedUser = await _clientUserRepository.Update(clientUser);

            if (updatedUser == null) throw new KeyNotFoundException($"Client user with userId: {clientUser.UserId} was Not Found");

            string subject = "Your application is Verified!";
            string body =
                $"""
                Congratulations your application is sucessfully Verfied!
                You are now a KYC VERIFIED USER
                Your ACCOUNT CREDENTIALS ARE:
                Account Number : {addedAccount.AccountNumber}
                IFSC Code : BPS12345
                """;
            await _emailService.SendEmailToClientAsync(clientUser.UserId, subject, body);

            return updatedUser;  
        }

        public async Task RejectClient(ClientUser clientUser,string reason)
        {
            string subject = "Appication Reverted back";
            await _emailService.SendEmailToClientAsync(clientUser.UserId, subject, reason);
        }


    }
}
