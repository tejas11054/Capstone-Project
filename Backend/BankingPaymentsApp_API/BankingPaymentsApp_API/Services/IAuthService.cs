using BankingPaymentsApp_API.DTOs;

namespace BankingPaymentsApp_API.Services
{
    public interface IAuthService
    {
        public LoginResponseDTO Login(LoginDTO usr);
    }
}
