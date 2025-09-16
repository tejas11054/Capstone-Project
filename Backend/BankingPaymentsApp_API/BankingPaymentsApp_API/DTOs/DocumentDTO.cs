namespace BankingPaymentsApp_API.DTOs
{
    public class DocumentDTO
    {
        public string DocumentURL { get; set; }
        public string DocumentName { get; set; }
        public int ProofTypeId { get; set; }
        public int AccountId { get; set; }
    }
}
