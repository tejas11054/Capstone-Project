<<<<<<< HEAD

﻿using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

=======
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
>>>>>>> 09f07286fd58509e36d83ca6bdea2ddca0c9ef52

namespace BankingPaymentsApp_API.Services
{
    public interface IBankUserService
    {
        Task<IEnumerable<BankUser>> GetAll();
        Task<BankUser> Add(BankUser bankUser);
        Task<BankUser?> GetById(int id);
        Task<BankUser?> Update(BankUser bankUser);
        Task DeleteById(int id);
        public Task<BankUser?> GetRandomBankUser();
        public Task<BankUser> ApproveBankUser(int id);
        public Task<BankUser> RejectBankUser(int id,RejectDTO reject);
    }
}
