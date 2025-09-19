namespace BankingPaymentsApp_API.Services
{
    public interface IEmailService
    {
        public Task SendEmailToAuthorAsync(int id);
    }
}
