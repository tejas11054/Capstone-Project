
﻿using BankingPaymentsApp_API.DTOs;
﻿using AutoMapper;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Services
{
    public class BankUserService : IBankUserService
    {
        private readonly IBankUserRepository _bankUserRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;


        public BankUserService(IBankUserRepository bankUserRepository, IPasswordHasher<User> passwordHasher, IEmailService emailService)
        {
            _bankUserRepository = bankUserRepository;
            _passwordHasher = passwordHasher;
            _emailService = emailService;
        }

        public async Task<IEnumerable<BankUser>> GetAll(
            string? fullName,
            string? userName,
            string? email,
            string? phone,
            int? roleId,
            int? bankId,
            string? branch,
            DateTime? joiningFrom,
            DateTime? joiningTo,
            int? pageNumber,
            int? pageSize)
        {
            var query = _bankUserRepository.GetAll();

            if (!string.IsNullOrEmpty(fullName))
                query = query.Where(u => u.UserFullName.Contains(fullName));
            if (!string.IsNullOrEmpty(userName))
                query = query.Where(u => u.UserName.Contains(userName));
            if (!string.IsNullOrEmpty(email))
                query = query.Where(u => u.UserEmail.Contains(email));
            if (!string.IsNullOrEmpty(phone))
                query = query.Where(u => u.UserPhone == phone);
            if (roleId.HasValue)
                query = query.Where(u => u.UserRoleId == roleId.Value);
            if (bankId.HasValue)
                query = query.Where(u => u.BankId == bankId.Value);
            if (!string.IsNullOrEmpty(branch))
                query = query.Where(u => u.Branch.Contains(branch));
            if (joiningFrom.HasValue)
                query = query.Where(u => u.UserJoiningDate >= joiningFrom.Value);
            if (joiningTo.HasValue)
                query = query.Where(u => u.UserJoiningDate <= joiningTo.Value);

            return query;
        }


        public async Task<BankUser> Add(BankUser bankUser)
        {
            var query = _bankUserRepository.GetAll();

            // Check for duplicate Email
            if (query.Any(bu => bu.UserEmail == bankUser.UserEmail))
            {
                throw new InvalidOperationException("A Bank User with this email already exists!");
            }

            // Check for duplicate Phone
            if (query.Any(bu => bu.UserPhone == bankUser.UserPhone))
            {
                throw new InvalidOperationException("A Bank User with this phone number already exists!");
            }

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
            var bankUsers = _bankUserRepository.GetAll();
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
