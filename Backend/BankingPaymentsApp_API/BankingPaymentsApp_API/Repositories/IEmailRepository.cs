namespace BankingPaymentsApp_API.Repositories
{
    public interface IEmailRepository
    {
        public Task SendEmailToClientAsync(int id, string subject, string body);
    }
}
