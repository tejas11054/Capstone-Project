using BankingPaymentsApp_API.DTOs;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IAuthRepository
    {
        public LoginResponseDTO Login(LoginDTO usr);
    }
}
