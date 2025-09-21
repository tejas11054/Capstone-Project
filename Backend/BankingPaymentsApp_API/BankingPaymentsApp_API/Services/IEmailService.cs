namespace BankingPaymentsApp_API.Services
{
    public interface IEmailService
    {
        public Task SendEmailToClientAsync(int id, string subject, string body);
    }
}
