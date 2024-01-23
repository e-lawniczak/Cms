using Microsoft.Extensions.Options;
using PizzeriaAPI.Settings;
using System.Net;
using System.Net.Mail;

namespace PizzeriaAPI.Security
{
    public class EmailSender : IEmailSender
    {
        private readonly SmtpClient smtpClient;
        private readonly string senderEmail;

        public EmailSender(IOptions<EmailSenderSettings> emailSenderSettings)
        {
            var settings = emailSenderSettings.Value;
            smtpClient = new SmtpClient(settings.Host, settings.Port);
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(settings.SenderUsername, settings.SenderPassword);
            smtpClient.EnableSsl = true;
            senderEmail = settings.SenderEmail;
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var mailMessage = new MailMessage(senderEmail, email, subject, message);
            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
