<<<<<<< HEAD
﻿using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
=======
﻿using BankingPaymentsApp_API.Models;
using System.Threading.Tasks;
>>>>>>> 6d71289b4290da462abe0d642a7f16e56072f696

namespace BankingPaymentsApp_API.Services
{
    public interface IBankUserService
    {
        Task<IEnumerable<BankUser>> GetAll();
        Task<BankUser> Add(BankUser bankUser);
        Task<BankUser?> GetById(int id);
        Task<BankUser?> Update(BankUser bankUser);
        Task DeleteById(int id);
<<<<<<< HEAD
        public Task<BankUser?> GetRandomBankUser();
        public Task<BankUser> ApproveBankUser(int id);
        public Task<BankUser> RejectBankUser(int id,RejectDTO reject);
=======
        Task<BankUser> ApproveClient(BankUser bankUser);
>>>>>>> 6d71289b4290da462abe0d642a7f16e56072f696
    }
}
