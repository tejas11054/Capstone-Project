using System.ComponentModel.DataAnnotations;

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
        public DocProofType DocumentProofType { get; set; } = DocProofType.OTHER;
    }
}
