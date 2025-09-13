using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Models
{
    public enum DocProofType
    {
        IDENTITY_PROOF,
        ADDRESS_PROOF,
        DATE_OF_BIRTH_PROOF,
        PHOTOGRAPH,
        PAN_CARD
    }
    public class ProofType
    {
        [Key]
        public int ProofId { get; set; }
        [Required(ErrorMessage = "Type is Required!")]
        public AccStatus Type { get; set; }
    }
}
