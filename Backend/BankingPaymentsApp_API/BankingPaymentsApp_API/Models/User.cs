using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required(ErrorMessage ="User Full Name is Required!")]
        public string UserFullName { get; set; }
        [Required(ErrorMessage = "UserName is Required!")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "User Role is Required!")]
        public Role UserRole { get; set; }
        [Required(ErrorMessage = "User Email is Required!")]
        [DataType(DataType.EmailAddress)]
        public string UserEmail { get; set; } = null!;
        [Required(ErrorMessage = "User Phone is Required!")]
        [RegularExpression(@"[0-9]{10}")]
        public string UserPhone { get; set; } = null!;
        [Required(ErrorMessage = "User Joining Date is Required!")]
        public DateTime UserJoiningDate { get; set; } = DateTime.Now.Date;
    }
}
