using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.Models
{
    public class Document
    {
        [Key]
        public int DocumentId {  get; set; }
        [Required(ErrorMessage ="DocumentURL is Required!")]
        public string DocumentURL {  get; set; }
        [Required(ErrorMessage = "Document Name is Required!")]
        public string DocumentName { get; set; }
        [Required(ErrorMessage = "Document Type is Required!")]
        [ForeignKey("ProofType")]
        public int ProofTypeId { get; set; }
        public virtual ProofType? ProofType { get; set; }

        public string PublicId { get; set; }

        [ForeignKey("Account")]
        public int ClientId { get; set; }
        public virtual ClientUser? Account { get; set; }
    }
}
