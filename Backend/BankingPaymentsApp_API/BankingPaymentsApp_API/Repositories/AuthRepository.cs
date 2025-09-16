using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public AuthRepository(BankingPaymentsDBContext dBContext) {
            _dbContext = dBContext;
        }
        public LoginResponseDTO Login(LoginDTO usr)
        {
            var user = _dbContext.Users.Include(u => u.Role).FirstOrDefault((u) => (u.UserName.Equals(usr.UserName) && u.Password.Equals(usr.Password)));
            LoginResponseDTO response;
            if (user != null)
            {
                response = new LoginResponseDTO
                {
                    IsSuccess = true,
                    User = user,
                    Token = ""
                };
                return response;
            }
            response = new LoginResponseDTO
            {
                IsSuccess = false,
                User = null,
                Token = ""

            };
            return response;
        }
    }
}
