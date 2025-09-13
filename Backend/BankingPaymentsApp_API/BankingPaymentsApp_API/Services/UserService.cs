using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public IEnumerable<User> GetAll()
        {
            return _userRepository.GetAll();
        }

        public User Add(User user)
        {
            return _userRepository.Add(user);
        }

        public User? GetById(int id)
        {
            return _userRepository.GetById(id);
        }
    }
}
