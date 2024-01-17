namespace PizzeriaAPI.Security
{
	public interface IEmailSender
	{
		Task SendEmailAsync(string email, string subject, string message);
	}
}
