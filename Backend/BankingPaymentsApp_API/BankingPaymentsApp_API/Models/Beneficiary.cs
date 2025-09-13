using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Models
{
    public class Beneficiary
    {
        [Key]
        public int BeneficiaryId {  get; set; }
        [Required(ErrorMessage = "clientId is Required!")]
        public int ClientId {  get; set; }
        [Required(ErrorMessage = "Beneficiary name is Required!")]
        public string BeneficiaryName { get; set; }
        [Required(ErrorMessage = "AccountNumber is Required!")]
        public string AccountNumber {  get; set; }
        [Required(ErrorMessage = "Bank name is Required!")]
        public string BankName {  get; set; }
        [Required(ErrorMessage = "IFSC Code is Required!")]
        public string IFSC {  get; set; }

    }
}
