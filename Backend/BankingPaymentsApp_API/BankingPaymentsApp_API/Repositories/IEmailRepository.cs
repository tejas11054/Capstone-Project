namespace BankingPaymentsApp_API.Repositories
{
    public interface IEmailRepository
    {
        public Task SendEmailToAuthorAsync(int id);
    }
}
