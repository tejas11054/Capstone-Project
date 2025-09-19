using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        //private readonly PasswordHasher _passwordHasher;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
            //_passwordHasher = passwordHasher;
        }
        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userRepository.GetAll();
        }

        public async Task<User> Add(User user)
        {
            //_passwordHasher.HashPassword(user.Password);
            return await _userRepository.Add(user);
        }

        public async Task<User?> GetById(int id)
        {
            return await _userRepository.GetById(id);
        }
        public async Task<User?> Update(User user)
        {
            return await _userRepository.Update(user);
        }
        public async Task DeleteById(int id)
        {
            await _userRepository.DeleteById(id);
        }
    }
}
