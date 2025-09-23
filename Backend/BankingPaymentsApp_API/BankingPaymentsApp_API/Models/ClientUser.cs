using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingPaymentsApp_API.Models
{
    public class ClientUser : User
    {
        [ForeignKey("Account")]
        public int? AccountId { get; set; }
        public virtual Account? Account { get; set; }
        public List<Beneficiary>? Beneficiaries { get; set; } = new List<Beneficiary>();
        public List<Employee>? Employees { get; set; } = new List<Employee>();
        [Required(ErrorMessage = "Date of Birth is Required!")]
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }
        [Required(ErrorMessage = "Address is Required!")]
        public string Address { get; set; } = null!;
        public bool KycVierified { get; set; } = false;
        [ForeignKey("BankUser")]
        public int? BankUserId {  get; set; }
        public virtual BankUser? BankUser { get; set; }
        public virtual ICollection<Document>? Documents { get; set; } = new List<Document>();
    }
}
