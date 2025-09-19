using BankingPaymentsApp_API.Data;
using System.Net;
using System.Net.Mail;

namespace BankingPaymentsApp_API.Repositories
{
    public class EmailRepository : IEmailRepository
    {
        private BankingPaymentsDBContext _dbContext;
        private readonly IConfiguration _configuration;
        public EmailRepository(BankingPaymentsDBContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task SendEmailToAuthorAsync(int id)
        {
            var author = _dbContext.Users.Find(id);
            if (author == null)
                throw new Exception($"Author with id {id} not found!");

            var smtpSection = _configuration.GetSection("SmtpSettings");

            using (var smtpClient = new SmtpClient(smtpSection["Host"]))
            {
                smtpClient.Port = int.Parse(smtpSection["Port"]);
                smtpClient.Credentials = new NetworkCredential(
                    smtpSection["Username"],
                    smtpSection["Password"]
                );
                smtpClient.EnableSsl = bool.Parse(smtpSection["EnableSsl"]);

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(smtpSection["FromEmail"]),
                    Subject = "Hello from SmartLibrary!",
                    Body = $"<h2>Hello {author.UserName},</h2><p>This is a message from SmartLibrary team.</p>",
                    IsBodyHtml = true
                };

                mailMessage.To.Add(author.UserEmail);

                await smtpClient.SendMailAsync(mailMessage);
            }
        }

    }
}
