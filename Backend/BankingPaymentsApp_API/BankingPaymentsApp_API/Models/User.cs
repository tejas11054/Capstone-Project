using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [Required(ErrorMessage = "UserName is Required!")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required(ErrorMessage = "User Role is Required!")]
        [ForeignKey("Role")]
        public int UserRoleId { get; set; }
        public virtual UserRole? Role { get; set; }
        [Required(ErrorMessage = "User Email is Required!")]
        [DataType(DataType.EmailAddress)]
        public string UserEmail { get; set; } = null!;
        [Required(ErrorMessage = "User Phone is Required!")]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be exactly 10 digits")]
        public string UserPhone { get; set; } = null!;
        [Required(ErrorMessage = "User Joining Date is Required!")]
        public DateTime UserJoiningDate { get; set; } = DateTime.Now.Date;  
    }
}
