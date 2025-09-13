using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Models
{
    public enum DocProofType
    {
        IDENTITY_PROOF,
        ADDRESS_PROOF,
        DATE_OF_BIRTH_PROOF,
        PHOTOGRAPH,
        PAN_CARD,
        OTHER
    }
    public class ProofType
    {
        [Key]
        public int TypeId { get; set; }
        [Required(ErrorMessage = "Type is Required!")]
        public DocProofType Type { get; set; }
    }
}
