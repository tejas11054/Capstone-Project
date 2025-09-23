namespace BankingPaymentsApp_API.DTOs
{
    public class RecaptchaSettings
    {
        public string SecretKey { get; set; } = string.Empty;
        public double MinScore { get; set; } = 0.5; 
    }
}
