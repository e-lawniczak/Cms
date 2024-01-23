namespace PizzeriaAPI.Settings
{
    public class EmailSenderSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string SenderUsername { get; set; }
        public string SenderEmail { get; set; }
        public string SenderPassword { get; set; }
    }
}
