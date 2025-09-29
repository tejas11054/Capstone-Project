using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.DTOs
{
    public class QueryResponseDTO
    {
        [Required]
        public string ResponseMessage { get; set; }
    }
}
