using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BankingPaymentsApp_API.Models
{
    public class Bank
    {
        [Key]
        public int BankId { get; set; }
        [Required(ErrorMessage = "Bank name is required!")]
        public string BankName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Bank IFSC is required")]
        public string IFSC { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Account> Accounts { get; set; } = new List<Account>();


    }
}
