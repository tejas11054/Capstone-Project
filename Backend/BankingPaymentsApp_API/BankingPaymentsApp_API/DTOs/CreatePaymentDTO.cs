namespace BankingPaymentsApp_API.DTOs
{
    public class CreatePaymentDTO
    {
        public long Amount { get; set; } // in cents/paise
        public int AccountId { get; set; }
    }
}
