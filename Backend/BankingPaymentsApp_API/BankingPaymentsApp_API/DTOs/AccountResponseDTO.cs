namespace BankingPaymentsApp_API.DTOs
{
    public class AccountResponseDTO
    {
        public int AccountId { get; set; }
        public string AccountNumber { get; set; }
        public int? ClientId { get; set; }
        public int BankId {  get; set; }
        public double Balance { get; set; }
        public int AccountTypeId { get; set; }
        public int AccountStatusId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
