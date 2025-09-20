using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IEmailRepository _emailRepository;

        public EmailService(IEmailRepository emailRepository)
        {
            _emailRepository = emailRepository;
        }

        public async Task SendEmailToAuthorAsync(int id)
        {
            await _emailRepository.SendEmailToAuthorAsync(id);
        }
    }
}
