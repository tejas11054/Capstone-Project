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

        public async Task SendEmailToClientAsync(int id,string subject,string body)
        {
            var client = _dbContext.ClientUsers.FirstOrDefault(c=>c.UserId.Equals(id));
            if (client == null)
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
                    Subject = $"{subject}",
                    Body = $"<h2>Hello {client.UserName},</h2><p>{body}</p>",
                    IsBodyHtml = true
                };

                mailMessage.To.Add(client.UserEmail);

                await smtpClient.SendMailAsync(mailMessage);
            }
        }

    }
}
