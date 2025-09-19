using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IAuthRepository
    {
        public LoginResponseDTO Login(LoginDTO usr);
        public bool VerifyPassword(User user, string password);
    }
}
